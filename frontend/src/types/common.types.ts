export type SignUpProps = {
  email: string;
  password: string;
};

export type UserType = {
  _id?: string;
  name: string;
  email: string;
  articles?: ArticleType[];
};
export type CategoryType = {
  _id?: string;
  name: string;
};
export type ArticleType = {
  _id?: string;
  title: string;
  content: string;
  coverPhoto?: string;
  category: CategoryType;
  author: UserType;
  createdAt: Date;
  publishedAt?: Date;
  updatedAt?: Date;
};
