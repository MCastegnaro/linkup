"use client";

import { useAuth } from "@/app/hooks/useAuthContext";
import Logo from "@/public/assets/interface.png";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginFormData>({
    mode: "all",
  });

  const { Login } = useAuth();

  const handleFormSubmit = (data: LoginFormData) => {
    Login(data);
  };

  return (
    <section className="flex h-screen bg-white">
      <div className="mx-auto w-full max-w-7xl flex h-screen flex-col">
        <article className="flex justify-between py-12">
          <span className="font-black text-2xl">LinkifyMe</span>
          <span>
            {"Don't have an account? "}
            <Link
              href={"/register"}
              className=" text-orange-400 hover:underline"
            >
              Sign Up.
            </Link>
          </span>
        </article>

        <section className="flex h-full gap-24">
          <article className="flex w-[60%] flex-col items-center justify-around bg-orange-50 h-11/12 rounded">
            <article className="text-center">
              <p className="font-black text-2xl">
                Want to share important links?
              </p>
              <p className="font-medium">
                Customize your landing page effortlessly!
              </p>
            </article>
            <Image
              alt="people creating a UI interface"
              width={500}
              src={Logo}
            />
            <p className="font-normal">Share your links with easy!</p>
          </article>
          <article className="flex w-[40%] flex-col items-center justify-center gap-6 h-11/12 ">
            <div className="w-full">
              <p className="font-black text-2xl">Get starter for free</p>
              <p className="font-normal max-w-4/4">
                Enjoy unlimited link sharing. No commitments
              </p>
            </div>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="w-full flex flex-col"
            >
              <div className="mt-0.5 mb-5">
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "required",
                    },
                  })}
                  className={`${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } w-full rounded border px-5 py-3`}
                />
                {errors.username && (
                  <span className="text-sm text-red-500">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div className=" mt-0.5 mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "required",
                    },
                  })}
                  className={`${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } w-full rounded border px-5 py-3`}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className="w-full rounded bg-amber-600 px-4 py-3 font-semibold cursor-pointer text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                Sign in
              </button>
            </form>
          </article>
        </section>
      </div>
    </section>
  );
}
