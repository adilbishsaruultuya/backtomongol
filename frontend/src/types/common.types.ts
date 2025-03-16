export type SignUpProps = {
  email: string;
  password: string;
};

export type UserType = {
  _id: string;
  name: string;
  role: string;
};
export type CategoryType = {
  _id?: string;
  name: string;
};
export type ArticleType = {
  _id?: string;
  title: {
    mn: string;
    en: string;
  };
  content: {
    mn: string;
    en: string;
  };
  coverPhoto?: string;
  category: string;
  author: string;
  status: string;
  createdAt: Date;
  publishedAt?: Date;
  updatedAt?: Date;
};

export type SignInProps = {
  email: string;
  password: string;
};
