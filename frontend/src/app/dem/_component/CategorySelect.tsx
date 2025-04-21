import { FormikProps } from "formik";
import { ArticleType, CategoryType } from "@/types/common.types";
import { useAuth } from "../_providers/AuthProvider";

export default function CategorySelect({
  formik,
  categories,
}: {
  formik: FormikProps<ArticleType>;
  categories: CategoryType[] | undefined;
}) {
  const { loading } = useAuth();
  return (
    <div>
      <label className="block text-sm font-medium">カテゴリー</label>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <select
          {...formik.getFieldProps("category")}
          className="select select-bordered w-full"
        >
          <option value="">カテゴリーを選択</option>
          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      )}

      {formik.touched.category && formik.errors.category && (
        <p className="text-red-500 text-sm">{formik.errors.category}</p>
      )}
    </div>
  );
}
