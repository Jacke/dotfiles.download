// ASCII art banner для curl
const BANNER = `
  ~(iam) Dotfiles
  ═══════════════════════════════════════

  Minimal. Fast. Opinionated.
  Shell startup: ~150ms (vs ~800ms Oh-My-Zsh)

  INSTALL
  ───────
  source <(curl -sL dotfiles.download/install)

  STACK
  ─────
  Chezmoi · Sheldon · Starship · ASDF
  fzf · ripgrep · eza · bat · zoxide

  GitHub: https://github.com/Jacke/-

`;

// GitHub Pages origin
const ORIGIN = "https://jacke.github.io/dotfiles.download";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const ua = (request.headers.get("user-agent") || "").toLowerCase();
    const isCurl = ua.includes("curl") || ua.includes("wget") || ua.includes("httpie");

    // curl на корень → показать баннер
    if (isCurl && url.pathname === "/") {
      return new Response(BANNER, {
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }

    // curl на /install → вернуть скрипт
    if (url.pathname === "/install" || url.pathname === "/scripts/install") {
      const script = await fetch(`${ORIGIN}/scripts/install`);
      return new Response(script.body, {
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }

    // Всё остальное → проксируем на GitHub Pages
    const originUrl = new URL(url.pathname + url.search, ORIGIN);
    const response = await fetch(originUrl, {
      headers: request.headers,
      method: request.method,
    });

    return response;
  }
};
