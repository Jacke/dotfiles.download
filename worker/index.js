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

// GitHub raw content (bypasses CNAME redirect)
const RAW_GITHUB = "https://raw.githubusercontent.com/Jacke/dotfiles.download/gh-pages";

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
    if (isCurl && (url.pathname === "/install" || url.pathname === "/scripts/install")) {
      // Try new path first, fallback to old
      let script = await fetch(`${RAW_GITHUB}/scripts/install`);
      if (script.status === 404) {
        script = await fetch(`${RAW_GITHUB}/install`);
      }
      return new Response(script.body, {
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }

    // Браузер → вернуть HTML
    let path = url.pathname;
    if (path === "/" || path === "") path = "/index.html";

    const response = await fetch(`${RAW_GITHUB}${path}`, {
      redirect: "follow"
    });

    // Определяем content-type по расширению
    const ext = path.split('.').pop();
    const contentTypes = {
      html: "text/html; charset=utf-8",
      css: "text/css; charset=utf-8",
      js: "application/javascript; charset=utf-8",
      png: "image/png",
      jpg: "image/jpeg",
      svg: "image/svg+xml",
    };

    return new Response(response.body, {
      status: response.status,
      headers: {
        "content-type": contentTypes[ext] || "text/plain",
        "cache-control": "public, max-age=3600"
      }
    });
  }
};
