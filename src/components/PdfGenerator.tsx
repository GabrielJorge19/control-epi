import { forwardRef, useImperativeHandle } from "react";
import type { EmployeeDocument } from "../types/employee";
import { downloadEmployeePdf, openEmployeePdfPreview } from "../services/pdf.service";

export type PdfGeneratorHandle = {
  downloadIndividual: (employee: EmployeeDocument) => Promise<void>;
  previewIndividual: (employee: EmployeeDocument) => Promise<void>;
};

export const PdfGenerator = forwardRef<PdfGeneratorHandle>(function PdfGenerator(_, ref) {
  useImperativeHandle(ref, () => ({
    downloadIndividual: (employee) => downloadEmployeePdf(employee),
    previewIndividual: (employee) => openEmployeePdfPreview(employee),
  }));
  return null;
});
