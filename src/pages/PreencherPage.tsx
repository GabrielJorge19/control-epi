import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Eraser, Eye, FileDown, Info, Loader2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { A4LivePreview } from "../components/A4LivePreview";
import { DraftItemRows } from "../components/DraftItemRows";
import { downloadEmployeePdf, employeeDocumentToPdfBlob } from "../services/pdf.service";
import { useToast } from "../hooks/useToast";
import { randomId } from "../utils/id";
import { openPdfInNewTab } from "../utils/openPdfTab";
import { collapseSpaces } from "../utils/string";
import {
  createEmptyDraft,
  createEmptyItem,
  draftToEmployeeDocument,
  isDraftDirty,
  isDraftExportable,
} from "../utils/employeeDraft";
import type { DraftItem, EmployeeDraft } from "../types/employee";
import { ActionButton, TextField } from "../ui/field";

type PdfAction = "download" | "preview";

export function PreencherPage() {
  const { show } = useToast();
  const nomeRef = useRef<HTMLInputElement>(null);

  const [draft, setDraft] = useState<EmployeeDraft>(() => createEmptyDraft());
  const [action, setAction] = useState<PdfAction | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const pdfBusy = action !== null;

  /** Documento pronto para o `Template`/PDF; nunca nulo para a prévia ficar sempre desenhada. */
  const doc = useMemo(() => draftToEmployeeDocument(draft), [draft]);

  const canExport = isDraftExportable(draft);
  const dirty = isDraftDirty(draft);
  const faltaNome = !collapseSpaces(draft.nome);
  const mostrarErros = submitAttempted && !canExport;
  const erroNome = mostrarErros && faltaNome;
  const erroItens = mostrarErros && !faltaNome;

  const patchDraft = useCallback((patch: Partial<EmployeeDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const patchItem = useCallback((key: string, patch: Partial<DraftItem>) => {
    setDraft((prev) => ({
      ...prev,
      itens: prev.itens.map((item) => (item.key === key ? { ...item, ...patch } : item)),
    }));
  }, []);

  const addItem = useCallback(() => {
    setDraft((prev) => ({ ...prev, itens: [...prev.itens, createEmptyItem()] }));
  }, []);

  const removeItem = useCallback((key: string) => {
    setDraft((prev) =>
      prev.itens.length === 1 ? prev : { ...prev, itens: prev.itens.filter((i) => i.key !== key) },
    );
  }, []);

  const duplicateItem = useCallback((key: string) => {
    setDraft((prev) => {
      const index = prev.itens.findIndex((item) => item.key === key);
      if (index < 0) return prev;
      const itens = [...prev.itens];
      itens.splice(index + 1, 0, { ...prev.itens[index], key: randomId() });
      return { ...prev, itens };
    });
  }, []);

  const limpar = useCallback(() => {
    if (!window.confirm("Limpar todos os campos e começar de novo?")) return;
    setDraft(createEmptyDraft());
    setSubmitAttempted(false);
    nomeRef.current?.focus();
  }, []);

  /** Revela o que falta e joga o foco no primeiro campo infrágil. */
  const apontarFalta = useCallback(() => {
    setSubmitAttempted(true);
    if (faltaNome) nomeRef.current?.focus();
  }, [faltaNome]);

  // Guarda de recarga: os dados vivem só em memória, então avisamos antes de perdê-los.
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const runPdf = useCallback(
    async (kind: PdfAction, fn: () => Promise<void>) => {
      setAction(kind);
      try {
        await fn();
      } catch (e) {
        console.error(e);
        show(e instanceof Error ? e.message : "Erro ao gerar PDF.", "error");
      } finally {
        setAction(null);
      }
    },
    [show],
  );

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!canExport) {
        apontarFalta();
        return;
      }
      const alvo = doc;
      void runPdf("download", async () => {
        await downloadEmployeePdf(alvo);
        show(`PDF baixado: ${alvo.nome}`, "success");
      });
    },
    [apontarFalta, canExport, doc, runPdf, show],
  );

  const abrirVisualizacao = useCallback(() => {
    if (!canExport) {
      apontarFalta();
      return;
    }
    const alvo = doc;
    void runPdf("preview", () => openPdfInNewTab(() => employeeDocumentToPdfBlob(alvo)));
  }, [apontarFalta, canExport, doc, runPdf]);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 pt-16 pb-16 animate-fade-in">
      <section className="space-y-2 text-center sm:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Preencher comprovante manualmente
        </h1>
        <p className="text-sm text-slate-600 sm:text-base">
          Escreva os dados do colaborador e do equipamento entregue. A folha A4 ao lado é
          atualizada em tempo real e o PDF sai exatamente igual ao da planilha — tudo processado
          localmente no seu navegador.
        </p>
      </section>

      <form onSubmit={onSubmit} noValidate>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-4">
              <TextField
                label="Nome"
                value={draft.nome}
                onChange={(nome) => patchDraft({ nome })}
                placeholder="Maria Souza"
                autoComplete="off"
                autoFocus
                inputRef={nomeRef}
                error={erroNome}
                errorText="Informe o nome do colaborador."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Cargo"
                  value={draft.cargo}
                  onChange={(cargo) => patchDraft({ cargo })}
                  placeholder="Técnica de segurança"
                  autoComplete="off"
                />
                <TextField
                  label="Admissão"
                  value={draft.admissao}
                  onChange={(admissao) => patchDraft({ admissao })}
                  placeholder="10/01/2023"
                  inputMode="numeric"
                  autoComplete="off"
                />
              </div>
            </div>

            <hr className="my-5 border-slate-200" />

            <DraftItemRows
              itens={draft.itens}
              error={erroItens}
              onChangeItem={patchItem}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              onDuplicateItem={duplicateItem}
            />

            <hr className="my-5 border-slate-200" />

            <div className="flex flex-wrap gap-2">
              <ActionButton type="submit" disabled={pdfBusy}>
                {action === "download" ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <FileDown className="size-4" aria-hidden />
                )}
                Baixar PDF
              </ActionButton>
              <ActionButton variant="secondary" onClick={abrirVisualizacao} disabled={pdfBusy}>
                {action === "preview" ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <Eye className="size-4" aria-hidden />
                )}
                Visualizar
              </ActionButton>
              <ActionButton
                variant="ghost"
                onClick={limpar}
                disabled={!dirty}
                title="Apagar tudo e começar de novo"
              >
                <Eraser className="size-3.5" aria-hidden />
                Limpar
              </ActionButton>
            </div>

            {!canExport ? (
              <p className="mt-3 text-xs text-slate-500">
                Informe o nome do colaborador e pelo menos um equipamento para gerar o PDF.
              </p>
            ) : null}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-100/70 p-4 shadow-sm sm:p-6 lg:sticky lg:top-20 lg:self-start">
            <A4LivePreview employee={doc} vazio={!dirty} />
          </section>
        </div>
      </form>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 size-4 shrink-0 text-slate-400" aria-hidden />
          <div className="text-sm leading-relaxed text-slate-600">
            <p>
              Esta tela preenche <strong className="text-slate-800">um colaborador por vez</strong>.
              Os dados ficam só nesta aba: ao recarregar a página eles são apagados.
            </p>
            <p className="mt-1">
              Para gerar vários de uma só vez, use a{" "}
              <NavLink
                to="/tool"
                className="font-medium text-slate-900 underline underline-offset-2 hover:text-slate-700"
              >
                página da planilha
              </NavLink>
              , que aceita a lista inteira e gera o ZIP ou o PDF consolidado.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
