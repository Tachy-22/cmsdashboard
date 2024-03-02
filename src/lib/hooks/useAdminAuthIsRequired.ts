import { useSession } from "next-auth/react";

const useAdminAuthIsRequired = () => {
  const { data: session } = useSession();
  const TypedSession = session as TSession;
  const isAdmin = TypedSession?.user?.role === "ADMIN";
  return isAdmin;
};

export default useAdminAuthIsRequired;
