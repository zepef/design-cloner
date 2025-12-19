# Building an AI-Powered Design System Cloner: From Website to Code in Minutes

*How I built a tool that extracts complete design systems from any website and applies them to new projects using Claude AI*

---

## The Inspiration

This project was born after reading Alpha Design Global's excellent article ["10 Best Modern AI Website Designs to Clone"](https://medium.com/@alphadesignglobal/10-best-modern-ai-website-designs-to-clone-c395db287fd6). The article showcases stunning AI website designs from companies like Linear, Vercel, and OpenAI—and it sparked a question: *What if I could automate the process of extracting and applying these design systems?*

Using [Claude Code](https://claude.ai/code), I built Design Cloner in a single session—an AI-powered tool that does exactly that.

---

## The Problem: Design System Friction

Every developer knows the pain. You're starting a new project, you've found the perfect design inspiration—maybe it's Linear's sleek dark interface, Vercel's clean minimalism, or OpenAI's elegant simplicity. But translating that visual inspiration into a usable design system? That's hours of work: inspecting elements, copying hex codes, guessing font scales, and manually crafting CSS variables.

What if AI could do this in minutes?

That's exactly what **Design Cloner** does. It's an AI-powered tool that extracts complete design systems from websites and applies them to your repositories—all through natural language commands.

---

## The Core Concept: Design Guides as Portable Markdown

The key insight behind Design Cloner is treating design systems as **portable, human-readable markdown files**. Instead of complex JSON configs or proprietary formats, design guides are stored as documentation that both humans and AI can understand.

Here's a snippet of what a design guide looks like:

```markdown
# Linear AI Style Design Guide

## Design Philosophy
- **Style**: Modern Minimal
- **Mood**: Professional & Sophisticated
- **Principles**: Dark-first approach, Subtle animations,
  Purple/violet accent palette, Clean typography

## Color Palette

### Light Mode
| Token | Value | Usage |
|-------|-------|-------|
| Primary | #5E6AD2 | Main actions, links |
| Secondary | #8B5CF6 | Supporting elements |
| Background | #FFFFFF | Page background |

### Dark Mode
| Token | Value | Usage |
|-------|-------|-------|
| Primary | #8A8FE5 | Main actions, links |
| Background | #0D0D0D | Page background |
```

This format is powerful because:
1. **Developers can read and modify it** without special tooling
2. **AI can parse and apply it** through structured extraction
3. **Version control is trivial**—it's just a markdown file
4. **Documentation is built-in**—usage examples live alongside tokens

---

## The Architecture: Three Core Systems

Design Cloner operates through three interconnected systems:

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   EXTRACTOR     │────▶│  DESIGN GUIDE    │────▶│    APPLIER      │
│                 │     │   (Markdown)     │     │                 │
│ • Fetch website │     │                  │     │ • Generate CSS  │
│ • Analyze CSS   │     │ • Colors         │     │ • Create theme  │
│ • Extract tokens│     │ • Typography     │     │ • Build comps   │
│ • Identify      │     │ • Spacing        │     │ • Update styles │
│   components    │     │ • Components     │     │ • Git branch    │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

### 1. The Extractor

The extractor is responsible for analyzing websites and pulling out design tokens. Here's the core extraction prompt that powers the AI analysis:

```typescript
// lib/extractor/design-extractor.ts

export function generateExtractionPrompt(url: string): string {
  return `
Analyze the website at ${url} and extract the following design elements:

1. **Color Palette**
   - Primary, secondary, and accent colors
   - Background and foreground colors
   - Any gradient definitions
   - Light and dark mode variations

2. **Typography**
   - Font families used (heading, body, monospace)
   - Font sizes scale
   - Font weights used
   - Line heights and letter spacing

3. **Spacing & Layout**
   - Spacing scale/system
   - Container max widths
   - Grid/layout patterns (bento, masonry, etc.)
   - Section padding

4. **Visual Effects**
   - Border radius values
   - Shadow definitions
   - Glassmorphism or blur effects
   - Gradient overlays

5. **Animation & Transitions**
   - Transition durations
   - Easing functions
   - Hover/focus animations
   - Page transition effects

6. **Component Patterns**
   - Button styles and variants
   - Card/container styles
   - Form input styles
   - Navigation patterns

7. **Design Philosophy**
   - Overall style (minimal, brutalist, organic, etc.)
   - Mood/tone
   - Key design principles

Please provide the extracted information in a structured format
that can be converted to a design guide.
`;
}
```

This prompt is deliberately comprehensive. It doesn't just ask for colors—it asks for the *philosophy* behind the design. Understanding whether a site uses "brutalist" or "organic" styling helps the AI make better decisions when applying the design to new components.

### 2. The Design Guide Format

The type system ensures consistency across all design guides:

```typescript
// lib/types/design-guide.ts

export interface DesignGuide {
  name: string;
  version: string;
  sourceUrl?: string;
  extractedAt: string;
  description: string;

  // The "why" behind the design
  philosophy: {
    style: string;  // "minimalist", "brutalist", "organic", "futuristic"
    mood: string;   // "professional", "playful", "elegant", "bold"
    principles: string[];
  };

  // Core design tokens
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };

  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  animation: Animation;

  // Component patterns
  components: ComponentStyle[];

  // Special effects
  effects?: {
    glassmorphism?: boolean;
    gradientText?: boolean;
    glowEffects?: boolean;
  };

  // AI-specific patterns
  aiElements?: {
    chatInterface?: ComponentStyle;
    loadingStates?: ComponentStyle[];
  };
}
```

Notice the `aiElements` field. This is specifically designed for AI product interfaces—chat bubbles, typing indicators, and loading states that are unique to AI applications.

### 3. The Applier

The applier takes a design guide and generates production-ready code. Here's how it creates CSS variables:

```typescript
// lib/applier/design-applier.ts

export function generateCSSVariables(guide: DesignGuide): string {
  const { colors, typography, spacing, borderRadius, shadows, animation } = guide;

  return `
:root {
  /* Colors - Light Mode */
  --color-primary: ${colors.light.primary};
  --color-secondary: ${colors.light.secondary};
  --color-accent: ${colors.light.accent};
  --color-background: ${colors.light.background};
  --color-foreground: ${colors.light.foreground};
  --color-muted: ${colors.light.muted};
  --color-border: ${colors.light.border};

  /* Typography */
  --font-heading: ${typography.fontFamily.heading};
  --font-body: ${typography.fontFamily.body};
  --font-mono: ${typography.fontFamily.mono};

  /* Animation */
  --duration-fast: ${animation.duration.fast};
  --duration-normal: ${animation.duration.normal};
  --easing-default: ${animation.easing.default};
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: ${colors.dark.primary};
    --color-secondary: ${colors.dark.secondary};
    --color-background: ${colors.dark.background};
    --color-foreground: ${colors.dark.foreground};
  }
}`;
}
```

---

## Claude Slash Commands: The AI Interface

The magic happens through Claude slash commands—markdown files that instruct Claude how to execute design operations. Here's the extraction command:

```markdown
# /design-extract <url> [output-path]

## Instructions for Claude

When this command is invoked:

1. Parse the URL argument from: $ARGUMENTS

2. Use WebFetch to analyze the target website

3. Extract design tokens by analyzing:
   - CSS custom properties and variables
   - Computed styles on key elements
   - Font families and typography scale
   - Color values used throughout
   - Spacing patterns
   - Border radius usage
   - Shadow definitions
   - Animation/transition properties

4. Structure the findings into a DesignGuide object
   following the schema in `lib/types/design-guide.ts`

5. Generate markdown using the pattern in
   `lib/generator/markdown-generator.ts`

6. Write the markdown file to the specified path

7. Report the extraction results including:
   - Number of colors extracted
   - Typography details
   - Number of components identified
   - File location
```

And here's the apply command that transforms repositories:

```markdown
# /design-apply <design-guide-path> [branch-name]

## Instructions for Claude

When this command is invoked:

1. Parse arguments from: $ARGUMENTS

2. Read and parse the design guide markdown file

3. Create a new git branch:
   git checkout -b <branch-name>

4. Generate and update files:

   a. **Update `app/globals.css`**:
      - Add CSS custom properties from the design guide
      - Include base styles for typography and colors
      - Ensure dark mode support

   b. **Create/Update `lib/design-theme.ts`**:
      - Export Tailwind theme extension
      - Include all design tokens

   c. **Generate components in `components/ui/`**:
      - Button.tsx
      - Card.tsx
      - Input.tsx
      - Badge.tsx

5. Commit changes:
   git commit -m "Apply design guide: <guide-name>"

6. Report results with files modified and next steps
```

The beauty of this approach is that the AI becomes a true design system engineer—it doesn't just copy-paste, it **understands context** and **makes intelligent decisions** about how to apply design tokens to real components.

---

## Component Generation: From Tokens to React

When applying a design guide, the system generates fully-typed React components. Here's what the generated Button component looks like:

```typescript
// Generated component based on design guide

export interface ComponentStyle {
  name: string;
  description: string;
  baseClasses: string;
  variants?: Record<string, string>;
  states?: {
    hover?: string;
    focus?: string;
    active?: string;
    disabled?: string;
  };
}

// Extracted from design guide
const buttonStyle: ComponentStyle = {
  name: 'Button',
  description: 'Primary action buttons with hover and focus states',
  baseClasses: 'inline-flex items-center justify-center rounded-lg ' +
               'px-4 py-2 font-medium transition-all duration-200',
  variants: {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary/10',
  },
  states: {
    hover: 'scale-[1.02] shadow-md',
    focus: 'ring-2 ring-primary/50 ring-offset-2',
    active: 'scale-[0.98]',
    disabled: 'opacity-50 cursor-not-allowed',
  },
};
```

The generated components use CSS variables, making them automatically responsive to the design guide's color scheme—including dark mode support without any additional code.

---

## Real-World Workflow

Here's what using Design Cloner looks like in practice:

**Step 1: Extract a design from Linear's website**
```bash
/design-extract https://linear.app ./design-guides/linear-style.md
```

Claude fetches the page, analyzes the CSS, and generates a comprehensive design guide with 10+ colors, typography scales, spacing systems, and component patterns.

**Step 2: Preview what will change**
```bash
/design-preview ./design-guides/linear-style.md
```

See a breakdown of the design tokens and how they'll map to your existing styles.

**Step 3: Apply to your repository**
```bash
/design-apply ./design-guides/linear-style.md restyle/linear-theme
```

A new branch is created with updated CSS variables, Tailwind config extensions, and regenerated UI components—all committed and ready for review.

**Step 4: Restyle individual files**
```bash
/design-restyle ./app/dashboard/page.tsx ./design-guides/linear-style.md
```

Transform a single component file, mapping old utility classes to new design tokens.

---

## The Technology Stack

Design Cloner is built with modern web technologies:

- **Next.js 16** — App router with React 19
- **TypeScript** — Full type safety across the codebase
- **Tailwind CSS 4** — Utility-first styling with design token integration
- **Claude AI** — Powering the extraction and application logic
- **Markdown** — Portable, versionable design guide format

The architecture is deliberately simple. No complex build pipelines, no proprietary formats, no vendor lock-in. Just markdown files that work with any AI assistant that supports Claude-style slash commands.

---

## What I Learned Building This

### 1. AI Works Best with Structured Prompts

The extraction prompt is highly structured—seven specific categories with bullet points. This isn't accidental. AI models perform significantly better when given explicit frameworks for organizing information.

### 2. Markdown is an Underrated Interchange Format

JSON is great for machines, but markdown is readable by both humans and AI. Design guides as markdown files can be edited by hand, reviewed in pull requests, and processed by AI without any parsing overhead.

### 3. Git Branches are Perfect for Design Experiments

By creating new branches for each design application, you can safely experiment with completely different visual styles without affecting your main codebase. Compare branches, cherry-pick changes, or throw away experiments entirely.

### 4. Design Philosophy Matters

Extracting just the tokens isn't enough. Understanding *why* a design works—its mood, principles, and philosophy—helps the AI make better decisions when encountering edge cases during application.

---

## What's Next

Design Cloner is open source and actively developed. Future plans include:

- **Figma integration** — Extract design tokens directly from Figma files
- **Design diffing** — Visual comparison between design guides
- **Component library detection** — Recognize when sites use shadcn/ui, Radix, or other libraries
- **Multi-framework support** — Generate components for Vue, Svelte, and other frameworks

---

## Try It Yourself

The project is available on GitHub. Clone it, point it at your favorite website, and watch as AI extracts and applies a complete design system in minutes.

```bash
git clone https://github.com/your-repo/design-cloner
cd design-cloner
npm install
npm run dev
```

Then open Claude Code and run:
```bash
/design-extract https://your-favorite-site.com
```

---

*Building tools that augment human creativity with AI capabilities is the future of development. Design Cloner is just one example of how we can use AI not to replace designers, but to accelerate the translation of design inspiration into working code.*

---

## Image Generation Prompts for Article Illustrations

Below are four prompts for generating illustrations to accompany this article:

---

### Image 1: Hero/Header Illustration

> **Inspiration Credit:** This project was inspired by the article ["10 Best Modern AI Website Designs to Clone"](https://medium.com/@alphadesignglobal/10-best-modern-ai-website-designs-to-clone-c395db287fd6) by Alpha Design Global, which showcases the stunning design systems of modern AI companies.

```
A sleek, modern digital illustration showing the transformation of a website
into design tokens. On the left side, show a stylized browser window displaying
a minimal dark-themed website (similar to Linear or Vercel aesthetic, inspired
by the "10 Best Modern AI Website Designs to Clone" article). Flowing lines
and particles connect to the right side showing floating design elements:
color swatches in purple and blue gradients, typography specimens, rounded
rectangles representing components, and subtle grid patterns. The style should
be clean, professional, with a dark background (#0D0D0D), glowing accent
colors (#6366f1, #8b5cf6), and a sense of intelligent automation. Include
subtle circuit-board patterns suggesting AI processing. Add a small visual
nod to the concept of "cloning" beautiful designs—perhaps a DNA helix or
copy icon integrated subtly. 16:9 aspect ratio, suitable for a blog hero image.
```

---

### Image 2: Architecture Diagram Illustration

```
An isometric 3D illustration showing three interconnected floating platforms
representing the design cloning pipeline. The first platform (left) shows a
magnifying glass analyzing a stylized website with CSS code visible. The
middle platform displays a glowing markdown document with design tokens
radiating outward like a constellation. The third platform (right) shows
a code editor with generated React components and CSS variables. Connecting
the platforms are flowing streams of data represented as glowing particles
in a gradient from purple to cyan. Style: Modern tech illustration, clean
lines, dark background with luminous accents, minimal but informative.
Perfect for explaining system architecture.
```

---

### Image 3: Before/After Transformation

```
A split-screen illustration showing design transformation. Left side labeled
"BEFORE": A generic, unstyled web interface with basic gray colors, default
fonts, and plain rectangular buttons - visually bland and corporate. Right
side labeled "AFTER": The same interface transformed with a sophisticated
design system - dark theme with purple accent colors, refined typography,
subtle shadows, glassmorphism cards, and polished UI components. Between
the two sides, a glowing divider with an AI/magic wand icon and floating
design tokens (color circles, font samples, spacing guides) transitioning
from left to right. Style: Clean UI mockup illustration, high contrast,
professional tech aesthetic.
```

---

### Image 4: Developer Workflow Illustration

```
An illustrated scene showing a developer's workspace from an angled top-down
perspective. A modern desk with a large monitor displaying code (TypeScript/React),
a second monitor showing a beautiful website being analyzed. Floating around
the workspace are holographic UI elements: a terminal window with Claude commands
(/design-extract, /design-apply), extracted color palettes, component previews,
and a git branch visualization. The developer's hands are on the keyboard with
a coffee cup nearby. The mood is productive and futuristic but grounded. Color
scheme: Dark workspace with warm accent lighting, screens glowing with purple
and blue code syntax highlighting. Include subtle AI assistant visualization
(abstract neural network patterns or constellation-style connections). Style:
Modern tech illustration, slightly stylized but professional.
```

---

*These prompts are optimized for AI image generators like Midjourney, DALL-E 3, or Stable Diffusion. Adjust aspect ratios and style parameters based on your preferred generator.*
