import type { ToastTone } from "../context/toastContext";

export type ToastItem = {
  id: string;
  message: string;
  tone: ToastTone;
};
