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
type TProduct = {
  name: string;
  projectId: string | null;
  description: string;
  type: string;
  price: string
};

type TSession = {
  projectIds: string[];
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    projectIds?: string[];
    id?: string | null;
  };
  expires: ISODateString;
};
type THero = {
  title: string;
  projectId: string | null;
  description: string;
  images: string[];
  button: string;
};

type TContact = {
  address: string;
  projectId: string | null;
  location: string;
};

type TAbout = {
  projectId: string | null;
  description: string;
};

type TProjectWithData =
  | (Project & {
      hero: Hero;
      product: Product[];
      about: About;
      contact: Contact;
    })
  | null;