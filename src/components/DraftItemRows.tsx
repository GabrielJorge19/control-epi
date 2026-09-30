import { Copy, Plus, Trash2 } from "lucide-react";
import type { DraftItem } from "../types/employee";
import { maskDate } from "../utils/dateMask";
import { ActionButton, TextField } from "../ui/field";

type Props = {
  itens: DraftItem[];
  error?: boolean;
  onChangeItem: (key: string, patch: Partial<DraftItem>) => void;
  onAddItem: () => void;
  onRemoveItem: (key: string) => void;
  onDuplicateItem: (key: string) => void;
};

/**
 * Grade de 6 células em 2 linhas alinhadas: Data | Quat. | Equipamento e,
 * na linha de baixo, Tamanho | CA | (vazio). O 1fr fica no campo de largura
 * variável e o Equipamento recebe 2,4fr, então o campo não colapsa — o que
 * acontecia com a grade de 6 colunas dentro de um card de 400px.
 */
export function DraftItemRows({
  itens,
  error = false,
  onChangeItem,
  onAddItem,
  onRemoveItem,
  onDuplicateItem,
}: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Itens entregues
        </h3>
        <span className="text-xs text-slate-500">
          {itens.length} {itens.length === 1 ? "linha" : "linhas"}
        </span>
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-300 bg-red-50/70 px-3 py-2 text-xs font-medium text-red-800"
        >
          Informe pelo menos um equipamento em um dos itens.
        </p>
      ) : null}

      <div className="space-y-3">
        {itens.map((item, index) => (
          <fieldset
            key={item.key}
            className={
              error
                ? "rounded-xl border border-red-300 bg-red-50/40 p-3"
                : "rounded-xl border border-slate-200 bg-slate-50/60 p-3"
            }
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <legend className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Item {index + 1}
              </legend>
              <div className="flex items-center gap-1">
                <ActionButton
                  variant="ghost"
                  onClick={() => onDuplicateItem(item.key)}
                  title="Duplicar linha"
                  ariaLabel={`Duplicar item ${index + 1}`}
                >
                  <Copy className="size-3.5" aria-hidden />
                </ActionButton>
                <ActionButton
                  variant="danger"
                  onClick={() => onRemoveItem(item.key)}
                  disabled={itens.length === 1}
                  title="Remover linha"
                  ariaLabel={`Remover item ${index + 1}`}
                >
                  <Trash2 className="size-3.5" aria-hidden />
                </ActionButton>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_72px_minmax(0,2.4fr)]">
              <TextField
                label="Data"
                value={item.data}
                onChange={(value) => onChangeItem(item.key, { data: maskDate(value) })}
                placeholder="dd/mm/aaaa"
                inputMode="numeric"
                autoComplete="off"
              />
              <TextField
                label="Quat."
                value={item.quantidade}
                onChange={(quantidade) => onChangeItem(item.key, { quantidade })}
                placeholder="1"
                inputMode="numeric"
                autoComplete="off"
              />
              <TextField
                label="Equipamento"
                value={item.equipamento}
                onChange={(equipamento) => onChangeItem(item.key, { equipamento })}
                placeholder="Capacete classe B"
                autoComplete="off"
              />
              <TextField
                label="Tamanho"
                value={item.tamanho}
                onChange={(tamanho) => onChangeItem(item.key, { tamanho })}
                placeholder="M"
                autoComplete="off"
              />
              <TextField
                label="CA"
                value={item.ca}
                onChange={(ca) => onChangeItem(item.key, { ca })}
                placeholder="38.XXX"
                inputMode="numeric"
                autoComplete="off"
              />
              {/* Mantém a 3ª coluna da linha 2 alinhada com o Equipamento acima. */}
              <div aria-hidden className="hidden sm:block" />
            </div>
          </fieldset>
        ))}
      </div>

      <ActionButton variant="secondary" onClick={onAddItem}>
        <Plus className="size-4" aria-hidden />
        Adicionar item
      </ActionButton>
    </div>
  );
}
