export type Article = {
  _id: string;
  title: string;
  content: string;
  coverPhoto?: string;
  author: User;
  createdAt?: Date;
  publishedAt?: Date;
  updatedAt?: Date;
};

export type User = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  articles?: Article[];
};

export type Payload = {
  id: string;
};
