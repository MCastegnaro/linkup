"use client";

import { COLOR_MAP, Toast, ToastType } from "@/app/data/types/toast";
import { createContext, ReactNode, useState } from "react";

type ToastContextType = {
  toast: Toast;
  ShowToast: (message: string, type?: ToastType) => void;
  HideToast: () => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast>({
    show: false,
    message: "",
    color: "green",
  });

  const ShowToast = (message: string, type: ToastType = "success") => {
    setToast({ show: true, message, color: COLOR_MAP[type] });

    setTimeout(() => {
      HideToast();
    }, 3000);
  };

  const HideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  return (
    <ToastContext.Provider value={{ toast, ShowToast, HideToast }}>
      {children}
      {toast.show && (
        <div className="fixed bottom-8 right-4 z-50">
          <div className={`rounded-lg ${toast.color} p-4 text-white shadow-lg`}>
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
