"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

export type LinkFormData = {
  id: string;
  title: string;
  description: string;
  category: string;
  userId?: string;
};

interface LinkModalProps {
  onClose: () => void;
  onSubmit: (data: LinkFormData) => void;
  initialData?: LinkFormData;
}

const LinkModal = ({ onClose, onSubmit, initialData }: LinkModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<LinkFormData>({
    defaultValues: initialData ?? {
      title: "",
      description: "",
      category: "",
    },
    mode: "all",
  });

  useEffect(() => {
    reset(initialData ?? { title: "", description: "", category: "" });
  }, [initialData, reset]);

  const handleFormSubmit = (data: LinkFormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out">
        <button
          onClick={onClose}
          className="absolute cursor-pointer right-5 top-5 text-gray-500 hover:text-red-500"
        >
          X
        </button>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          {initialData ? "Edit link" : "Add link"}
        </h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="mt-0.5 mb-5">
            <input
              type="text"
              placeholder="Create a title"
              {...register("title", {
                required: {
                  value: true,
                  message: "required",
                },
              })}
              className={`${
                errors.title ? "border-red-500" : "border-gray-300"
              } w-full rounded border px-5 py-3`}
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="mt-0.5 mb-5">
            <textarea
              placeholder="Write a short description"
              {...register("description", {
                required: {
                  value: true,
                  message: "required",
                },
              })}
              className={`${
                errors.description ? "border-red-500" : "border-gray-300"
              } w-full rounded border px-5 py-3`}
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="mt-0.5 mb-5">
            <select
              {...register("category", {
                required: {
                  value: true,
                  message: "required",
                },
              })}
              className={`${
                errors.category ? "border-red-500" : "border-gray-300"
              } w-full rounded border px-5 py-3`}
            >
              <option value="">Select a category</option>
              <option value="work">Work</option>
              <option value="education">Education</option>
              <option value="personal">Personal</option>
              {`${
                errors.category ? "border-red-500" : "border-gray-300"
              } w-full rounded border px-5 py-3`}
            </select>
            {errors.category && (
              <span className="text-sm text-red-500">
                {errors.category.message}
              </span>
            )}
          </div>
          <div className="flex gap-4 justify-end">
            <button
              type="submit"
              disabled={!isValid}
              className="rounded bg-amber-600 px-6 py-3 font-semibold cursor-pointer text-white hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {initialData ? "Edit link" : "Add Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkModal;
