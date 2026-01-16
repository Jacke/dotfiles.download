// ANSI color codes
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  // Colors
  cyan: '\x1b[36m',
  brightCyan: '\x1b[96m',
  blue: '\x1b[34m',
  brightBlue: '\x1b[94m',
  green: '\x1b[32m',
  brightGreen: '\x1b[92m',
  yellow: '\x1b[33m',
  white: '\x1b[97m',
  gray: '\x1b[90m',
};

// ASCII art banner для curl с цветами
const BANNER = `
${c.brightCyan}${c.bold}
    ██████╗  ██████╗ ████████╗███████╗██╗██╗     ███████╗███████╗
    ██╔══██╗██╔═══██╗╚══██╔══╝██╔════╝██║██║     ██╔════╝██╔════╝
    ██║  ██║██║   ██║   ██║   █████╗  ██║██║     █████╗  ███████╗
    ██║  ██║██║   ██║   ██║   ██╔══╝  ██║██║     ██╔══╝  ╚════██║
    ██████╔╝╚██████╔╝   ██║   ██║     ██║███████╗███████╗███████║
    ╚═════╝  ╚═════╝    ╚═╝   ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝
${c.reset}
${c.gray}                        ~ ( i a m )  v1.0${c.reset}

${c.white}${c.bold}    Minimal. Fast. Opinionated.${c.reset}
${c.gray}    Shell startup: ${c.brightGreen}~150ms${c.gray} (vs ~800ms Oh-My-Zsh)${c.reset}

${c.yellow}${c.bold}    INSTALL${c.reset}
${c.gray}    ───────${c.reset}
${c.brightGreen}    source <(curl -sL dotfiles.download/install)${c.reset}

${c.blue}${c.bold}    STACK${c.reset}
${c.gray}    ─────${c.reset}
${c.cyan}    Chezmoi · Sheldon · Starship · ASDF
    fzf · ripgrep · eza · bat · zoxide${c.reset}

${c.gray}    GitHub: ${c.brightBlue}https://github.com/Jacke/-${c.reset}

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
