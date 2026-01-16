// Auto-generated from config.json - do not edit manually
// Version: 1.1.0

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  brightGreen: '\x1b[92m',
  brightBlue: '\x1b[94m',
  brightWhite: '\x1b[97m',
};

const pad = (str, width) => {
  const visibleLength = str.replace(/\x1b\[[0-9;]*m/g, '').length;
  return str + ' '.repeat(Math.max(0, width - visibleLength));
};

const W = 68;
const top = `${c.gray}╭${'─'.repeat(W)}╮${c.reset}`;
const bot = `${c.gray}╰${'─'.repeat(W)}╯${c.reset}`;
const sep = `${c.gray}├${'─'.repeat(W)}┤${c.reset}`;
const line = (content) => `${c.gray}│${c.reset}${pad(content, W)}${c.gray}│${c.reset}`;
const empty = line('');

const BANNER = `
${top}
${empty}
${line(`   \x1b[38;5;51m${c.bold}██████╗   ██████╗ ████████╗███████╗██╗██╗     ███████╗███████╗${c.reset}   `)}
${line(`   \x1b[38;5;50m${c.bold}██╔══██╗ ██╔═══██╗╚══██╔══╝██╔════╝██║██║     ██╔════╝██╔════╝${c.reset}   `)}
${line(`   \x1b[38;5;44m██║  ██║ ██║   ██║   ██║   █████╗  ██║██║     █████╗  ███████╗${c.reset}   `)}
${line(`   \x1b[38;5;38m██║  ██║ ██║   ██║   ██║   ██╔══╝  ██║██║     ██╔══╝  ╚════██║${c.reset}   `)}
${line(`   \x1b[38;5;32m██████╔╝ ╚██████╔╝   ██║   ██║     ██║███████╗███████╗███████║${c.reset}   `)}
${line(`   \x1b[38;5;26m╚═════╝   ╚═════╝    ╚═╝   ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝${c.reset}   `)}
${empty}
${line(`                      ${c.dim}~(iam) dotfiles  v1.1.0${c.reset}                       `)}
${empty}
${sep}
${empty}
${line(`   ${c.brightWhite}${c.bold}Your shell, but faster.${c.reset}                                       `)}
${empty}
${line(`   ${c.white}A complete shell environment that installs in one command.${c.reset}     `)}
${line(`   ${c.white}Stop wasting time configuring zsh from scratch.${c.reset}                `)}
${empty}
${sep}
${line(`  ${c.yellow}${c.bold}INSTALL${c.reset}                                                         `)}
${sep}
${empty}
${line(`   ${c.brightGreen}source <(curl -sL dotfiles.download/install)${c.reset}                    `)}
${empty}
${sep}
${line(`  ${c.blue}${c.bold}PERFORMANCE${c.reset}                                                      `)}
${sep}
${empty}
${line(`   ${c.brightWhite}~(iam)${c.reset}      ${c.green}███████${c.reset}                                ${c.brightGreen}~150ms${c.reset}    `)}
${line(`   ${c.dim}Prezto${c.reset}      ${c.yellow}██████████████████████${c.reset}                 ${c.dim}~500ms${c.reset}    `)}
${line(`   ${c.dim}Oh-My-Zsh${c.reset}   ${c.red}████████████████████████████████████${c.reset}   ${c.dim}~800ms${c.reset}    `)}
${empty}
${sep}
${line(`  ${c.magenta}${c.bold}STACK${c.reset}                                                           `)}
${sep}
${empty}
${line(`   ${c.cyan}Chezmoi${c.reset}     Sync dotfiles across machines                     `)}
${line(`   ${c.cyan}Starship${c.reset}    Smart, minimal prompt                             `)}
${line(`   ${c.cyan}fzf${c.reset}         Fuzzy finder for everything                       `)}
${line(`   ${c.cyan}zoxide${c.reset}      Smart cd that learns your habits                  `)}
${line(`   ${c.dim}...and Sheldon, ASDF, eza, bat, ripgrep, fd${c.reset}                  `)}
${empty}
${sep}
${empty}
${line(`   ${c.dim}GitHub:${c.reset}  ${c.brightBlue}https://github.com/Jacke/iam${c.reset}                        `)}
${line(`   ${c.dim}Web:${c.reset}     ${c.brightBlue}https://dotfiles.download${c.reset}                           `)}
${empty}
${bot}

`;

const RAW_GITHUB = "https://raw.githubusercontent.com/Jacke/dotfiles.download/gh-pages";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const ua = (request.headers.get("user-agent") || "").toLowerCase();
    const isCurl = ua.includes("curl") || ua.includes("wget") || ua.includes("httpie");

    if (isCurl && url.pathname === "/") {
      return new Response(BANNER, {
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }

    if (isCurl && (url.pathname === "/install" || url.pathname === "/scripts/install")) {
      let script = await fetch(`${RAW_GITHUB}/scripts/install`);
      if (script.status === 404) {
        script = await fetch(`${RAW_GITHUB}/install`);
      }
      return new Response(script.body, {
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }

    let path = url.pathname;
    if (path === "/" || path === "") path = "/index.html";

    const response = await fetch(`${RAW_GITHUB}${path}`, { redirect: "follow" });

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
