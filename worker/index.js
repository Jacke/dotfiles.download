// ANSI color codes
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  // Colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  // Bright colors
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',
};

// Beautiful TUI banner
const BANNER = `
${c.gray}╭──────────────────────────────────────────────────────────────────╮${c.reset}
${c.gray}│${c.reset}                                                                  ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.brightCyan}${c.bold}██████╗   ██████╗ ████████╗███████╗██╗██╗     ███████╗███████╗${c.reset}   ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.brightCyan}${c.bold}██╔══██╗ ██╔═══██╗╚══██╔══╝██╔════╝██║██║     ██╔════╝██╔════╝${c.reset}   ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.cyan}██║  ██║ ██║   ██║   ██║   █████╗  ██║██║     █████╗  ███████╗${c.reset}   ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.cyan}██║  ██║ ██║   ██║   ██║   ██╔══╝  ██║██║     ██╔══╝  ╚════██║${c.reset}   ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.blue}██████╔╝ ╚██████╔╝   ██║   ██║     ██║███████╗███████╗███████║${c.reset}   ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.blue}╚═════╝   ╚═════╝    ╚═╝   ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝${c.reset}   ${c.gray}│${c.reset}
${c.gray}│${c.reset}                                                                  ${c.gray}│${c.reset}
${c.gray}│${c.reset}                      ${c.dim}~(iam) dotfiles  v1.0${c.reset}                       ${c.gray}│${c.reset}
${c.gray}│${c.reset}                                                                  ${c.gray}│${c.reset}
${c.gray}├──────────────────────────────────────────────────────────────────┤${c.reset}
${c.gray}│${c.reset}                                                                  ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.brightWhite}${c.bold}Your shell, but faster.${c.reset}                                      ${c.gray}│${c.reset}
${c.gray}│${c.reset}                                                                  ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.white}A complete shell environment that installs in one command.${c.reset}    ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.white}Stop wasting time configuring zsh from scratch.${c.reset}               ${c.gray}│${c.reset}
${c.gray}│${c.reset}                                                                  ${c.gray}│${c.reset}
${c.gray}├──────────────────────────────────────────────────────────────────┤${c.reset}
${c.gray}│${c.reset}  ${c.yellow}${c.bold}INSTALL${c.reset}                                                        ${c.gray}│${c.reset}
${c.gray}├──────────────────────────────────────────────────────────────────┤${c.reset}
${c.gray}│${c.reset}                                                                  ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.brightGreen}source <(curl -sL dotfiles.download/install)${c.reset}                   ${c.gray}│${c.reset}
${c.gray}│${c.reset}                                                                  ${c.gray}│${c.reset}
${c.gray}├──────────────────────────────────────────────────────────────────┤${c.reset}
${c.gray}│${c.reset}  ${c.blue}${c.bold}PERFORMANCE${c.reset}                                                     ${c.gray}│${c.reset}
${c.gray}├──────────────────────────────────────────────────────────────────┤${c.reset}
${c.gray}│${c.reset}                                                                  ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.dim}Oh-My-Zsh${c.reset}    ${c.red}████████████████████████████████████${c.reset}  ${c.dim}~800ms${c.reset}   ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.dim}Prezto${c.reset}       ${c.yellow}██████████████████████${c.reset}                ${c.dim}~500ms${c.reset}   ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.brightWhite}~(iam)${c.reset}        ${c.green}███████${c.reset}                               ${c.brightGreen}~150ms${c.reset}   ${c.gray}│${c.reset}
${c.gray}│${c.reset}                                                                  ${c.gray}│${c.reset}
${c.gray}├──────────────────────────────────────────────────────────────────┤${c.reset}
${c.gray}│${c.reset}  ${c.magenta}${c.bold}STACK${c.reset}                                                          ${c.gray}│${c.reset}
${c.gray}├──────────────────────────────────────────────────────────────────┤${c.reset}
${c.gray}│${c.reset}                                                                  ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.cyan}Chezmoi${c.reset}      Sync dotfiles across machines                    ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.cyan}Sheldon${c.reset}      Fast zsh plugin manager (Rust)                   ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.cyan}Starship${c.reset}     Smart, minimal prompt                            ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.cyan}ASDF${c.reset}         One tool for all runtime versions                ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.cyan}fzf${c.reset}          Fuzzy finder for everything                      ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.cyan}eza${c.reset}          Modern ls replacement                            ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.cyan}bat${c.reset}          cat with syntax highlighting                     ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.cyan}ripgrep${c.reset}      Fast grep replacement                            ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.cyan}zoxide${c.reset}       Smart cd that learns your habits                 ${c.gray}│${c.reset}
${c.gray}│${c.reset}                                                                  ${c.gray}│${c.reset}
${c.gray}├──────────────────────────────────────────────────────────────────┤${c.reset}
${c.gray}│${c.reset}                                                                  ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.dim}GitHub:${c.reset}  ${c.brightBlue}https://github.com/Jacke/-${c.reset}                          ${c.gray}│${c.reset}
${c.gray}│${c.reset}   ${c.dim}Web:${c.reset}     ${c.brightBlue}https://dotfiles.download${c.reset}                           ${c.gray}│${c.reset}
${c.gray}│${c.reset}                                                                  ${c.gray}│${c.reset}
${c.gray}╰──────────────────────────────────────────────────────────────────╯${c.reset}

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
        "cache-control": "public, max-age=300"
      }
    });
  }
};
