#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '../src/_data/config.json');
const SITE_PATH = path.join(__dirname, '../src/_data/site.json');
const WORKER_PATH = path.join(__dirname, '../worker/index.js');
const CHANGELOG_PATH = path.join(__dirname, '../src/_data/changelog.json');

// GitHub API for iam repo
const IAM_REPO = 'Jacke/iam';
const IAM_RAW = `https://raw.githubusercontent.com/${IAM_REPO}/main`;

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.text();
}

async function getVersion() {
  // Try VERSION file first, then package.json
  let version = await fetchText(`${IAM_RAW}/VERSION`);
  if (version) return version.trim();

  const pkg = await fetchJSON(`${IAM_RAW}/package.json`);
  if (pkg?.version) return pkg.version;

  // Try .chezmoidata.toml or similar
  const chezmoi = await fetchText(`${IAM_RAW}/.chezmoidata.toml`);
  if (chezmoi) {
    const match = chezmoi.match(/version\s*=\s*"([^"]+)"/);
    if (match) return match[1];
  }

  return '1.0.0'; // fallback
}

async function getChangelog() {
  // Fetch CHANGELOG.md from iam repo
  const changelog = await fetchText(`${IAM_RAW}/CHANGELOG.md`);
  if (!changelog) return [];

  // Parse changelog into entries
  const entries = [];
  const lines = changelog.split('\n');
  let currentEntry = null;

  for (const line of lines) {
    // Match version headers like "## [1.0.0] - 2024-01-15" or "## 1.0.0"
    const versionMatch = line.match(/^##\s+\[?(\d+\.\d+\.\d+)\]?(?:\s*-\s*(\d{4}-\d{2}-\d{2}))?/);
    if (versionMatch) {
      if (currentEntry) entries.push(currentEntry);
      currentEntry = {
        version: versionMatch[1],
        date: versionMatch[2] || null,
        changes: []
      };
    } else if (currentEntry && line.startsWith('- ')) {
      currentEntry.changes.push(line.slice(2).trim());
    } else if (currentEntry && line.startsWith('* ')) {
      currentEntry.changes.push(line.slice(2).trim());
    }
  }
  if (currentEntry) entries.push(currentEntry);

  return entries.slice(0, 5); // Last 5 versions
}

function generateWorker(config, version) {
  const { site, performance, stack, curl } = config;
  const W = curl.boxWidth;

  // Generate gradient colors for logo
  const gradientColors = curl.gradient;

  const workerCode = `// Auto-generated from config.json - do not edit manually
// Version: ${version}

const c = {
  reset: '\\x1b[0m',
  bold: '\\x1b[1m',
  dim: '\\x1b[2m',
  red: '\\x1b[31m',
  green: '\\x1b[32m',
  yellow: '\\x1b[33m',
  blue: '\\x1b[34m',
  magenta: '\\x1b[35m',
  cyan: '\\x1b[36m',
  white: '\\x1b[37m',
  gray: '\\x1b[90m',
  brightGreen: '\\x1b[92m',
  brightBlue: '\\x1b[94m',
  brightWhite: '\\x1b[97m',
};

const pad = (str, width) => {
  const visibleLength = str.replace(/\\x1b\\[[0-9;]*m/g, '').length;
  return str + ' '.repeat(Math.max(0, width - visibleLength));
};

const W = ${W};
const top = \`\${c.gray}╭\${'─'.repeat(W)}╮\${c.reset}\`;
const bot = \`\${c.gray}╰\${'─'.repeat(W)}╯\${c.reset}\`;
const sep = \`\${c.gray}├\${'─'.repeat(W)}┤\${c.reset}\`;
const line = (content) => \`\${c.gray}│\${c.reset}\${pad(content, W)}\${c.gray}│\${c.reset}\`;
const empty = line('');

const BANNER = \`
\${top}
\${empty}
\${line(\`   \\x1b[38;5;${gradientColors[0]}m\${c.bold}██████╗   ██████╗ ████████╗███████╗██╗██╗     ███████╗███████╗\${c.reset}   \`)}
\${line(\`   \\x1b[38;5;${gradientColors[1]}m\${c.bold}██╔══██╗ ██╔═══██╗╚══██╔══╝██╔════╝██║██║     ██╔════╝██╔════╝\${c.reset}   \`)}
\${line(\`   \\x1b[38;5;${gradientColors[2]}m██║  ██║ ██║   ██║   ██║   █████╗  ██║██║     █████╗  ███████╗\${c.reset}   \`)}
\${line(\`   \\x1b[38;5;${gradientColors[3]}m██║  ██║ ██║   ██║   ██║   ██╔══╝  ██║██║     ██╔══╝  ╚════██║\${c.reset}   \`)}
\${line(\`   \\x1b[38;5;${gradientColors[4]}m██████╔╝ ╚██████╔╝   ██║   ██║     ██║███████╗███████╗███████║\${c.reset}   \`)}
\${line(\`   \\x1b[38;5;${gradientColors[5]}m╚═════╝   ╚═════╝    ╚═╝   ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝\${c.reset}   \`)}
\${empty}
\${line(\`                      \${c.dim}~(iam) dotfiles  v${version}\${c.reset}                       \`)}
\${empty}
\${sep}
\${empty}
\${line(\`   \${c.brightWhite}\${c.bold}${site.tagline}\${c.reset}                                       \`)}
\${empty}
\${line(\`   \${c.white}A complete shell environment that installs in one command.\${c.reset}     \`)}
\${line(\`   \${c.white}Stop wasting time configuring zsh from scratch.\${c.reset}                \`)}
\${empty}
\${sep}
\${line(\`  \${c.yellow}\${c.bold}INSTALL\${c.reset}                                                         \`)}
\${sep}
\${empty}
\${line(\`   \${c.brightGreen}${site.installCommand}\${c.reset}                    \`)}
\${empty}
\${sep}
\${line(\`  \${c.blue}\${c.bold}PERFORMANCE\${c.reset}                                                      \`)}
\${sep}
\${empty}
\${line(\`   \${c.dim}${performance[0].name}\${c.reset}   \${c.red}████████████████████████████████████\${c.reset}   \${c.dim}${performance[0].time}\${c.reset}    \`)}
\${line(\`   \${c.dim}${performance[1].name}\${c.reset}      \${c.yellow}██████████████████████\${c.reset}                 \${c.dim}${performance[1].time}\${c.reset}    \`)}
\${line(\`   \${c.brightWhite}~(iam)\${c.reset}      \${c.green}███████\${c.reset}                                \${c.brightGreen}${performance[2].time}\${c.reset}    \`)}
\${empty}
\${sep}
\${line(\`  \${c.magenta}\${c.bold}STACK\${c.reset}                                                           \`)}
\${sep}
\${empty}
${stack.featured.map(s => `\${line(\`   \${c.cyan}${s.name.padEnd(11)}\${c.reset} ${s.desc.padEnd(W - 16)}   \`)}`).join('\n')}
\${line(\`   \${c.dim}...and ${stack.other.join(', ')}\${c.reset}                    \`)}
\${empty}
\${sep}
\${empty}
\${line(\`   \${c.dim}GitHub:\${c.reset}  \${c.brightBlue}${site.github}\${c.reset}                             \`)}
\${line(\`   \${c.dim}Web:\${c.reset}     \${c.brightBlue}${site.url}\${c.reset}                            \`)}
\${empty}
\${bot}

\`;

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
      let script = await fetch(\`\${RAW_GITHUB}/scripts/install\`);
      if (script.status === 404) {
        script = await fetch(\`\${RAW_GITHUB}/install\`);
      }
      return new Response(script.body, {
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }

    let path = url.pathname;
    if (path === "/" || path === "") path = "/index.html";

    const response = await fetch(\`\${RAW_GITHUB}\${path}\`, { redirect: "follow" });

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
`;

  return workerCode;
}

async function main() {
  console.log('🔄 Fetching changelog...');
  const changelog = await getChangelog();
  console.log(`   Found ${changelog.length} changelog entries`);

  // Get version from changelog (latest) or fallback to VERSION file
  let version;
  if (changelog.length > 0 && changelog[0].version) {
    version = changelog[0].version;
    console.log(`   Version from changelog: ${version}`);
  } else {
    console.log('🔄 Fetching version from iam repo...');
    version = await getVersion();
    console.log(`   Version: ${version}`);
  }

  // Read config
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

  // Update site.json
  const siteData = {
    ...config.site,
    version,
    changelog: changelog.slice(0, 3) // Last 3 for the landing page widget
  };
  fs.writeFileSync(SITE_PATH, JSON.stringify(siteData, null, 2));
  console.log('✅ Updated site.json');

  // Save full changelog
  fs.writeFileSync(CHANGELOG_PATH, JSON.stringify(changelog, null, 2));
  console.log('✅ Updated changelog.json');

  // Generate worker
  const workerCode = generateWorker(config, version);
  fs.writeFileSync(WORKER_PATH, workerCode);
  console.log('✅ Generated worker/index.js');

  console.log('🎉 Build complete!');
}

main().catch(console.error);
