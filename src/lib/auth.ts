import { createUser } from "@/actions/users/createUser";
import { findUser } from "@/actions/users/findUser";
import { NextAuthOptions, Session, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Awaitable } from "next-auth";
import bcrypt from "bcrypt";

import { redirect } from "next/navigation";
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        console.log("finding user:");
        const user = await findUser(credentials?.email as string);
        try {
          console.log({ user });
          if (!user) {
            return credentials as Awaitable<any | null>;
          } else {
            const credentialPassword = credentials?.password as string;
            const userPassword = user?.password as string;

            console.log({ credentialPassword, userPassword });
            const passwordsMatch = await bcrypt.compare(
              credentialPassword,
              userPassword
            );

            if (passwordsMatch) {
              if (user) {
                return user as Awaitable<User | null>;
              } else {
                await createUser(credentials?.email as string);
                return user as Awaitable<User | null>;
              }
            } else {
              return null;
            }
          }
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const dbUser = (await findUser(session?.user?.email as string)) as User;

      const updatedSession = {
        user: {
          ...session.user,
          id: dbUser.id,
          projectIds: dbUser.projectIds,
          role: dbUser.role,
        },
      } as unknown as Session & {
        id: string;
        projectIds: string[];
        creatorName: string;
        role: string;
      };

      return updatedSession;
    },
    async signIn({ user, account, profile, credentials }) {
      console.log({ user, account, profile, credentials });
      const { email, name, picture, password } =
        (profile as Profile) || credentials;

      const userExists = await findUser(profile?.email as string);
      console.log("user exists?", userExists);
      if (userExists) {
        return true;
      } else {
        await createUser(
          email as string,
          name as string,
          picture as string,
          password as string
        );
        // Return false to display a default error message
        return true;
      }
    },
  },
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
}

export async function adminAuthRequired() {
  const session = await getServerSession(authOptions);
  const TypedSession = session as TSession;
  const isAdmin = TypedSession?.user?.role === "ADMIN";
  return isAdmin;
}
