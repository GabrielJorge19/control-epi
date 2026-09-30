import { useLayoutEffect, useRef, useState } from "react";
import Template from "../templates/Template";
import type { EmployeeDocument } from "../types/employee";

/** 210×296 mm em px a 96 dpi — mesma geometria de `Template.styles.page`. */
const A4_WIDTH_PX = (210 * 96) / 25.4;
const A4_HEIGHT_PX = (296 * 96) / 25.4;

type Props = {
  employee: EmployeeDocument;
  /** Mostra a dica de preenchimento sobre a folha enquanto não há o que exibir. */
  vazio?: boolean;
};

/**
 * Renderiza o `Template` dentro da página, com a folha A4 ajustada à largura
 * disponível.
 *
 * É apenas visual: a exportação continua passando por `pdf.service`, que monta
 * uma cópia off-screen — este nó nunca é entregue ao html2canvas.
 */
export function A4LivePreview({ employee, vazio = false }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const applyScale = () => {
      const available = frame.clientWidth;
      if (available < 8) return;
      setScale(Math.max(0.15, Math.min(1, available / A4_WIDTH_PX)));
    };

    applyScale();
    const observer = new ResizeObserver(applyScale);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const boxW = A4_WIDTH_PX * scale;
  const boxH = A4_HEIGHT_PX * scale;

  return (
    <div
      ref={frameRef}
      className="w-full overflow-hidden"
    >
      <div className="mx-auto w-full">
        <div
          className="relative overflow-hidden bg-white shadow-xl ring-1 ring-slate-300"
          style={{ width: boxW, height: boxH }}
        >
          <div
            style={{
              width: A4_WIDTH_PX,
              height: A4_HEIGHT_PX,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              willChange: "transform",
            }}
          >
            <Template employee={employee} />
          </div>

          {vazio ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/75 p-6 text-center">
              <p className="text-sm leading-relaxed text-slate-600">
                A folha aparece aqui conforme você preenche o formulário.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
