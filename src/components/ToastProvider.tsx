import { useCallback, useMemo, useState, type ReactNode } from "react";
import { ToastContext, type ToastTone } from "../context/toastContext";
import type { ToastItem } from "../types/toast";
import { randomId } from "../utils/id";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, tone: ToastTone = "info") => {
    const id = randomId();
    setItems((prev) => [...prev, { id, message, tone }]);
    window.setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0"
        aria-live="polite"
      >
        {items.map((t) => (
          <div
            key={t.id}
            className={[
              "pointer-events-auto rounded-lg border px-4 py-3 text-sm shadow-lg backdrop-blur-sm transition animate-toast-in",
              t.tone === "success" && "border-emerald-200 bg-emerald-50/95 text-emerald-950",
              t.tone === "error" && "border-red-200 bg-red-50/95 text-red-950",
              t.tone === "info" && "border-slate-200 bg-white/95 text-slate-900",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
