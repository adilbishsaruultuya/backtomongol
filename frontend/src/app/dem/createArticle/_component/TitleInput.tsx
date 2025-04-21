import { FormikProps } from "formik";
import { ArticleType } from "@/types/common.types";

export default function TitleInput({
  formik,
  isEnglishEnabled,
}: {
  formik: FormikProps<ArticleType>;
  isEnglishEnabled: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium">タイトル (モンゴル語)</label>
      <input
        type="text"
        {...formik.getFieldProps("title.mn")}
        className="input input-bordered w-full"
      />
      {formik.touched.title?.mn && formik.errors.title?.mn && (
        <p className="text-red-500 text-sm">{formik.errors.title.mn}</p>
      )}

      {isEnglishEnabled && (
        <>
          <label className="block text-sm font-medium mt-2">
            タイトル (英語)
          </label>
          <input
            type="text"
            {...formik.getFieldProps("title.en")}
            className="input input-bordered w-full"
          />
          {formik.touched.title?.en && formik.errors.title?.en && (
            <p className="text-red-500 text-sm">{formik.errors.title.en}</p>
          )}
        </>
      )}
    </div>
  );
}
