"use client";

import { api } from "@/common";
import {
  UserType,
  SignInProps,
  ArticleType,
  CategoryType,
} from "@/types/common.types";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type DataContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  articles: ArticleType[] | undefined;
  categories: CategoryType[] | undefined;
};

const DataContext = createContext<DataContextType>({} as DataContextType);

export function DataProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<ArticleType[] | undefined>();
  const [categories, setCategories] = useState<CategoryType[] | undefined>();

  //GET ARTICLES
  const getArticles = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getArticles`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error("Catch error→Get all articles", error);
    }
  };

  //GET CATEGORIES
  const getCategories = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getCategories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Catch error→Failed to get categories:", error);
    }
  };

  // GET ARTICLES BY CATEGORY
  const getArticlesByCategory = async ({
    categoryId,
  }: {
    categoryId: string;
  }) => {
    try {
      const { data } = await api.post(
        "/getArticlesByCategory",
        {
          categoryId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setArticles(data);
    } catch (error) {
      console.error("Catch error→Failed to fetch articles:", error);
    }
  };

  useEffect(() => {
    console.log("use effect data provider");
    const getAllData = async () => {
      setLoading(true);
      await getArticles();
      await getCategories();
      setLoading(false);
    };
    getAllData();
  }, []);
  return (
    <DataContext.Provider value={{ articles, categories, loading, setLoading }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
