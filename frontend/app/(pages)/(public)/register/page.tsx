"use client";

import { useAuth } from "@/app/hooks/useAuthContext";
import Logo from "@/public/assets/interface.png";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface RegisterFormData {
  username: string;
  password: string;
  fullname: string;
}
export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<RegisterFormData>({
    mode: "all",
  });
  const { Register } = useAuth();

  const handleFormSubmit = (data: RegisterFormData) => {
    Register(data);
  };

  return (
    <section className="flex h-screen bg-white">
      <div className="p-12 mx-auto w-full max-w-7xl flex h-screen flex-col lg:p-6">
        <article className="flex justify-between py-12">
          <span className="font-black text-2xl">LinkifyMe</span>
          <span>
            {"Already have an account? "}
            <Link href={"/login"} className=" text-orange-400 hover:underline">
              Sign in.
            </Link>
          </span>
        </article>

        <section className="flex flex-col h-full gap-24 lg:flex-row items-center">
          <article className="flex w-full justify-around bg-orange-50 lg:w-[60%] flex-col h-11/12 rounded  items-center ">
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
          <article className="flex w-full justify-center gap-6 h-11/12 lg:w-[40%] flex-col items-center">
            <div className="w-full">
              <p className="font-black text-2xl">Register for free</p>
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
                  placeholder="Your full name"
                  {...register("fullname", {
                    required: {
                      value: true,
                      message: "required",
                    },
                  })}
                  className={`${
                    errors.fullname ? "border-red-500" : "border-gray-300"
                  } w-full rounded border px-5 py-3`}
                />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    {errors.fullname.message}
                  </span>
                )}
              </div>

              <div className="mt-0.5 mb-5">
                <input
                  type="text"
                  placeholder="Choose a username"
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

              <div className="mt-0.5 mb-5">
                <input
                  type="password"
                  placeholder="Create a password"
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
                className="w-full rounded bg-ember-600 px-4 py-3 font-semibold cursor-pointer text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-gray-400"
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
