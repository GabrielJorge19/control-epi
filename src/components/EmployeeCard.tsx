import { Eye, FileDown, User } from "lucide-react";
import type { EmployeeDocument } from "../types/employee";

type Props = {
  employee: EmployeeDocument;
  busy?: boolean;
  onDownloadPdf: () => void;
  onPreviewPdfInNewTab: () => void;
};

export function EmployeeCard({
  employee,
  busy,
  onDownloadPdf,
  onPreviewPdfInNewTab,
}: Props) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          <User className="size-5" aria-hidden />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-900">{employee.nome}</h3>
          <p className="truncate text-xs text-slate-500">{employee.cargo}</p>
          <p className="mt-1 text-xs text-slate-600">
            <span className="font-medium text-slate-800">{employee.itens.length}</span>{" "}
            {employee.itens.length === 1 ? "item" : "itens"}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={onPreviewPdfInNewTab}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-medium text-sky-900 shadow-sm transition hover:bg-sky-100 disabled:opacity-50 cursor-pointer"
        >
          <Eye className="size-3.5" />
          Visualizar
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={onDownloadPdf}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
        >
          <FileDown className="size-3.5" />
          Baixar PDF
        </button>
      </div>
    </article>
  );
}
