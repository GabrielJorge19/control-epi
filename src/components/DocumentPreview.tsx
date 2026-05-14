import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  AlignHorizontalJustifyCenter,
  AlignVerticalJustifyCenter,
  Minus,
  Plus,
  X,
} from "lucide-react";
import type { EmployeeDocument } from "../types/employee";


type Props = {
  employee: EmployeeDocument | null;
  onClose: () => void;
};

type FitMode = "height" | "width" | "manual";

const ZOOM_STEP = 1.12;
const SCALE_MIN = 0.12;
const SCALE_MAX = 4;
const VIEWPORT_MARGIN = 28;

/** Aproximação A4 (210×297 mm) em px para 1º frame antes da medição real. */
const FALLBACK_DOC = { w: 794, h: 1123 };

function clampScale(value: number): number {
  return Math.min(SCALE_MAX, Math.max(SCALE_MIN, value));
}

export function DocumentPreview({ employee, onClose }: Props) {
  if (!employee) return null;

  return <DocumentPreviewInner key={employee.id} employee={employee} onClose={onClose} />;
}

function DocumentPreviewInner({
  employee,
  onClose,
}: {
  employee: EmployeeDocument;
  onClose: () => void;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const [docSize, setDocSize] = useState(FALLBACK_DOC);
  const [scale, setScale] = useState(1);
  const [fitMode, setFitMode] = useState<FitMode>("height");

  const updateDocSize = useCallback(() => {
    const el = measureRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (w < 4 || h < 4) return;
    setDocSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
  }, []);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    updateDocSize();
    const ro = new ResizeObserver(() => updateDocSize());
    ro.observe(el);
    return () => ro.disconnect();
  }, [employee, updateDocSize]);

  const applyFitScale = useCallback(() => {
    const vp = viewportRef.current;
    const el = measureRef.current;
    if (!vp || !el || fitMode === "manual") return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (w < 8 || h < 8) return;
    const vw = Math.max(vp.clientWidth - VIEWPORT_MARGIN, 40);
    const vh = Math.max(vp.clientHeight - VIEWPORT_MARGIN, 40);
    const s = fitMode === "height" ? vh / h : vw / w;
    setScale(clampScale(s));
  }, [fitMode]);

  useLayoutEffect(() => {
    applyFitScale();
  }, [applyFitScale, docSize]);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp || fitMode === "manual") return;

    const ro = new ResizeObserver(() => applyFitScale());
    ro.observe(vp);
    return () => ro.disconnect();
  }, [applyFitScale, fitMode]);

  const fitHeight = useCallback(() => setFitMode("height"), []);
  const fitWidth = useCallback(() => setFitMode("width"), []);

  const zoomOut = useCallback(() => {
    setFitMode("manual");
    setScale((s) => clampScale(s / ZOOM_STEP));
  }, []);

  const zoomIn = useCallback(() => {
    setFitMode("manual");
    setScale((s) => clampScale(s * ZOOM_STEP));
  }, []);

  const scaledW = docSize.w * scale;
  const scaledH = docSize.h * scale;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/50 p-3 backdrop-blur-sm animate-fade-in sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Pré-visualização — ${employee.nome}`}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Pré-visualização</p>
            <p className="truncate text-sm font-semibold text-slate-900">{employee.nome}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={fitHeight}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 shadow-sm transition hover:bg-slate-50"
                title="Encaixar na altura da área de visualização"
              >
                <AlignVerticalJustifyCenter className="size-3.5 shrink-0" aria-hidden />
                Altura
              </button>
              <button
                type="button"
                onClick={fitWidth}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 shadow-sm transition hover:bg-slate-50"
                title="Encaixar na largura da área de visualização"
              >
                <AlignHorizontalJustifyCenter className="size-3.5 shrink-0" aria-hidden />
                Largura
              </button>
            </div>
            <span className="hidden h-6 w-px bg-slate-200 sm:inline" aria-hidden />
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-0.5">
              <button
                type="button"
                onClick={zoomOut}
                className="inline-flex size-8 items-center justify-center rounded-md text-slate-700 transition hover:bg-white hover:shadow-sm"
                aria-label="Diminuir zoom"
              >
                <Minus className="size-4" />
              </button>
              <span className="min-w-[3.25rem] text-center text-xs font-medium tabular-nums text-slate-700">
                {`${Math.round(scale * 100)}%`}
              </span>
              <button
                type="button"
                onClick={zoomIn}
                className="inline-flex size-8 items-center justify-center rounded-md text-slate-700 transition hover:bg-white hover:shadow-sm"
                aria-label="Aumentar zoom"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              aria-label="Fechar"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <div ref={viewportRef} className="min-h-0 flex-1 overflow-auto bg-slate-100">
          <div className="flex min-h-full justify-center p-4 sm:p-6">
            <div
              className="relative shrink-0"
              style={{
                width: scaledW,
                height: scaledH,
              }}
            >
              <div
                className="absolute left-0 top-0 origin-top-left will-change-transform"
                style={{ transform: `scale(${scale})` }}
              >
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
