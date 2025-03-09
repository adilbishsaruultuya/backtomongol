export type User = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  articles?: Article[];
};
export type Category = {
  _id?: string;
  name: string;
};
export type Article = {
  _id?: string;
  title: {
    mn: string;
    en?: string;
  };
  content: {
    mn: string;
    en?: string;
  };
  coverPhoto?: string;
  category: Category;
  author: User;
  status: ArticleStatus;
  createdAt: Date;
  publishedAt?: Date;
  updatedAt?: Date;
};

export type Payload = {
  id: string;
  role: string;
};

export enum ArticleStatus {
  Draft = "Draft",
  Requested = "Requested",
  Published = "Published",
  Archived = "Archived",
  Starred = "Starred",
}

export const filter: Partial<{ status?: ArticleStatus; author?: string }> = {};
