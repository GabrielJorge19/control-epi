import {
  AlertCircle,
  Archive,
  CheckCircle2,
  ChevronDown,
  FileSpreadsheet,
  FileStack,
  FileText,
  HandHelping,
  HelpCircle,
  Home,
  Laptop,
  Lock,
  MousePointerClick,
  Shield,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";

function StepBadge({ n }: { n: number }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white shadow-sm">
      {n}
    </span>
  );
}

function FaqItem({ question, children }: { question: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-semibold text-slate-900 transition hover:bg-slate-50 sm:px-5"
        aria-expanded={open}
      >
        <span className="flex items-start gap-2">
          <HelpCircle className="mt-0.5 size-4 shrink-0 text-slate-500" aria-hidden />
          {question}
        </span>
        <ChevronDown
          className={`size-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="border-t border-slate-100 px-4 pb-4 pt-3 text-sm leading-relaxed text-slate-600 sm:px-5 sm:pb-5">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function GuiaDeUsoPage() {
  return (
    <div className="mx-auto w-full max-w-5xl pt-16 pb-20">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50 via-white to-sky-50 px-6 py-12 sm:px-10 sm:py-14"
        aria-labelledby="guia-hero-titulo"
      >
        <div className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-12 size-48 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-teal-200/90 bg-white/80 px-3 py-1 text-xs font-medium text-teal-900 shadow-sm">
            <HandHelping className="size-3.5" aria-hidden />
            Guia para quem usa no dia a dia
          </p>
          <h1
            id="guia-hero-titulo"
            className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Guia de uso — passo a passo
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 sm:text-xl">
            Transforme sua planilha em <strong className="font-semibold text-slate-800">comprovantes em PDF</strong> em poucos cliques. Sem complicação: leia com calma e siga a ordem dos passos.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Este sistema ajuda a montar os documentos de entrega de EPI e uniformes a partir de uma lista no Excel.
          </p>
          <div className="mt-8">
            <NavLink
              to="/tool"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
            >
              <Home className="size-4" aria-hidden />
              Ir para a página principal
            </NavLink>
          </div>
        </div>
      </section>

      {/* Antes de começar */}
      <section className="mt-14 sm:mt-16" aria-labelledby="guia-antes-titulo">
        <div className="flex items-center gap-2">
          <Sparkles className="size-6 text-amber-500" aria-hidden />
          <h2 id="guia-antes-titulo" className="text-xl font-bold text-slate-900 sm:text-2xl">
            Antes de começar
          </h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <FileSpreadsheet className="size-5" aria-hidden />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-900">Você precisa de uma planilha</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              O formato mais comum é <strong className="text-slate-800">Excel</strong> (arquivo .xlsx ou .xls). É nela que estarão os nomes e os itens entregues.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex size-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
              <FileText className="size-5" aria-hidden />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-900">Cada linha é um item</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Pense assim: <strong className="text-slate-800">uma linha</strong> da planilha = um equipamento ou uniforme registrado na entrega (com data, quantidade, etc.).
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex size-10 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
              <Laptop className="size-5" aria-hidden />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-900">Tudo no seu navegador</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Você usa o sistema pelo <strong className="text-slate-800">Google Chrome, Edge, Firefox</strong> ou outro navegador moderno — como se fosse um site comum.
            </p>
          </div>
        </div>
      </section>

      {/* Passo a passo */}
      <section className="mt-16 sm:mt-20" aria-labelledby="guia-passos-titulo">
        <h2 id="guia-passos-titulo" className="text-xl font-bold text-slate-900 sm:text-2xl">
          Passo a passo
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Siga a ordem abaixo. Não há pressa: você pode voltar e ajustar a planilha quantas vezes precisar.
        </p>

        <ol className="mt-10 space-y-12">
          {/* Passo 1 */}
          <li className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <StepBadge n={1} />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-slate-900">Preparar a planilha</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  A <strong className="text-slate-800">primeira linha</strong> da planilha deve ser o cabeçalho (os nomes das colunas). Abaixo vêm os dados, uma entrega por linha.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  <strong className="text-slate-800">Importante:</strong> se várias linhas tiverem o <strong>mesmo nome de colaborador</strong>, o sistema entende que são vários itens da mesma pessoa e <strong>junta tudo num único comprovante</strong> para ela.
                </p>

                <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <p className="border-b border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Colunas que você deve ter (pode usar maiúsculas ou minúsculas no título)
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[520px] text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-100/80 text-xs font-semibold text-slate-700">
                          <th className="px-3 py-2">Nome da coluna</th>
                          <th className="px-3 py-2">O que colocar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-700">
                        <tr>
                          <td className="px-3 py-2 font-mono text-xs sm:text-sm">nome</td>
                          <td className="px-3 py-2">Nome completo do colaborador</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-mono text-xs sm:text-sm">cargo</td>
                          <td className="px-3 py-2">Função na empresa</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-mono text-xs sm:text-sm">admissao</td>
                          <td className="px-3 py-2">Data de admissão (se quiser registrar)</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-mono text-xs sm:text-sm">data</td>
                          <td className="px-3 py-2">Data em que o item foi entregue</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-mono text-xs sm:text-sm">quantidade</td>
                          <td className="px-3 py-2">Número de unidades (ex.: 1, 2)</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-mono text-xs sm:text-sm">equipamento</td>
                          <td className="px-3 py-2">Descrição do item (ex.: calçado de segurança)</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-mono text-xs sm:text-sm">tamanho</td>
                          <td className="px-3 py-2">Tamanho do uniforme, ou um traço (—) se não houver</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-mono text-xs sm:text-sm">ca</td>
                          <td className="px-3 py-2">Número do CA do equipamento, quando existir</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 sm:text-sm">
                  <p className="font-semibold text-slate-800">Exemplo bem simples (só para visualizar a ideia):</p>
                  <pre className="mt-2 overflow-x-auto rounded-md bg-slate-900 p-3 font-mono text-[11px] leading-relaxed text-slate-100 sm:text-xs">
{`nome          | cargo    | data       | quantidade | equipamento
Maria Silva   | Auxiliar | 10/01/2026 | 1          | Luvas nitrílicas
Maria Silva   | Auxiliar | 10/01/2026 | 1          | Óculos de proteção
João Santos   | Motorista| 11/01/2026 | 1          | Colete refletivo`}
                  </pre>
                  <p className="mt-2">
                    Maria aparece <strong>duas vezes</strong> porque recebeu <strong>dois itens</strong> — no comprovante dela os dois aparecem juntos.
                  </p>
                </div>
              </div>
            </div>
          </li>

          {/* Passo 2 */}
          <li className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <StepBadge n={2} />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-slate-900">Enviar o arquivo</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Na página principal, localize a área de envio. Você pode fazer de <strong className="text-slate-800">dois jeitos</strong>:
                </p>
                <ul className="mt-5 space-y-4">
                  <li className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                    <Upload className="mt-0.5 size-5 shrink-0 text-slate-700" aria-hidden />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Arrastar e soltar</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Clique na planilha no computador, segure o botão do mouse, arraste até a área indicada na tela e solte.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                    <MousePointerClick className="mt-0.5 size-5 shrink-0 text-slate-700" aria-hidden />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Clicar para escolher</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Clique na área de envio e escolha o arquivo no explorador de arquivos. Confirme com “Abrir”.
                      </p>
                    </div>
                  </li>
                </ul>
                <p className="mt-5 flex items-start gap-2 rounded-lg bg-teal-50 px-4 py-3 text-sm text-teal-900">
                  <Sparkles className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>
                    <strong className="font-semibold">Não tem planilha à mão?</strong> Na mesma tela existe a opção de usar <strong>dados de demonstração</strong>, só para ver como a lista e os botões funcionam.
                  </span>
                </p>
              </div>
            </div>
          </li>

          {/* Passo 3 */}
          <li className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <StepBadge n={3} />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-slate-900">Conferir os colaboradores</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Depois que o arquivo for lido, aparece uma <strong className="text-slate-800">lista com os nomes</strong>, cargo e quantidade de itens de cada pessoa. Use esse momento para revisar se está tudo certo.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <div className="flex flex-1 items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <AlertCircle className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden />
                    <div>
                      <p className="text-sm font-semibold text-amber-950">Avisos</p>
                      <p className="mt-1 text-sm leading-relaxed text-amber-950/90">
                        São lembretes (por exemplo, diferença de cargo para o mesmo nome). Vale a pena ler com atenção e ajustar a planilha se necessário.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                    <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-700" aria-hidden />
                    <div>
                      <p className="text-sm font-semibold text-red-950">Erros</p>
                      <p className="mt-1 text-sm leading-relaxed text-red-950/90">
                        Indicam algo que impede de seguir (como coluna obrigatória faltando). Corrija no Excel, salve de novo e envie o arquivo outra vez.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <Users className="size-5 shrink-0 text-slate-600" aria-hidden />
                  <p className="text-sm text-slate-600">
                    Você pode abrir a <strong className="text-slate-800">visualização</strong> de um colaborador para ver como o comprovante vai ficar antes de baixar.
                  </p>
                </div>
              </div>
            </div>
          </li>

          {/* Passo 4 */}
          <li className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <StepBadge n={4} />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-slate-900">Gerar e baixar os PDFs</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Quando a lista estiver correta, use os botões na tela. O sistema pode demorar um pouquinho se forem <strong className="text-slate-800">muitos colaboradores</strong> — é normal, aguarde até aparecer a mensagem de conclusão ou o download começar.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4">
                    <FileText className="size-6 text-slate-700" aria-hidden />
                    <p className="mt-3 text-sm font-semibold text-slate-900">PDF por pessoa</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      Em cada cartão do colaborador: abrir na tela ou baixar <strong>um PDF só daquela pessoa</strong>.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4">
                    <Archive className="size-6 text-slate-700" aria-hidden />
                    <p className="mt-3 text-sm font-semibold text-slate-900">Pacote ZIP</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      Um único arquivo compactado com <strong>vários PDFs</strong> dentro — um por colaborador. Bom para enviar por e-mail ou guardar na pasta da empresa.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4">
                    <FileStack className="size-6 text-slate-700" aria-hidden />
                    <p className="mt-3 text-sm font-semibold text-slate-900">PDF único (várias páginas)</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      Todos os comprovantes em <strong>um só PDF</strong>, um após o outro — prático para imprimir em sequência.
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm text-slate-600">
                  Os downloads costumam ir para a pasta <strong className="text-slate-800">“Downloads”</strong> do seu computador, com nomes fáceis de reconhecer.
                </p>
              </div>
            </div>
          </li>
        </ol>
      </section>

      {/* Se algo der errado */}
      <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="guia-erros-titulo">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-6 text-green-600" aria-hidden />
          <h2 id="guia-erros-titulo" className="text-lg font-bold text-slate-900 sm:text-xl">
            Se algo der errado, tente isto
          </h2>
        </div>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
          <li className="flex gap-2">
            <span className="text-slate-400">•</span>
            <span>
              <strong className="text-slate-800">Leia a mensagem na tela.</strong> Ela costuma dizer o que falta (por exemplo, uma coluna com nome diferente do esperado).
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-slate-400">•</span>
            <span>
              <strong className="text-slate-800">Confira a primeira linha</strong> da planilha: precisa ser o cabeçalho, sem linhas em branco acima.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-slate-400">•</span>
            <span>
              <strong className="text-slate-800">Salve o Excel de novo</strong> e envie o arquivo outra vez após corrigir.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-slate-400">•</span>
            <span>
              <strong className="text-slate-800">Feche outros programas pesados</strong> se o computador estiver lento ao gerar muitos PDFs de uma vez.
            </span>
          </li>
        </ul>
      </section>

      {/* Dicas importantes */}
      <section className="mt-16 sm:mt-20" aria-labelledby="guia-dicas-titulo">
        <h2 id="guia-dicas-titulo" className="text-xl font-bold text-slate-900 sm:text-2xl">
          Dicas importantes
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Nomes iguais</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Use sempre o <strong>mesmo jeito de escrever</strong> o nome da pessoa (sem abreviar de um jeito numa linha e de outro na linha seguinte), para o sistema agrupar no mesmo comprovante.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Linhas vazias</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Evite linhas totalmente em branco no meio da lista. O sistema tenta ignorá-las, mas é mais limpo deixar só as linhas com dados.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Quantidades</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Prefira números simples na coluna de quantidade (<strong>1</strong>, <strong>2</strong>…). Evite misturar texto onde deveria ser número.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Uma folha por arquivo</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              O sistema usa a <strong>primeira aba</strong> do Excel. Se os dados estiverem em outra aba, copie para a primeira ou reorganize o arquivo.
            </p>
          </div>
        </div>
      </section>

      {/* Privacidade */}
      <section className="mt-16 sm:mt-20" aria-labelledby="guia-priv-titulo">
        <div className="overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white shadow-sm">
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-800">
              <Shield className="size-6" aria-hidden />
            </div>
            <div>
              <h2 id="guia-priv-titulo" className="text-xl font-bold text-slate-900">
                Privacidade e segurança
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                Quando você usa esta aplicação, <strong className="text-slate-900">os dados da planilha não são enviados para um servidor da empresa do sistema</strong> para serem guardados lá. O trabalho de ler a planilha e montar os PDFs acontece no <strong className="text-slate-900">seu próprio computador</strong>, pelo navegador.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-600 sm:text-sm">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 font-medium text-slate-700 shadow-sm">
                  <Lock className="size-3.5" aria-hidden />
                  Uso local dos seus ficheiros
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16 sm:mt-20" aria-labelledby="guia-faq-titulo">
        <h2 id="guia-faq-titulo" className="text-xl font-bold text-slate-900 sm:text-2xl">
          Perguntas frequentes
        </h2>
        <p className="mt-2 text-sm text-slate-600">Toque na pergunta para ver a resposta.</p>
        <div className="mt-6 space-y-3">
          <FaqItem question="Preciso instalar algum programa?">
            <p>
              Não. Basta abrir o site no navegador. O Excel (ou outro programa) você já usa para montar a planilha — isso continua igual ao que você já faz hoje.
            </p>
          </FaqItem>
          <FaqItem question="Funciona sem internet?">
            <p>
              Na <strong>primeira vez</strong>, você precisa de internet para carregar a página do sistema. Depois que a página já estiver aberta, o processamento da planilha e a criação dos PDFs acontecem no seu aparelho, <strong>sem enviar a planilha para a internet</strong> nesse passo.
            </p>
          </FaqItem>
          <FaqItem question="Posso usar no celular?">
            <p>
              Em teoria, sim, se o celular abrir o site e permitir escolher o arquivo. Na prática, para <strong>muitas pessoas e muitos PDFs</strong>, o celular pode ficar lento. Recomendamos usar um <strong>computador</strong> quando for gerar vários documentos de uma vez.
            </p>
          </FaqItem>
          <FaqItem question="O sistema guarda meus dados depois que eu fecho?">
            <p>
              Não há um “cadastro” seu com a planilha guardada no site. Ao fechar a aba, o que estava na tela some — se precisar de novo, é só enviar o arquivo outra vez.
            </p>
          </FaqItem>
        </div>
      </section>

      {/* Rodapé do guia */}
      <div className="mt-16 flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center">
        <p className="max-w-md text-sm text-slate-600">
          Pronto para tentar? Vá para a página da ferramenta, envie sua planilha e siga os passos com calma.
        </p>
        <NavLink
          to="/tool"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <Upload className="size-4" aria-hidden />
          Começar agora
        </NavLink>
      </div>
    </div>
  );
}
