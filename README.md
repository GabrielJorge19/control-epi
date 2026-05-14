# Control EPI

Aplicação web **frontend-only** para geração em massa de **comprovantes de entrega de EPI e uniformes** a partir de planilhas Excel. Todo o processamento ocorre no navegador: não há backend, banco de dados nem chamadas a APIs externas.

---

## Finalidade e problema de negócio

Empresas que entregam EPI e uniformes precisam, com frequência, de um **documento formal por colaborador** (assinatura, rastreio, conformidade com NR). Hoje isso costuma envolver:

- copiar dados da planilha para um modelo Word/PDF, **um a um**;
- risco de erro humano e inconsistência de layout;
- tempo alto quando há dezenas ou centenas de entregas.

O **Control EPI** automatiza o fluxo: **uma planilha** com todas as linhas de entrega → o sistema **agrupa por colaborador**, **valida** colunas obrigatórias e **gera documentos** prontos para impressão ou arquivo digital.

---

## Funcionalidades

| Área | Descrição |
|------|------------|
| **Upload** | Arrastar e soltar ou selecionar ficheiro `.xlsx` / `.xls`; indicação do nome do ficheiro carregado. |
| **Demonstração** | Link discreto “Usar dados de demonstração” na zona de upload para carregar exemplos sem Excel (útil para demos e testes). |
| **Pré-visualização** | Lista de colaboradores com cargo e quantidade de itens; modal de visualização do comprovante com **zoom** (encaixar altura/largura, +/-). |
| **PDF individual** | Por colaborador: abrir PDF numa nova aba ou descarregar ficheiro com nome sanitizado (`NOME_COLABORADOR.pdf`). |
| **ZIP em lote** | Gera um PDF por pessoa e empacota tudo num **`.zip`** para descarga única (com cache da última geração para voltar a descarregar sem regerar). |
| **PDF consolidado** | Gera todos os comprovantes e **une num único PDF** (várias páginas) com `pdf-lib`, único para arquivo ou impressão em sequência. |
| **Feedback** | Estados de carregamento, toasts (sucesso, erro, informação), lista de erros e avisos após o parse da planilha. |

---

## Ganho de produtividade

- **Redução de trabalho manual**: de *N* operações de copiar/colar ou preencher modelo → *1* upload + *1* clique para ZIP ou PDF consolidado (mais PDFs individuais quando necessário).
- **Consistência**: o mesmo template oficial para todos os colaboradores; agrupamento automático por nome.
- **Rastreio**: ficheiros nomeados por colaborador; ZIP e consolidado com nomes previsíveis.
- **Sem dependência de TI para infra**: abre no browser, não precisa de servidor nem licenças de integração.

O ganho escala com o volume: quanto mais linhas e colaboradores na planilha, maior o tempo poupado face ao fluxo manual.

---

## Stack técnica

| Camada | Tecnologia |
|--------|------------|
| **UI** | React 19, TypeScript |
| **Build** | Vite 8 |
| **Estilos** | Tailwind CSS 4 (`@tailwindcss/vite`) |
| **Ícones** | Lucide React |
| **Excel** | SheetJS (`xlsx`) — leitura e parsing no cliente |
| **PDF** | `html2pdf.js` (html2canvas + jsPDF) — rasterização do HTML do comprovante |
| **Manipulação de PDF** | `pdf-lib` — fusão de vários PDFs num documento único |
| **Arquivos ZIP** | `JSZip` — pacote com todos os PDFs individuais |
| **Qualidade** | ESLint 10, TypeScript ESLint, React Compiler-friendly hooks |

---

## Arquitetura do código (`src/`)

Organização pensada para **crescimento** e **separação de responsabilidades**:

```
src/
├── App.tsx                 # Raiz: providers + layout
├── pages/                  # Ecrã principal (fluxo Excel → lista → PDFs)
├── components/             # UI reutilizável (upload, cards, preview, toast, PDF ref)
├── services/               # excel.service (parse/agrupamento), pdf.service (blob/zip/merge)
├── templates/              # Layout do documento oficial (HTML para PDF)
├── hooks/                  # useToast
├── context/                # ToastContext
├── types/                  # Tipagens fortes (EmployeeDocument, UniformItem, etc.)
├── utils/                  # renderPdfDom, nomes de ficheiro, strings, ids
├── data/                   # Dados mock para demonstração
├── styles/                 # Animações globais complementares
└── ui/                     # Layout shell + header
```

---

## Habilidades em evidência (para recrutadores / revisão técnica)

- **TypeScript end-to-end**: modelos de domínio (`EmployeeDocument`, `UniformItem`, resultados de parse) sem `any` desnecessário.
- **Arquitetura em camadas**: UI ≠ serviços ≠ template de documento; fácil trocar template ou motor de PDF sem espalhar lógica.
- **Processamento de dados**: normalização de cabeçalhos, validação de colunas obrigatórias, ignorar linhas vazias, agrupamento por colaborador com avisos de inconsistência (ex.: cargo duplicado).
- **Integração de bibliotecas nativas do browser**: `FileReader` / `ArrayBuffer`, `Blob`, `URL.createObjectURL`, download programático.
- **PDF no cliente**: montagem off-screen com `flushSync` para DOM estável; cuidados com **Tailwind v4 / `oklch`** e limitações do **html2canvas** (cores globais em hex no `body`, template com estilos compatíveis).
- **Composição de PDFs**: `pdf-lib` para merge de blobs gerados independentemente.
- **UX**: loading states, toasts, ações em lote, dados de demo.
- **React moderno**: hooks (`useCallback`, `useMemo`, `useRef`), `forwardRef` + `useImperativeHandle` onde faz sentido expor API imperativa ao pai.

---

## Pré-requisitos

- **Node.js** 20+ (recomendado; compatível com Vite 8)
- **npm** (ou `pnpm` / `yarn`, ajustando os comandos)

---

## Instalação e scripts

```bash
# Clonar e entrar na pasta do projeto
cd control-epi

# Instalar dependências
npm install

# Servidor de desenvolvimento (hot reload)
npm run dev

# Build de produção (TypeScript + bundle Vite)
npm run build

# Pré-visualizar o build localmente
npm run preview

# Lint
npm run lint
```

Abrir no browser o URL indicado pelo Vite (geralmente `http://localhost:5173`).

---

## Como usar (fluxo típico)

1. **Preparar a planilha** Excel (`.xlsx` ou `.xls`) com a **primeira linha** como cabeçalho e as colunas abaixo (nomes podem variar em maiúsculas/minúsculas; acentos no cabeçalho são tolerados na normalização):

   | Coluna | Conteúdo |
   |--------|----------|
   | `nome` | Nome do colaborador |
   | `cargo` | Função |
   | `admissao` | Data ou texto de admissão (opcional na prática) |
   | `data` | Data da entrega do item |
   | `quantidade` | Quantidade numérica |
   | `equipamento` | Descrição do item |
   | `tamanho` | Tamanho ou “—” |
   | `ca` | CA do equipamento, se aplicável |

2. **Arrastar** o ficheiro para a zona de upload ou **clicar** para selecionar.

3. **Rever** o resumo: número de colaboradores, documentos, avisos/erros.

4. **Por colaborador**: Visualizar PDF em outra aba ou Baixar PDF individual.

5. **Em lote**:
   - **Baixar ZIP** — gera todos os PDFs e descarrega um `.zip` com um PDF por ficheiro.
   - **Baixar PDF consolidado** — um único PDF com todas as páginas na ordem dos colaboradores.

**Demonstração rápida**: na zona de upload, usar **“Usar dados de demonstração”** para preencher a lista sem ficheiro Excel.

---

## Contrato do ficheiro Excel

- Lê-se a **primeira folha** do livro.
- Linhas **completamente vazias** são ignoradas.
- Linhas sem `nome` ou sem `equipamento` relevante podem ser ignoradas ou gerar aviso, conforme a regra implementada em `excel.service.ts`.
- Vários itens com o **mesmo nome** de colaborador são **agrupados** num único documento.

---

## Saídas geradas

- **PDF individual**: nome baseado no colaborador.
- **ZIP**: nome padrão `comprovantes_epi.zip` (ou conforme implementação atual em `pdf.service.ts` / chamadas).
- **PDF consolidado**: nome padrão `comprovantes_epi_consolidado.pdf`.

---

## Notas técnicas

- **Apenas frontend**: ficheiros grandes podem consumir memória do browser; dispositivos muito limitados podem sentir o tempo de geração de muitos PDFs seguidos.
- **Privacidade**: os dados não saem do computador do utilizador durante o uso normal da app estática.

---

## Licença e autor

Projeto privado (`"private": true` no `package.json`). Ajustar esta secção se for publicado com licença explícita.

---

*README pensado para claridade técnica, onboarding de devs e leitura por recrutadores ou avaliadores de portfólio.*
