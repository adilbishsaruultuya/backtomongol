"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/app/kanri/providers/AuthProvider";

interface SignInValues {
  email: string;
  password: string;
}

export default function SignInPage() {
  const { signIn } = useAuth();
  const router = useRouter();

  // Yup スキーマ（バリデーションルール）
  // const validationSchema = Yup.object({
  //   email: Yup.string().email("Invalid email").required("Email is required"),
  //   password: Yup.string()
  //     .min(3, "Password must be at least 6 characters")
  //     .required("Password is required"),
  // });
  const validationSchema = Yup.object({
    email: Yup.string(),
    password: Yup.string(),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  // サインイン処理
  const handleSignIn = async (
    values: SignInValues,
    { setSubmitting, setErrors }: FormikHelpers<SignInValues>
  ) => {
    try {
      await signIn({ email: values.email, password: values.password });
      router.push("kanri/dashboard");
    } catch (error) {
      setErrors({ password: "Invalid email or password" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // <div>aaa</div>
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 mt-4">
              {/* Email */}
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
