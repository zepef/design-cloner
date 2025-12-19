# Design Cloner

A powerful system for extracting design guides from websites and applying them to repositories. Uses Claude AI to analyze websites, extract design tokens, and generate comprehensive design systems that can be reused across projects.

## Features

- **Design Extraction**: Analyze any website and extract its design system
- **Markdown Design Guides**: Store design systems as portable `.md` files
- **Design Application**: Apply design guides to restyle any repository
- **Branch Isolation**: Restyled versions are stored in clearly identified branches
- **Claude Integration**: Extensive slash commands for Claude Code

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Claude Slash Commands

This project includes Claude Code slash commands for design operations:

### `/design-extract <url>`

Extract a design guide from any website:

```bash
/design-extract https://linear.app
/design-extract https://vercel.com ./design-guides/vercel-style.md
```

### `/design-apply <design-guide-path>`

Apply a design guide to the current repository:

```bash
/design-apply ./design-guides/linear-ai-style.md
/design-apply ./design-guides/openai-style.md restyle/openai-theme
```

### `/design-preview <design-guide-path>`

Preview a design guide without making changes:

```bash
/design-preview ./design-guides/linear-ai-style.md
```

### `/design-restyle <file-path>`

Restyle a specific component or file:

```bash
/design-restyle ./components/Header.tsx
/design-restyle ./app/page.tsx ./design-guides/openai-style.md
```

## Project Structure

```
design-cloner/
├── .claude/
│   └── commands/           # Claude slash commands
│       ├── design-extract.md
│       ├── design-apply.md
│       ├── design-preview.md
│       └── design-restyle.md
├── design-guides/          # Stored design guides
│   ├── linear-ai-style.md
│   └── openai-style.md
├── lib/
│   ├── types/
│   │   └── design-guide.ts # Type definitions
│   ├── extractor/
│   │   └── design-extractor.ts
│   ├── generator/
│   │   └── markdown-generator.ts
│   ├── applier/
│   │   └── design-applier.ts
│   ├── cli/
│   │   └── index.ts
│   └── index.ts
├── app/                    # Next.js app
└── components/             # UI components (generated)
```

## Design Guide Format

Design guides are stored as markdown files with the following structure:

```markdown
# Design Guide Name

## Design Philosophy
- Style and mood
- Design principles

## Color Palette
### Light Mode / Dark Mode
- Primary, secondary, accent colors
- Background, foreground, muted, border

## Typography
- Font families (heading, body, mono)
- Font sizes scale
- Font weights
- Line heights

## Spacing
- Spacing scale
- Container widths

## Border Radius
## Shadows
## Animation

## Component Styles
- Button, Card, Input, Badge patterns

## CSS Variables
## Tailwind Config
## Usage Examples
```

## Workflow

### 1. Extract Design from Website

Use Claude to analyze a website and extract its design system:

```bash
/design-extract https://example.com
```

This creates a comprehensive design guide in `./design-guides/`.

### 2. Preview the Design

Review the extracted design before applying:

```bash
/design-preview ./design-guides/example-style.md
```

### 3. Apply to Repository

Apply the design guide to restyle your project:

```bash
/design-apply ./design-guides/example-style.md
```

This:
- Creates a new branch (e.g., `restyle/example-style-20251219`)
- Updates CSS variables in `globals.css`
- Extends Tailwind configuration
- Generates UI components
- Commits the changes

### 4. Restyle Individual Components

For targeted updates:

```bash
/design-restyle ./components/Button.tsx
```

## Example Design Guides

The project includes example design guides inspired by popular AI websites:

### Linear AI Style
Modern minimal design with dark-first approach, purple accents, and smooth animations.

### OpenAI Style
Clean, research-focused design with green accents, excellent readability, and AI chat patterns.

## Library Usage

```typescript
import {
  extractDesignGuide,
  generateDesignGuideMarkdown,
  generateCSSVariables,
  generateTailwindExtension,
  generateComponentTemplates,
} from './lib';

// Extract design from URL
const guide = await extractDesignGuide({ url: 'https://example.com' });

// Generate markdown
const markdown = generateDesignGuideMarkdown(guide);

// Generate CSS
const css = generateCSSVariables(guide);

// Generate Tailwind config
const tailwindConfig = generateTailwindExtension(guide);

// Generate components
const components = generateComponentTemplates(guide);
```

## Design Tokens

The system extracts and applies these design tokens:

| Category | Tokens |
|----------|--------|
| Colors | primary, secondary, accent, background, foreground, muted, border, success, warning, error |
| Typography | font families, sizes (xs-6xl), weights, line heights, letter spacing |
| Spacing | xs, sm, md, lg, xl, 2xl, 3xl |
| Border Radius | none, sm, md, lg, xl, full |
| Shadows | sm, md, lg, xl, glow, inner |
| Animation | durations (fast, normal, slow), easing functions |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

---

Built with Next.js, Tailwind CSS, and Claude AI.
