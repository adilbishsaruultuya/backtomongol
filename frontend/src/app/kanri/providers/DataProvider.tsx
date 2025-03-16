"use client";

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
import { ArticleType, CategoryType } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { warn } from "console";

type DataContextType = {
  articles: ArticleType[] | undefined;
  categories: CategoryType[] | undefined;
  setRefresh: Dispatch<SetStateAction<number>>;
};

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: PropsWithChildren) => {
  const [articles, setArticles] = useState<ArticleType[]>();
  const [categories, setCategories] = useState<CategoryType[]>();
  const { setIsLoading, isLoggedIn } = useAuth();
  const [refresh, setRefresh] = useState(0);
  const router = useRouter();

  // GET ARTICLES
  const getArticlesByUserRole = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn(
        "No token found in get articles by user role redirect to kanri"
      );
      router.push("/kanri");
      return;
    }

    try {
      setIsLoading(true);
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

      if (!res.ok)
        throw new Error(
          "Failed to fetch articles in get articles by user role"
        );

      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error("Catch error→Failed to fetch articles:", error);
      console.warn("ss", error);
      router.push("/kanri");
    } finally {
      setIsLoading(false);
    }
  };

  //GET CATEGORIES
  const getCategories = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getCategories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok)
        throw new Error("Failed to fetch categories in get categories");

      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Catch error→Failed to fetch categories:", error);
      console.warn("ss", error);
      router.push("/kanri");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const getAllData = async () => {
        setIsLoading(true);
        await getArticlesByUserRole();
        await getCategories();
        setIsLoading(false);
      };
      getAllData();
    }
  }, [refresh, isLoggedIn]);

  return (
    <DataContext.Provider
      value={{
        articles,
        categories,
        setRefresh,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

// "use client";

// import { api, ArticleType } from "@/common";
// import { AxiosError } from "axios";
// import {
//   Dispatch,
//   PropsWithChildren,
//   SetStateAction,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { toast } from "react-toastify";
// import { AuthProvider } from "./AuthProvider";

// type DataContextType = {
//   articles: ArticleType[] | undefined;
//   setRefresh: Dispatch<SetStateAction<number>>;
// };

// const DataContext = createContext<DataContextType>({} as DataContextType);

// export const DataProvider = ({ children }: PropsWithChildren) => {
//   const [refresh, setRefresh] = useState(0);
//   const [isLoading, setIsLoading] = useState();
//   const [articles, setArticles] = useState<ArticleType[]>();
//   consy;

//   // CREATE FOOD
//   const createFood = async (props: foodType) => {
//     const { imgPath, name, price, discount, ingredients, category } = props;
//     const token = localStorage.getItem("token");

//     try {
//       const res = await api.post(
//         "/createFood",
//         {
//           name,
//           imgPath,
//           price,
//           discount,
//           ingredients,
//           category,
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       toast.success(res.data.message, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: true,
//       });
//       setRefresh((prev) => 1 - prev);
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         toast.error(error.response?.data.message ?? error.message, {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: true,
//         });
//       }
//     }
//   };

//   // CREATE CATEGORY
//   const createCategory = async ({ name }: { name: string }) => {
//     const token = localStorage.getItem("token");

//     try {
//       const res = await api.post(
//         "/createCategory",
//         {
//           name,
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       toast.success(res.data.message, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: true,
//       });

//       setRefresh((prev) => 1 - prev);
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         toast.error(error.response?.data.message ?? error.message, {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: true,
//         });
//       }
//     }
//   };

//   // UPDATE FOOD
//   const updateFood = async (props: foodType) => {
//     const { imgPath, name, price, discount, ingredients, category, _id } =
//       props;

//     const token = localStorage.getItem("token");

//     try {
//       const res = await api.post(
//         "/updateFood",
//         {
//           imgPath,
//           name,
//           price,
//           discount,
//           ingredients,
//           category,
//           _id,
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       toast.success(res.data.message, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: true,
//       });

//       setRefresh((prev) => 1 - prev);
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         toast.error(error.response?.data.message ?? error.message, {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: true,
//         });
//       }
//     }
//   };

//   // GET ALL FOODS
//   const getAllFoods = async () => {
//     try {
//       const res = await api.get("/getAllFoods");
//       setFoods(res.data);
//     } catch (error) {}
//   };

//   // GET ALL CATEGORIES
//   const getAllCategories = async () => {
//     try {
//       const res = await api.get("/getAllCategories");
//       setCategories(res.data);
//     } catch (error) {}
//   };

//   // GET  DISTRICTS
//   const getDistricts = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await api.get("/getDistricts", {
//         headers: {
//           Authorization: token,
//         },
//       });

//       setDistricts(res.data);
//     } catch (error) {}
//   };

//   // GET  KHOROOS
//   const getKhoroos = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await api.get("/getKhoroos", {
//         headers: {
//           Authorization: token,
//         },
//       });

//       setKhoroos(res.data);
//     } catch (error) {}
//   };

//   // GET  APARTMENTS
//   const getApartments = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await api.get("/getApartments", {
//         headers: {
//           Authorization: token,
//         },
//       });

//       setApartments(res.data);
//     } catch (error) {}
//   };

//   // UPDATE CATEGORY
//   const updateCategory = async (props: categoryType) => {
//     const { name, _id } = props;
//     console.log(name);

//     const token = localStorage.getItem("token");

//     try {
//       const res = await api.post(
//         "/updateCategory",
//         {
//           name,
//           _id,
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       console.log(res);

//       toast.success(res.data.message, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: true,
//       });
//       setRefresh((prev) => 1 - prev);
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         toast.error(error.response?.data.message ?? error.message, {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: true,
//         });
//       }
//     }
//   };

//   // DELETE CATEGORY
//   const deleteCategory = async (props: categoryType) => {
//     const { name, _id } = props;

//     const token = localStorage.getItem("token");

//     try {
//       const res = await api.post(
//         "/deleteCategory",
//         {
//           name,
//           _id,
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       toast.success(res.data.message, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: true,
//       });

//       setRefresh((prev) => 1 - prev);
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         toast.error(error.response?.data.message ?? error.message, {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: true,
//         });
//       }
//     }
//   };

//   // ADD CART
//   const addCart = (props: basketFoodType) => {
//     const { imgPath, name, price, discount, _id, ingredients, quantity } =
//       props;
//     const isAdded = inCart.find((item) => item._id === _id);

//     if (isAdded) {
//       const newInCart = inCart.map((item) => {
//         if (item._id === _id) {
//           return {
//             ...item,
//             quantity: item.quantity + quantity,
//           };
//         }
//         return { ...item };
//       });
//       setInCart(newInCart);
//     } else {
//       setInCart([...inCart, props]);
//     }
//   };

//   // ADD QUANTITY
//   const addQuantity = (id: string) => {
//     const newInCart = inCart.map((item) => {
//       if (item._id === id) {
//         if (item.quantity <= 20) {
//           item.quantity += 1;
//         }
//       }
//       return item;
//     });
//     setInCart(newInCart);
//   };

//   // MINUS QUANTITY
//   const minusQuantity = (id: string) => {
//     const thisFood = inCart.filter((item) => {
//       return item._id === id;
//     });

//     if (thisFood[0].quantity === 1) {
//       const newInCart = inCart.filter((item) => {
//         return !(item._id === id);
//       });

//       setInCart(newInCart);
//     } else {
//       const newInCart = inCart.map((item) => {
//         if (item._id === id) {
//           item.quantity -= 1;
//         }
//         return item;
//       });
//       setInCart(newInCart);
//     }
//   };

//   useEffect(() => {
//     const getAllData = async () => {
//       setIsLoading(true);
//       await getAllFoods();
//       await getAllCategories();
//       await getDistricts();
//       await getKhoroos();
//       await getApartments();
//       setIsLoading(false);
//     };
//     getAllData();
//   }, [refresh]);

//   return (
//     <DataContext.Provider
//       value={{
//         articles,
//         setRefresh,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };

// export const useData = () => useContext(DataContext);
