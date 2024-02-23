interface Profile {
  sub?: string;
  name?: string;
  email?: string;
  image?: string;
  picture?: string;
  password?: string;
}

type TProject = {
  slug: string;
  title: string;
  theme: string;
  creatorId: string | null;
  admins: string[];
};

type Session = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: ISODateString;
};