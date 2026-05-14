import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ArrowRight,
  Bell,
  BookOpen,
  Boxes,
  Cpu,
  Eye,
  FileDown,
  FileStack,
  FolderTree,
  HardDrive,
  Layers,
  Lock,
  Palette,
  ShieldCheck,
  Sparkles,
  Table,
  Upload,
  Zap,
} from "lucide-react";
import { NavLink } from "react-router-dom";

type FeatureCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const features: FeatureCard[] = [
  {
    title: "Upload de Excel",
    description:
      "Arrastar e soltar ou selecionar ficheiros .xlsx / .xls, com indicação clara do nome do ficheiro carregado.",
    icon: Upload,
  },
  {
    title: "Demonstração",
    description:
      "Link discreto para carregar dados de exemplo sem planilha — ideal para demos, testes e portfólio.",
    icon: Sparkles,
  },
  {
    title: "Pré-visualização",
    description:
      "Lista de colaboradores com cargo e quantidade de itens; modal com zoom (altura, largura, +/-).",
    icon: Eye,
  },
  {
    title: "PDF individual",
    description:
      "Por colaborador: abrir numa nova aba ou descarregar com nome de ficheiro sanitizado e previsível.",
    icon: FileDown,
  },
  {
    title: "ZIP em lote",
    description:
      "Gera um PDF por pessoa e empacota tudo num .zip; cache da última geração para voltar a descarregar.",
    icon: Archive,
  },
  {
    title: "PDF consolidado",
    description:
      "Une todos os comprovantes num único PDF com pdf-lib — arquivo ou impressão em sequência.",
    icon: FileStack,
  },
  {
    title: "Feedback de fluxo",
    description:
      "Estados de carregamento, toasts (sucesso, erro, informação) e lista de erros/avisos após o parse.",
    icon: Bell,
  },
];

const stackItems = [
  { label: "React 19", hint: "UI" },
  { label: "TypeScript", hint: "tipagem end-to-end" },
  { label: "Vite 8", hint: "build" },
  { label: "Tailwind CSS 4", hint: "estilos" },
  { label: "Lucide React", hint: "ícones" },
  { label: "SheetJS (xlsx)", hint: "Excel no cliente" },
  { label: "html2pdf.js", hint: "HTML → PDF" },
  { label: "pdf-lib", hint: "fusão de PDFs" },
  { label: "JSZip", hint: "pacotes .zip" },
  { label: "ESLint + TS ESLint", hint: "qualidade" },
] as const;

const benefits = [
  {
    title: "Menos trabalho manual",
    description:
      "De N operações de copiar/colar para 1 upload e 1 clique em ZIP ou PDF consolidado (mais PDFs individuais quando precisar).",
    icon: Zap,
  },
  {
    title: "Layout consistente",
    description:
      "O mesmo template oficial para todos; agrupamento automático por colaborador e validação de colunas.",
    icon: Layers,
  },
  {
    title: "Rastreio e arquivo",
    description:
      "Ficheiros nomeados por pessoa; ZIP e consolidado com nomes previsíveis para conformidade e auditoria.",
    icon: BookOpen,
  },
  {
    title: "Sem dependência de servidor",
    description:
      "Abre no browser: sem backend, sem filas de TI nem licenças de integração para o fluxo base.",
    icon: HardDrive,
  },
] as const;

const architectureTree = `src/
├── App.tsx
├── pages/
├── components/
├── services/
├── templates/
├── hooks/
├── context/
├── types/
├── utils/
├── data/
├── styles/
└── ui/`;

export function SobrePage() {
  return (
    <div className="mx-auto w-full max-w-5xl pt-16 pb-16">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 px-6 py-14 sm:px-10 sm:py-16"
        aria-labelledby="sobre-hero-heading"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-slate-200/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 size-56 rounded-full bg-slate-300/40 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Portfólio técnico · Frontend-only
          </p>
          <h1
            id="sobre-hero-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Control EPI
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Geração em massa de <strong className="font-semibold text-slate-800">comprovantes de entrega de EPI e uniformes</strong> a partir de planilhas Excel — com validação, agrupamento por colaborador e exportação em PDF/ZIP,{" "}
            <strong className="font-semibold text-slate-800">100% no navegador</strong>.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <NavLink
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Ir para a app
              <ArrowRight className="size-4" aria-hidden />
            </NavLink>
            <p className="text-sm text-slate-500">
              Ideal para equipas de SST, RH e operações que precisam de documentação formal por entrega.
            </p>
          </div>
        </div>
      </section>

      {/* Problema + ganho */}
      <section className="mt-16 grid gap-10 lg:grid-cols-2" aria-labelledby="sobre-problema-heading">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 id="sobre-problema-heading" className="text-lg font-semibold text-slate-900">
            Problema que resolve
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Empresas que entregam EPI e uniformes precisam, com frequência, de um documento formal por colaborador (assinatura, rastreio, alinhamento com NR). O fluxo manual costuma ser copiar dados da planilha para Word/PDF um a um, com risco de erro e layout inconsistente — e tempo alto quando há dezenas ou centenas de entregas.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            O Control EPI automatiza: <strong className="text-slate-800">uma planilha</strong> com todas as linhas → o sistema{" "}
            <strong className="text-slate-800">agrupa por colaborador</strong>, valida colunas obrigatórias e gera documentos prontos para impressão ou arquivo digital.
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/80 p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2 text-emerald-900">
            <Zap className="size-5 shrink-0" aria-hidden />
            <h2 className="text-lg font-semibold">Ganho de produtividade</h2>
          </div>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-emerald-900/90">
            <li>Redução drástica de cópias manuais e retrabalho de formatação.</li>
            <li>Consistência visual e de dados entre todos os comprovantes.</li>
            <li>Escala com o volume: quanto mais linhas e colaboradores, maior o tempo poupado.</li>
            <li>Menos dependência de infraestrutura para colocar o fluxo a funcionar.</li>
          </ul>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="mt-20" aria-labelledby="sobre-features-heading">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="sobre-features-heading" className="text-2xl font-bold tracking-tight text-slate-900">
              Funcionalidades principais
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Do upload ao pacote final: cada etapa foi desenhada para produção real, não só demo.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <article
                key={f.title}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{f.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Stack */}
      <section className="mt-20" aria-labelledby="sobre-stack-heading">
        <h2 id="sobre-stack-heading" className="text-2xl font-bold tracking-tight text-slate-900">
          Stack técnica
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Escolhas modernas e pragmáticas: DX com Vite e TypeScript, UI com Tailwind, dados com SheetJS e pipeline de PDF no cliente.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {stackItems.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm"
              title={item.hint}
            >
              <Cpu className="size-3.5 shrink-0 text-slate-500" aria-hidden />
              {item.label}
            </span>
          ))}
        </div>
      </section>

      {/* Arquitetura */}
      <section className="mt-20" aria-labelledby="sobre-arch-heading">
        <h2 id="sobre-arch-heading" className="text-2xl font-bold tracking-tight text-slate-900">
          Arquitetura do projeto
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Separação clara entre UI, serviços, template do documento e utilitários — para evoluir o template ou o motor de PDF sem espalhar lógica.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-700 px-4 py-2.5">
              <FolderTree className="size-4 text-slate-400" aria-hidden />
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Árvore src/</span>
            </div>
            <pre className="max-h-[min(420px,55vh)] overflow-auto p-4 text-xs leading-relaxed text-slate-100">
              <code>{architectureTree}</code>
            </pre>
          </div>

          <div className="flex flex-col justify-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Fluxo de dados (alto nível)</h3>
            <ol className="mt-4 space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                  1
                </span>
                <span>
                  <strong className="text-slate-800">Upload</strong> — o utilizador envia a planilha ou usa dados de demonstração.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                  2
                </span>
                <span>
                  <strong className="text-slate-800">excel.service</strong> — parse, normalização de cabeçalhos, validação e agrupamento por colaborador.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                  3
                </span>
                <span>
                  <strong className="text-slate-800">Estado na página</strong> — lista, pré-visualização e ações por colaborador ou em lote.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                  4
                </span>
                <span>
                  <strong className="text-slate-800">Template + pdf.service</strong> — render do comprovante, html2pdf.js, merge com pdf-lib e ZIP com JSZip.
                </span>
              </li>
            </ol>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <Table className="size-3.5" aria-hidden />
              <span>SheetJS lê a primeira folha; linhas vazias são ignoradas.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="mt-20" aria-labelledby="sobre-benefits-heading">
        <h2 id="sobre-benefits-heading" className="text-2xl font-bold tracking-tight text-slate-900">
          Benefícios do sistema
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Pensado para quem precisa de velocidade, previsibilidade e rastreio sem montar backend.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <article
                key={b.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                    <Icon className="size-4" aria-hidden />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">{b.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{b.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Desafios + privacidade */}
      <section className="mt-20 space-y-6" aria-labelledby="sobre-challenges-privacy-heading">
        <h2
          id="sobre-challenges-privacy-heading"
          className="text-2xl font-bold tracking-tight text-slate-900"
        >
          Desafios técnicos e privacidade
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-slate-900">
            <Boxes className="size-5 shrink-0 text-slate-700" aria-hidden />
            <h3 className="text-lg font-semibold">Desafios técnicos solucionados</h3>
          </div>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
            <li>
              <strong className="text-slate-900">Camadas</strong> — UI, serviços e template de documento desacoplados para manutenção e testes mentais simples.
            </li>
            <li>
              <strong className="text-slate-900">PDF a partir de HTML</strong> — montagem off-screen com DOM estável (incluindo cuidados com sincronização de render).
            </li>
            <li>
              <strong className="text-slate-900">html2canvas / Tailwind v4</strong> — compatibilidade de cor e estilo (incluindo uso de hex no body onde o rasterizador limita oklch).
            </li>
            <li>
              <strong className="text-slate-900">pdf-lib</strong> — fusão de blobs gerados independentemente num consolidado multi-página.
            </li>
            <li>
              <strong className="text-slate-900">Browser APIs</strong> — FileReader, ArrayBuffer, Blob, URL.createObjectURL e download programático.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-sky-200/90 bg-sky-50/90 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sky-950">
            <ShieldCheck className="size-5 shrink-0" aria-hidden />
            <h3 className="text-lg font-semibold">Processamento local e privacidade</h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-sky-950/85">
            Não há backend nem base de dados nesta aplicação: o parse do Excel, a geração de PDFs e o empacotamento ZIP ocorrem no seu browser. Em uso normal de uma app estática,{" "}
            <strong className="font-semibold text-sky-950">os dados não saem do dispositivo</strong> — relevante para folhas com nomes, quantidades e equipamentos sensíveis.
          </p>
          <div className="mt-5 flex items-start gap-2 rounded-lg border border-sky-200/80 bg-white/80 p-3 text-xs text-sky-900">
            <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            <span>
              Ficheiros muito grandes podem consumir memória do browser; em hardware limitado, gerações em massa podem demorar — trade-off típico de processamento 100% cliente.
            </span>
          </div>
        </div>
        </div>
      </section>

      {/* Skills / fechamento */}
      <section className="mt-20 rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
        <Palette className="mx-auto size-8 text-slate-400" aria-hidden />
        <h2 className="mt-4 text-xl font-bold text-slate-900">Habilidades em evidência</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
          TypeScript em modelos de domínio, validação e agrupamento de dados, integração de bibliotecas de PDF/ZIP, UX com estados de carregamento e feedback — padrões de React moderno (hooks, composição, APIs imperativas onde faz sentido).
        </p>
        <NavLink
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          Experimentar o fluxo completo
          <ArrowRight className="size-4" aria-hidden />
        </NavLink>
      </section>
    </div>
  );
}
