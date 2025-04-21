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
import { useAuth } from "./AuthProvider";

type DataContextType = {
  articles: ArticleType[] | undefined;
  categories: CategoryType[] | undefined;
};

const DataContext = createContext<DataContextType>({} as DataContextType);

export function DataProvider({ children }: PropsWithChildren) {
  const { setLoading, loggedIn } = useAuth();
  const [articles, setArticles] = useState<ArticleType[] | undefined>();
  const [categories, setCategories] = useState<CategoryType[] | undefined>();

  // GET ARTICLES
  const getArticlesByUserRole = async ({ token }: { token: string }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getArticlesByUserRole`,
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error("Catch error→Failed to fetch articles:", error);
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
      console.log("get cats", data);
      setCategories(data);
    } catch (error) {
      console.error("Catch error→Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const getAllData = async () => {
        setLoading(true);
        await getArticlesByUserRole({ token });
        await getCategories();
        setLoading(false);
      };
      getAllData();
    }
    console.log("data provider use effect", categories);
  }, [loggedIn]);

  return (
    <DataContext.Provider value={{ articles, categories }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
