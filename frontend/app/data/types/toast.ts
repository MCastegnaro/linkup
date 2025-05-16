export type ToastType = "success" | "error" | "info" | "warning";

export type Toast = {
  show: boolean;
  message: string;
  color: string;
};

export const COLOR_MAP = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "blue",
  warning: "yellow",
};
