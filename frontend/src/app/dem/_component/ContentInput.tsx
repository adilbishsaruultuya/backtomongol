import { FormikProps } from "formik";
import { ArticleType } from "@/types/common.types";

export default function ContentInput({
  formik,
  isEnglishEnabled,
}: {
  formik: FormikProps<ArticleType>;
  isEnglishEnabled: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium">
        コンテンツ (モンゴル語)
      </label>
      <textarea
        {...formik.getFieldProps("content.mn")}
        className="textarea textarea-bordered w-full"
      />
      {formik.touched.content?.mn && formik.errors.content?.mn && (
        <p className="text-red-500 text-sm">{formik.errors.content.mn}</p>
      )}

      {isEnglishEnabled && (
        <>
          <label className="block text-sm font-medium mt-2">
            コンテンツ (英語)
          </label>
          <textarea
            {...formik.getFieldProps("content.en")}
            className="textarea textarea-bordered w-full"
          />
          {formik.touched.content?.en && formik.errors.content?.en && (
            <p className="text-red-500 text-sm">{formik.errors.content.en}</p>
          )}
        </>
      )}
    </div>
  );
}
