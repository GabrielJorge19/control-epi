import { useCallback, useMemo, useRef, useState } from "react";
import { AlertTriangle, Archive, FileStack, Layers, Loader2, Users } from "lucide-react";
import { UploadExcel } from "../components/UploadExcel";
import { DocumentPreview } from "../components/DocumentPreview";
import { EmployeeCard } from "../components/EmployeeCard";
import { PdfGenerator, type PdfGeneratorHandle } from "../components/PdfGenerator";
import { parseExcelBuffer } from "../services/excel.service";
import {
  buildZipFromEmployees,
  downloadZipBlob,
  MERGED_PDF_FILENAME,
  buildMergedPdfFromEmployees,
  downloadBlob
} from "../services/pdf.service";
import { MOCK_EMPLOYEES, MOCK_EXCEL_ROW_COUNT } from "../data/mockEmployees";
import type { EmployeeDocument } from "../types/employee";
import { useToast } from "../hooks/useToast";
import { randomId } from "../utils/id";

type MergeProgress = {
  phase: "render" | "merge";
  done: number;
  total: number;
};

export function ToolPage() {
  const { show } = useToast();
  const pdfRef = useRef<PdfGeneratorHandle>(null);
  const zipCacheRef = useRef<{ key: string; blob: Blob } | null>(null);

  const [fileName, setFileName] = useState<string | null>(null);
  const [employees, setEmployees] = useState<EmployeeDocument[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [parseMeta, setParseMeta] = useState<{ rowCount: number; skipped: number } | null>(null);
  const [previewEmployee, setPreviewEmployee] = useState<EmployeeDocument | null>(null);

  const [reading, setReading] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [zipProgress, setZipProgress] = useState<{ done: number; total: number } | null>(null);

  const employeesKey = useMemo(() => employees.map((e) => e.id).join("|"), [employees]);
  const [mergeProgress, setMergeProgress] = useState<MergeProgress | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setReading(true);
      setFileName(file.name);
      setPreviewEmployee(null);
      zipCacheRef.current = null;
      try {
        const buffer = await file.arrayBuffer();
        const result = parseExcelBuffer(buffer);
        setErrors(result.errors);
        setWarnings(result.warnings);
        setParseMeta({ rowCount: result.rowCount, skipped: result.skippedEmptyRows });
        setEmployees(result.employees);

        if (result.ok) {
          show(`${result.employees.length} colaborador(es) carregado(s).`, "success");
        } else if (result.errors.length > 0) {
          result.errors.forEach((e) => show(e, "error"));
        } else {
          show("Não foi possível concluir a leitura da planilha.", "error");
        }
        result.warnings.slice(0, 5).forEach((w) => show(w, "info"));
        if (result.warnings.length > 5) {
          show(`… e mais ${result.warnings.length - 5} aviso(s) na lista abaixo.`, "info");
        }
      } catch {
        setEmployees([]);
        setErrors(["Falha ao ler o arquivo."]);
        setWarnings([]);
        setParseMeta(null);
        show("Falha ao ler o arquivo.", "error");
      } finally {
        setReading(false);
      }
    },
    [show],
  );

  const loadMockDemo = useCallback(() => {
    setFileName("demonstracao.xlsx");
    setPreviewEmployee(null);
    zipCacheRef.current = null;
    setErrors([]);
    setWarnings([]);
    setParseMeta({ rowCount: MOCK_EXCEL_ROW_COUNT, skipped: 0 });
    setEmployees(
      MOCK_EMPLOYEES.map((e) => ({
        ...e,
        id: randomId(),
        itens: e.itens.map((item) => ({ ...item })),
      })),
    );
    show("Dados de demonstração carregados.", "info");
  }, [show]);

  const runPdf = useCallback(
    async (fn: () => Promise<void>) => {
      setPdfBusy(true);
      try {
        await fn();
      } catch (e) {
        console.error(e);
        const msg = e instanceof Error ? e.message : "Erro ao gerar PDF. Tente novamente.";
        show(msg, "error");
      } finally {
        setPdfBusy(false);
        setMergeProgress(null);
        setZipProgress(null);
      }
    },
    [show],
  );

  const onDownloadOne = useCallback(
    (emp: EmployeeDocument) => {
      void runPdf(async () => {
        await pdfRef.current?.downloadIndividual(emp);
        show(`PDF baixado: ${emp.nome}`, "success");
      });
    },
    [runPdf, show],
  );

  const onPreviewPdfTab = useCallback(
    (emp: EmployeeDocument) => {
      void runPdf(async () => {
        await pdfRef.current?.previewIndividual(emp);
        show("PDF aberto em nova aba.", "info");
      });
    },
    [runPdf, show],
  );

  const generateAllZipToCacheAndDownload = useCallback(async () => {
    if (employees.length === 0) return;
    setZipProgress({ done: 0, total: employees.length });
    const blob = await buildZipFromEmployees(employees, (done, total) => {
      setZipProgress({ done, total });
    });
    setZipProgress(null);
    zipCacheRef.current = { key: employeesKey, blob };
    downloadZipBlob(blob);
    show("ZIP com todos os PDFs gerado e baixado.", "success");
  }, [employees, employeesKey, show]);

  const onDownloadZipOnly = useCallback(() => {
    const cached = zipCacheRef.current;
    if (cached && cached.key === employeesKey) {
      downloadZipBlob(cached.blob);
      show("ZIP baixado novamente (última geração).", "info");
      return;
    }
    void runPdf(generateAllZipToCacheAndDownload);
  }, [employeesKey, generateAllZipToCacheAndDownload, runPdf, show]);



  const onDownloadMergedPdf = useCallback(() => {
    if (employees.length === 0) return;
    void runPdf(async () => {
      const blob = await buildMergedPdfFromEmployees(employees, (phase, done, total) => {
        setMergeProgress({ phase, done, total });
      });
      downloadBlob(blob, MERGED_PDF_FILENAME);
      show(`PDF consolidado baixado (${employees.length} colaborador(es)).`, "success");
    });
  }, [employees, runPdf, show]);


  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 pt-16 pb-16 animate-fade-in">
      <PdfGenerator ref={pdfRef} />

      <section className="space-y-2 text-center sm:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Comprovantes de EPI e uniformes
        </h1>
        <p className="text-sm text-slate-600 sm:text-base">
          Envie a planilha Excel, revise os dados e gere PDFs individualmente ou em lote, tudo
          processado localmente no seu navegador.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Upload da planilha
        </h2>
        <UploadExcel
          fileName={fileName}
          disabled={reading}
          onFileSelected={handleFile}
          onInvalidFormat={() => show("Use apenas arquivos .xlsx ou .xls.", "error")}
          onLoadDemo={loadMockDemo}
        />
        {reading ? (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600">
            <Loader2 className="size-4 animate-spin" />
            Lendo planilha…
          </div>
        ) : null}
      </section>

      {parseMeta ? (
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <Users className="size-4" />
              <span className="text-xs font-medium uppercase">Colaboradores</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900">{employees.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <FileStack className="size-4" />
              <span className="text-xs font-medium uppercase">Documentos</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900">{employees.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <AlertTriangle className="size-4" />
              <span className="text-xs font-medium uppercase">Linhas / Ignoradas</span>
            </div>
            <p className="mt-2 text-sm text-slate-800">
              <span className="font-semibold">{parseMeta.rowCount}</span> linhas de dados ·{" "}
              <span className="font-semibold">{parseMeta.skipped}</span> vazias
            </p>
          </div>
        </section>
      ) : null}

      {errors.length > 0 ? (
        <section
          className="rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-950 shadow-sm"
          role="alert"
        >
          <p className="font-semibold">Erros</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {warnings.length > 0 ? (
        <section className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-950 shadow-sm">
          <p className="font-semibold">Avisos</p>
          <ul className="mt-2 max-h-48 list-inside list-disc space-y-1 overflow-y-auto">
            {warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {employees.length > 0 ? (
        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Documentos por colaborador
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={pdfBusy}
                onClick={onDownloadMergedPdf}
                // className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-900 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
              >
                {pdfBusy && mergeProgress ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Layers className="size-4" />
                )}
                Baixar PDF consolidado
              </button>
              <button
                type="button"
                disabled={pdfBusy}
                onClick={onDownloadZipOnly}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
              >
                <Archive className="size-4" />
                Baixar ZIP
              </button>

            </div>
          </div>
          {mergeProgress ? (
            <p className="text-xs text-slate-600">
              {mergeProgress.phase === "render"
                ? `Gerando comprovantes: ${mergeProgress.done}/${mergeProgress.total}`
                : "Unindo todos os PDFs em um único arquivo…"}
            </p>
          ) : zipProgress ? (
            <p className="text-xs text-slate-600">
              Gerando PDFs para o ZIP: {zipProgress.done}/{zipProgress.total}
            </p>
          ) : null}
          <div className="space-y-3">
            {employees.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                busy={pdfBusy}
                onDownloadPdf={() => onDownloadOne(emp)}
                onPreviewPdfInNewTab={() => onPreviewPdfTab(emp)}
              />
            ))}
          </div>
        </section>
      ) : null}

      {previewEmployee ? (
        <DocumentPreview
          employee={previewEmployee}
          onClose={() => setPreviewEmployee(null)}
        />
      ) : null}
    </div>
  );
}
