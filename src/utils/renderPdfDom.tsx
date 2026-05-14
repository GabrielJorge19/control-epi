import { createRoot, type Root } from "react-dom/client";
import { flushSync } from "react-dom";

import type { EmployeeDocument } from "../types/employee";
import Template from "../templates/Template";

export type PdfMountHandle = {
  root: Root;
  container: HTMLDivElement;
  /** Estilos injetados só para o isolamento do PDF (remove oklch herdado do body). */
  resetStyle: HTMLStyleElement;
  pdfRoot: HTMLElement;
};

function safeDomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `epi-pdf-${crypto.randomUUID().replaceAll("-", "")}`;
  }
  return `epi-pdf-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Monta o template no documento principal (não em iframe).
 * O html2canvas usa `window.getComputedStyle` da janela principal; com nós num iframe
 * o motor pode acabar a ler cores em oklch herdadas do Tailwind no body.
 * O wrapper + <style> forçam cor/fundo em hex para toda a subárvore do PDF.
 */
export function mountEmployeeDocumentForPdf(employee: EmployeeDocument): PdfMountHandle {
  const mountId = safeDomId();

  const resetStyle = document.createElement("style");
  resetStyle.setAttribute("data-epi-pdf-reset", "");
  resetStyle.textContent = `
#${mountId} {
  color: #000000 !important;
  background-color: #ffffff !important;
  font-family: Arial, Helvetica, sans-serif;
}
`.trim();
  document.head.appendChild(resetStyle);

  const container = document.createElement("div");
  container.id = mountId;
  container.setAttribute("aria-hidden", "true");
  container.style.position = "fixed";
  container.style.left = "-24000px";
  container.style.top = "0";
  container.style.pointerEvents = "none";
  container.style.zIndex = "0";
  document.body.appendChild(container);

  const root = createRoot(container);
  flushSync(() => {
    root.render(<Template employee={employee} />);
  });

  const pdfRoot = container.querySelector("[data-pdf-root]");
  if (!(pdfRoot instanceof HTMLElement)) {
    root.unmount();
    container.remove();
    resetStyle.remove();
    throw new Error("Elemento de PDF não encontrado no template.");
  }

  return { root, container, resetStyle, pdfRoot };
}

export function unmountPdfHandle(handle: PdfMountHandle): void {
  handle.root.unmount();
  handle.container.remove();
  handle.resetStyle.remove();
}
