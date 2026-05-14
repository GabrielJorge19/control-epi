import { useCallback, useRef, type ChangeEvent, type DragEvent } from "react";
import { Upload } from "lucide-react";

const ACCEPT = ".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel";

type Props = {
  fileName: string | null;
  disabled?: boolean;
  onFileSelected: (file: File) => void;
  onInvalidFormat?: () => void;
  onLoadDemo?: () => void;
};

export function UploadExcel({
  fileName,
  disabled,
  onFileSelected,
  onInvalidFormat,
  onLoadDemo,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;
      const lower = file.name.toLowerCase();
      if (!lower.endsWith(".xlsx") && !lower.endsWith(".xls")) {
        onInvalidFormat?.();
        return;
      }
      onFileSelected(file);
    },
    [onFileSelected, onInvalidFormat],
  );

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      if (disabled) return;
      const file = e.dataTransfer.files?.[0];
      if (!file) return;
      const lower = file.name.toLowerCase();
      if (!lower.endsWith(".xlsx") && !lower.endsWith(".xls")) {
        onInvalidFormat?.();
        return;
      }
      onFileSelected(file);
    },
    [disabled, onFileSelected, onInvalidFormat],
  );

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className={[
        "group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition",
        disabled
          ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-60"
          : "border-slate-300 bg-white hover:border-sky-400 hover:bg-sky-50/40",
      ].join(" ")}
      onClick={pick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          pick();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
      />
      <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-600 shadow-inner transition group-hover:bg-sky-100 group-hover:text-sky-700">
        <Upload className="size-7" aria-hidden />
      </div>
      <p className="text-base font-semibold text-slate-900">Arraste a planilha ou clique para selecionar</p>
      <p className="mt-1 text-sm text-slate-500">Apenas arquivos .xlsx ou .xls</p>
      {onLoadDemo ? (
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onLoadDemo();
          }}
          className="mt-3 text-xs font-medium text-slate-500 underline decoration-slate-300 underline-offset-2 transition hover:text-slate-700 hover:decoration-slate-500 disabled:pointer-events-none disabled:opacity-50"
        >
          Usar dados de demonstração
        </button>
      ) : null}
      {fileName ? (
        <p className="mt-4 inline-flex max-w-full items-center gap-2 truncate rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-white shadow-md">
          {fileName}
        </p>
      ) : null}
    </div>
  );
}
