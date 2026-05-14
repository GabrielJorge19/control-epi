import html2pdf from "html2pdf.js";
import JSZip from "jszip";
import { PDFDocument } from "pdf-lib";
import { pdfFileNameForEmployee } from "../utils/fileName";
import { mountEmployeeDocumentForPdf, unmountPdfHandle } from "../utils/renderPdfDom";
import type { EmployeeDocument } from "../types/employee";

const defaultOptions = {
  margin: [0, 0, 0, 0] as [number, number, number, number],
  image: { type: "jpeg" as const, quality: 0.96 },
  html2canvas: {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  },
  jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
};

function waitNextFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

async function waitForLayout(): Promise<void> {
  await waitNextFrame();
  await waitNextFrame();
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      /* ignorar */
    }
  }
}

async function runHtml2PdfToBlob(element: HTMLElement, filename: string): Promise<Blob> {
  const chain = html2pdf()
    .set({ ...defaultOptions, filename })
    .from(element);

  const out = chain.outputPdf("blob") as unknown as Promise<Blob> & {
    thenExternal?: <T>(onFulfilled: (value: unknown) => T) => Promise<T>;
  };

  const unwrap = (value: unknown): Blob => {
    if (value instanceof Blob) return value;
    throw new TypeError("A geração do PDF não retornou um Blob válido.");
  };

  if (typeof out.thenExternal === "function") {
    return unwrap(await out.thenExternal((v) => v));
  }

  return unwrap(await out);
}

export async function employeeDocumentToPdfBlob(
  employee: EmployeeDocument,
): Promise<Blob> {
  const handle = mountEmployeeDocumentForPdf(employee);
  await waitForLayout();

  try {
    return await runHtml2PdfToBlob(
      handle.pdfRoot,
      pdfFileNameForEmployee(employee.nome),
    );
  } finally {
    unmountPdfHandle(handle);
  }
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2500);
}

export async function downloadEmployeePdf(employee: EmployeeDocument): Promise<void> {
  const blob = await employeeDocumentToPdfBlob(employee);
  downloadBlob(blob, pdfFileNameForEmployee(employee.nome));
}

export async function openEmployeePdfPreview(employee: EmployeeDocument): Promise<void> {
  const blob = await employeeDocumentToPdfBlob(employee);
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

export async function buildZipFromEmployees(
  employees: EmployeeDocument[],
  onProgress?: (done: number, total: number) => void,
): Promise<Blob> {
  const zip = new JSZip();
  let done = 0;
  for (const emp of employees) {
    const blob = await employeeDocumentToPdfBlob(emp);
    zip.file(pdfFileNameForEmployee(emp.nome), blob);
    done += 1;
    onProgress?.(done, employees.length);
  }
  return zip.generateAsync({ type: "blob", compression: "DEFLATE" });
}

export function downloadZipBlob(blob: Blob, filename = "comprovantes_epi.zip"): void {
  downloadBlob(blob, filename);
}

/** Junta vários PDFs num único documento (pdf-lib). */
export async function mergePdfBlobs(blobs: Blob[]): Promise<Blob> {
  if (blobs.length === 0) {
    throw new Error("Nenhum PDF para unir.");
  }
  const merged = await PDFDocument.create();
  for (const blob of blobs) {
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const doc = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    for (const page of pages) {
      merged.addPage(page);
    }
  }
  const out = await merged.save();
  return new Blob([Uint8Array.from(out)], { type: "application/pdf" });
}

export async function buildMergedPdfFromEmployees(
  employees: EmployeeDocument[],
  onProgress?: (phase: "render" | "merge", done: number, total: number) => void,
): Promise<Blob> {
  const blobs: Blob[] = [];
  const total = employees.length;
  let done = 0;
  for (const emp of employees) {
    blobs.push(await employeeDocumentToPdfBlob(emp));
    done += 1;
    onProgress?.("render", done, total);
  }
  onProgress?.("merge", 1, 1);
  return mergePdfBlobs(blobs);
}

export const MERGED_PDF_FILENAME = "comprovantes_epi_consolidado.pdf";
