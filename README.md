# NovaTech Solutions

Demo project for the **Advanced Claude Code** course on Pluralsight.

NovaTech Solutions is a fictional tech consultancy website built with plain HTML, CSS, and JavaScript — no frameworks. It serves as a hands-on environment for exploring advanced Claude Code features including MCP (Model Context Protocol) server integration, subagents, Git worktrees, hooks, and agent skills.

---

## Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed
- Node.js 18+
- Git
- GitHub account (for MCP integration)

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/nyisztor/novatech-demo.git
cd novatech-demo
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

Then open your browser to: `http://localhost:3000/pages/index.html`

### 3. Launch Claude Code

In a separate terminal:

```bash
claude
```

---

## Project Structure

```
novatech-demo/
├── src/
│   ├── pages/                  # HTML pages
│   │   ├── index.html          # Homepage
│   │   ├── services.html       # Services
│   │   ├── portfolio.html      # Portfolio with category filters
│   │   ├── team.html           # Team
│   │   └── contact.html        # Contact form
│   ├── css/
│   │   ├── variables.css       # Design tokens and dark mode theme
│   │   ├── base.css            # Reset and global styles
│   │   ├── components.css      # Shared component styles
│   │   └── pages/              # Per-page stylesheets
│   │       ├── home.css
│   │       ├── services.css
│   │       ├── portfolio.css
│   │       ├── team.css
│   │       └── contact.css
│   └── js/
│       ├── theme.js            # Dark mode toggle and persistence
│       ├── navigation.js       # Mobile navigation
│       ├── portfolio-filters.js # Portfolio category filtering
│       ├── contact-form.js     # Contact form submission
│       └── validation.js       # Reusable form validation utilities
├── tests/
│   ├── e2e/                    # Playwright end-to-end tests
│   │   ├── navigation.spec.js
│   │   └── contact-form.spec.js
│   └── unit/                   # Node.js unit tests
│       └── validation.test.js
├── docs/
│   ├── api-spec.md             # API documentation
│   └── figma-spec.md           # Design specifications
├── scripts/
│   └── setup-worktrees.sh      # Git worktree setup for course module
├── .claude/
│   ├── agents/                 # Subagent definitions
│   ├── skills/                 # Custom agent skills
│   ├── enterprise-templates/   # Enterprise configuration templates
│   ├── rules/                  # Rule files for Claude
│   └── settings.json           # Hooks configuration
├── .mcp.json                   # MCP server configuration
├── CLAUDE.md                   # Project context for Claude Code
└── package.json
```

---

## Available Scripts

Run all commands from the project root:

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server on port 3000 |
| `npm run lint` | Lint JavaScript files with ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format all source files with Prettier |
| `npm run format:check` | Check formatting without writing changes |
| `npm run test` | Run all tests (unit + E2E) |
| `npm run test:unit` | Run unit tests with Node.js test runner |
| `npm run test:e2e` | Run Playwright E2E tests (headless) |
| `npm run test:e2e:ui` | Run Playwright E2E tests with interactive UI |

---

## Tech Stack

- **HTML5** — Semantic markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- **CSS3** — Custom properties (design tokens), BEM naming, mobile-first responsive design
- **JavaScript** — Vanilla ES6+ modules with JSDoc comments, no frameworks
- **Playwright** — End-to-end testing
- **Node.js test runner** — Unit testing (built-in, no extra dependency)
- **ESLint + Prettier** — Linting and formatting

---

## Dark Mode

The site supports light and dark themes driven by CSS custom properties and a small JavaScript module.

**How it works:**

1. On page load, `src/js/theme.js` checks `localStorage` for a saved preference (`nt-theme`). If none is found, it falls back to the operating system preference via `prefers-color-scheme`.
2. The resolved theme is applied by setting `data-theme="light"` or `data-theme="dark"` on the `<html>` element.
3. `src/css/variables.css` defines semantic color tokens (such as `--bg-body`, `--bg-surface`, `--text-body`) in `:root` for the light theme and overrides them inside `[data-theme="dark"]`.
4. When the user clicks the `#theme-toggle` button, the new preference is saved to `localStorage` and the attribute is updated immediately.

**Adding the toggle button to a page:**

```html
<button id="theme-toggle" type="button">☾ Dark</button>
```

Include the script on any page that needs theme support:

```html
<script src="../js/theme.js" type="module"></script>
```

**Using the theme tokens in CSS:**

```css
.my-component {
  background-color: var(--bg-surface);
  color: var(--text-body);
  border: 1px solid var(--border-color);
}
```

Available semantic tokens:

| Token | Light value | Dark value |
|---|---|---|
| `--bg-body` | `--color-secondary-50` | `--color-secondary-900` |
| `--bg-surface` | `#ffffff` | `--color-secondary-800` |
| `--text-body` | `--color-secondary-800` | `--color-secondary-200` |
| `--text-heading` | `--color-secondary-900` | `--color-secondary-50` |
| `--border-color` | `--color-secondary-200` | `--color-secondary-700` |

---

## Code Conventions

### HTML

- Use semantic elements for structure and accessibility.
- Include ARIA labels and `aria-expanded` attributes on interactive controls.
- Keep individual pages under 200 lines.

### CSS

- Follow BEM (Block Element Modifier) naming: `.block__element--modifier`.
- Use CSS custom properties from `variables.css` rather than hard-coded values.
- Write styles mobile-first; use `min-width` media queries for larger breakpoints.

### JavaScript

- Use ES6 modules with named exports.
- Document all public functions with JSDoc comments.
- Avoid global variables; keep module state local.

Example module pattern used throughout the project:

```js
/**
 * Initialize a feature
 */
export function initFeature() {
  // implementation
}

// Auto-initialize when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeature);
} else {
  initFeature();
}
```

---

## Testing

Run the full test suite before committing:

```bash
npm run test
```

Run only unit tests:

```bash
npm run test:unit
```

Run only E2E tests:

```bash
npm run test:e2e
```

Open the Playwright interactive UI for debugging E2E tests:

```bash
npm run test:e2e:ui
```

Unit tests live in `tests/unit/` and use the Node.js built-in test runner — no additional test framework is required. E2E tests live in `tests/e2e/` and require Playwright, which is installed as a dev dependency.

---

## Setting Up API Tokens

To use the GitHub and Figma MCP servers, configure API tokens as environment variables. This keeps credentials out of version control.

### GitHub Token

1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Give it a name such as `Claude Code MCP`
4. Select scopes: `repo` and `read:org`
5. Copy the generated token

Set the environment variable:

**macOS / Linux:**
```bash
echo 'export GITHUB_TOKEN=your_token_here' >> ~/.zshrc   # macOS (zsh)
echo 'export GITHUB_TOKEN=your_token_here' >> ~/.bashrc  # Linux (bash)
source ~/.zshrc   # or source ~/.bashrc
```

**Windows (PowerShell / Command Prompt):**
```cmd
setx GITHUB_TOKEN "your_token_here"
```
Restart your terminal after running `setx`.

### Figma Token (Optional)

Required only for the Remote MCP Server integration. The Desktop MCP uses OAuth and does not need a token.

1. Go to [https://www.figma.com/settings](https://www.figma.com/settings)
2. Scroll to **Personal access tokens** and click **Generate new token**
3. Copy the token

Set the environment variable using the same approach as above, replacing the variable name with `FIGMA_ACCESS_TOKEN`.

Verify both tokens are set:

```bash
echo $GITHUB_TOKEN
echo $FIGMA_ACCESS_TOKEN
```

---

## Figma Design File (Optional)

A Figma design file is available for the MCP integration modules:

[NovaTech Solutions — Figma](https://www.figma.com/design/UZ2t3sc5vi2cn9MXHkOfLY/NovaTech-Solutions?node-id=1-2&p=f)

Click the link (a free Figma account is required). You can inspect the file, use it with the Figma MCP server, or duplicate it to your Drafts for an editable copy. This step is optional — you can follow the course without opening the file.

---

## Viewing Hidden Files

This project uses a `.claude/` folder for Claude Code configurations. This folder is hidden by default on most operating systems.

| OS | How to show hidden files |
|----|--------------------------|
| macOS | In Finder: `Cmd + Shift + .` |
| Windows | File Explorer: View → Show → Hidden items |
| Linux | File manager: `Ctrl + H` or View → Show Hidden Files |
| VS Code | Hidden files are visible by default |
| Terminal (all) | Use `ls -la` |

---

## Course Modules

| Module | Feature | Key Files |
|--------|---------|-----------|
| 1 | MCP Server Integration | `.mcp.json` |
| 2 | Subagents | `.claude/agents/` |
| 3 | Git Worktrees | `scripts/setup-worktrees.sh` |
| 4 | Enterprise Features | `.claude/enterprise-templates/` |
| 5 | Agent Skills | `.claude/skills/` |
| 6 | Hooks | `.claude/settings.json` |

### Pre-configured Branches

| Branch | Purpose |
|--------|---------|
| `feature/services-redesign` | Services page layout updates |
| `feature/contact-form` | Form validation improvements |
| `bugfix/responsive-nav` | Mobile navigation fixes |

### Open Pull Requests

Two PRs are available for the MCP and GitHub integration demos:

- **PR #1** — Add client testimonials section
- **PR #2** — Update team page with new hires

---

## License

Educational project for Pluralsight. All rights reserved.
