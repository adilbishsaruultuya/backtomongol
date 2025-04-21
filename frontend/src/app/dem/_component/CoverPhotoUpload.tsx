import { FormikProps } from "formik";
import { ArticleType } from "@/types/common.types";

export default function CoverPhotoUpload({
  formik,
}: {
  formik: FormikProps<ArticleType>;
}) {
  return (
    <div>
      <label className="block text-sm font-medium">カバー写真 URL</label>
      <input
        type="text"
        {...formik.getFieldProps("coverPhoto")}
        className="input input-bordered w-full"
      />
      {formik.touched.coverPhoto && formik.errors.coverPhoto && (
        <p className="text-red-500 text-sm">{formik.errors.coverPhoto}</p>
      )}
    </div>
  );
}
