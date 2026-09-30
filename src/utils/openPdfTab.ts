/**
 * Abre o PDF em uma nova aba do navegador.
 *
 * `window.open` precisa ser chamado de forma **síncrona**, dentro do clique: se
 * vier depois de um `await` a "user activation" do navegador já expirou e o
 * Chrome bloqueia como popup. Por isso abrimos uma aba em branco imediatamente,
 * mostramos um aviso nela e só então apontamos para o Blob quando ele existe.
 *
 * Atenção: a geração acontece na aba de origem, que fica em segundo plano durante
 * todo o processo. Nada no caminho pode depender de `requestAnimationFrame` sob
 * pena de travar até o usuário voltar para cá (ver `waitNextFrame` em pdf.service).
 */
export async function openPdfInNewTab(generate: () => Promise<Blob>): Promise<void> {
  const tab = window.open("about:blank", "_blank");
  if (!tab) {
    throw new Error(
      "O navegador bloqueou a nova aba. Libere os pop-ups deste site e tente de novo.",
    );
  }

  try {
    const doc = tab.document;
    doc.title = "Gerando o PDF…";
    if (doc.body) {
      doc.body.style.cssText =
        "margin:0;min-height:100vh;display:grid;place-items:center;background:#f8fafc;color:#475569;font:15px/1.5 system-ui,-apple-system,'Segoe UI',sans-serif";
      const style = doc.createElement("style");
      style.textContent =
        "@keyframes g-spin{to{transform:rotate(360deg)}}" +
        ".g-dot{width:28px;height:28px;margin:0 auto 16px;border:3px solid #cbd5e1;" +
        "border-top-color:#0f172a;border-radius:999px;animation:g-spin .8s linear infinite}";
      const box = doc.createElement("div");
      box.style.cssText = "text-align:center";
      const dot = doc.createElement("div");
      dot.className = "g-dot";
      const title = doc.createElement("p");
      title.style.cssText = "margin:0;font-weight:600";
      title.textContent = "Gerando o PDF…";
      const hint = doc.createElement("p");
      hint.style.cssText = "margin:6px 0 0;font-size:13px;color:#94a3b8";
      hint.textContent = "O documento abre aqui em instantes.";
      box.append(dot, title, hint);
      doc.head.append(style);
      doc.body.append(box);
    }
  } catch {
    /* alguns navegadores bloqueiam a escrita; seguimos só com a navegação */
  }

  let url: string | null = null;
  try {
    url = URL.createObjectURL(await generate());
    tab.location.href = url;
  } catch (error) {
    tab.close();
    throw error;
  }

  window.setTimeout(() => {
    if (url) URL.revokeObjectURL(url);
  }, 60_000);
}
