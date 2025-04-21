// "use client";

// import { useState } from "react";
// import { useData } from "../_providers/DataProvider";
// import { useAuth } from "../_providers/AuthProvider";
// import { useRouter } from "next/router";
// import { useFormik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
// import * as Yup from "yup";
// export default function CreateArticlePage() {
//   const [isEnglishEnabled, setIsEnglishEnabled] = useState(false);
//   const { categories } = useData();
//   const { loading, loggedIn } = useAuth();
//   const router = useRouter();

//   interface CreateArticleValues {
//     title: { mn: string; en: string | null };
//     content: { mn: string; en: string | null };
//     category: string;
//     status: "draft";
//   }
//   const initialValues: CreateArticleValues = {
//     title: { mn: "", en: null },
//     content: { mn: "", en: null },
//     category: "",
//     status: "draft", // デフォルトを draft に設定
//   };

//   const validationSchema = Yup.object({
//     title: Yup.object({
//       mn: Yup.string().required("モンゴル語のタイトルは必須です"),
//       en: isEnglishEnabled
//         ? Yup.string().required("英語のタイトルは必須です")
//         : Yup.string().nullable(),
//     }),
//     content: Yup.object({
//       mn: Yup.string().required("モンゴル語のコンテンツは必須です"),
//       en: isEnglishEnabled
//         ? Yup.string().required("英語のコンテンツは必須です")
//         : Yup.string().nullable(),
//     }),
//     category: Yup.string().required("カテゴリーを選択してください"),
//   });

//   const formik = useFormik({
//     initialValues: initialValues,
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       try {
//         async () => {
//           await createCategory({ name: values.name });
//           setOpen(false);
//           formik.resetForm();
//         };
//       } catch (e) {
//         alert(e);
//       }
//     },
//   });

//   // const formik = useFormik<CreateArticleValues>({
//   //   initialValues,
//   //   validationSchema,
//   //   onSubmit: async (
//   //     values,
//   //     { resetForm }: FormikHelpers<ArticleFormValues>
//   //   ) => {
//   //     try {
//   //       if (values.title.en == "") {
//   //         values.title.en = null;
//   //         values.content.en = null;
//   //       }

//   //       console.log(values);
//   //       await api.post("/createArticle", values);
//   //       alert("記事を作成しました！");
//   //       resetForm();
//   //     } catch (error) {
//   //       console.error("記事作成エラー", error);
//   //     }
//   //   },
//   // });
//   if (loggedIn === null) {
//     return <p>Loading...</p>; // ログイン状態を確認するまでローディング表示
//   }

//   return loggedIn ? (
//     <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">記事を作成</h2>

//       <form onSubmit={formik.handleSubmit} className="space-y-4">
//         {/* 言語トグル */}
//         <ToggleEnglish
//           isEnabled={isEnglishEnabled}
//           setIsEnabled={setIsEnglishEnabled}
//         />

//         {/* タイトル入力 */}
//         <TitleInput formik={formik} isEnglishEnabled={isEnglishEnabled} />

//         {/* コンテンツ入力 */}
//         <ContentInput formik={formik} isEnglishEnabled={isEnglishEnabled} />

//         {/* カテゴリー選択 */}
//         <CategorySelect formik={formik} categories={categories} />

//         {/* カバー画像アップロード */}
//         <CoverPhotoUpload formik={formik} />

//         {/* 投稿ボタン */}
//         <SubmitButton isSubmitting={formik.isSubmitting} />
//       </form>
//     </div>
//   ) : (
//     <SignIn />
//   );
// }
