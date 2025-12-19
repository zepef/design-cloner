/**
 * Markdown Generator
 * Converts design guides to markdown format for storage and reuse
 */

import {
  DesignGuide,
  ColorPalette,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Animation,
  ComponentStyle,
  LayoutPattern,
} from '../types/design-guide';

/**
 * Generate complete design guide markdown
 */
export function generateDesignGuideMarkdown(guide: DesignGuide): string {
  const sections = [
    generateHeader(guide),
    generatePhilosophySection(guide.philosophy),
    generateColorsSection(guide.colors),
    generateTypographySection(guide.typography),
    generateSpacingSection(guide.spacing),
    generateBorderRadiusSection(guide.borderRadius),
    generateShadowsSection(guide.shadows),
    generateAnimationSection(guide.animation),
    generateLayoutsSection(guide.layouts, guide.breakpoints),
    generateComponentsSection(guide.components),
    generateEffectsSection(guide.effects),
    generateAIElementsSection(guide.aiElements),
    generateMetadataSection(guide.metadata),
    generateCSSVariables(guide),
    generateTailwindConfig(guide),
    generateUsageExamples(guide),
  ];

  return sections.filter(Boolean).join('\n\n---\n\n');
}

function generateHeader(guide: DesignGuide): string {
  return `# ${guide.name}

**Version:** ${guide.version}
**Extracted:** ${guide.extractedAt}
${guide.sourceUrl ? `**Source:** ${guide.sourceUrl}` : ''}

## Description

${guide.description}

> This design guide can be applied to any web project to achieve consistent styling.
> Use the Claude slash commands or the design application engine to apply this guide.`;
}

function generatePhilosophySection(philosophy: DesignGuide['philosophy']): string {
  return `## Design Philosophy

**Style:** ${philosophy.style}
**Mood:** ${philosophy.mood}

### Design Principles

${philosophy.principles.map((p) => `- ${p}`).join('\n')}`;
}

function generateColorsSection(colors: { light: ColorPalette; dark: ColorPalette }): string {
  const colorTable = (palette: ColorPalette, mode: string): string => {
    const rows = [
      `| Token | Value |`,
      `|-------|-------|`,
      `| primary | \`${palette.primary}\` |`,
      `| secondary | \`${palette.secondary}\` |`,
      `| accent | \`${palette.accent}\` |`,
      `| background | \`${palette.background}\` |`,
      `| foreground | \`${palette.foreground}\` |`,
      `| muted | \`${palette.muted}\` |`,
      `| border | \`${palette.border}\` |`,
    ];

    if (palette.success) rows.push(`| success | \`${palette.success}\` |`);
    if (palette.warning) rows.push(`| warning | \`${palette.warning}\` |`);
    if (palette.error) rows.push(`| error | \`${palette.error}\` |`);

    return `### ${mode} Mode\n\n${rows.join('\n')}`;
  };

  const gradientSection = (palette: ColorPalette): string => {
    if (!palette.gradients?.length) return '';

    return `### Gradients\n\n${palette.gradients
      .map(
        (g) => `**${g.name}**
\`\`\`css
background: ${g.type}-gradient(${g.direction ? g.direction + ', ' : ''}${g.stops.map((s) => `${s.color} ${s.position}`).join(', ')});
\`\`\``
      )
      .join('\n\n')}`;
  };

  return `## Color Palette

${colorTable(colors.light, 'Light')}

${colorTable(colors.dark, 'Dark')}

${gradientSection(colors.light)}`;
}

function generateTypographySection(typography: Typography): string {
  return `## Typography

### Font Families

| Type | Value |
|------|-------|
| Heading | \`${typography.fontFamily.heading}\` |
| Body | \`${typography.fontFamily.body}\` |
| Mono | \`${typography.fontFamily.mono}\` |

### Font Sizes

| Token | Value |
|-------|-------|
${Object.entries(typography.fontSizes)
  .map(([key, value]) => `| ${key} | \`${value}\` |`)
  .join('\n')}

### Font Weights

| Token | Value |
|-------|-------|
${Object.entries(typography.fontWeights)
  .map(([key, value]) => `| ${key} | \`${value}\` |`)
  .join('\n')}

### Line Heights

| Token | Value |
|-------|-------|
${Object.entries(typography.lineHeights)
  .map(([key, value]) => `| ${key} | \`${value}\` |`)
  .join('\n')}

### Letter Spacing

| Token | Value |
|-------|-------|
${Object.entries(typography.letterSpacing)
  .map(([key, value]) => `| ${key} | \`${value}\` |`)
  .join('\n')}`;
}

function generateSpacingSection(spacing: Spacing): string {
  return `## Spacing

**Base Unit:** \`${spacing.unit}\`
**Container Max Width:** \`${spacing.containerMaxWidth}\`
**Section Padding:** \`${spacing.sectionPadding}\`

### Spacing Scale

| Token | Value |
|-------|-------|
${Object.entries(spacing.scale)
  .map(([key, value]) => `| ${key} | \`${value}\` |`)
  .join('\n')}`;
}

function generateBorderRadiusSection(borderRadius: BorderRadius): string {
  return `## Border Radius

| Token | Value |
|-------|-------|
${Object.entries(borderRadius)
  .map(([key, value]) => `| ${key} | \`${value}\` |`)
  .join('\n')}`;
}

function generateShadowsSection(shadows: Shadows): string {
  return `## Shadows

| Token | Value |
|-------|-------|
${Object.entries(shadows)
  .filter(([_, value]) => value)
  .map(([key, value]) => `| ${key} | \`${value}\` |`)
  .join('\n')}`;
}

function generateAnimationSection(animation: Animation): string {
  return `## Animation

### Durations

| Token | Value |
|-------|-------|
${Object.entries(animation.duration)
  .map(([key, value]) => `| ${key} | \`${value}\` |`)
  .join('\n')}

### Easing Functions

| Token | Value |
|-------|-------|
${Object.entries(animation.easing)
  .filter(([_, value]) => value)
  .map(([key, value]) => `| ${key} | \`${value}\` |`)
  .join('\n')}

### Transition Presets

${animation.transitions
  .map(
    (t) => `**${t.name}**
\`\`\`css
transition: ${t.property} ${t.duration} ${t.easing};
\`\`\``
  )
  .join('\n\n')}`;
}

function generateLayoutsSection(layouts: LayoutPattern[], breakpoints: Record<string, string>): string {
  return `## Layout Patterns

${layouts.map((l) => `### ${l.type.charAt(0).toUpperCase() + l.type.slice(1)} Layout

- **Type:** ${l.type}
${l.columns ? `- **Columns:** ${l.columns}` : ''}
- **Gap:** ${l.gap}
- **Description:** ${l.description}`).join('\n\n')}

### Breakpoints

| Token | Value |
|-------|-------|
${Object.entries(breakpoints)
  .map(([key, value]) => `| ${key} | \`${value}\` |`)
  .join('\n')}`;
}

function generateComponentsSection(components: ComponentStyle[]): string {
  return `## Component Styles

${components
  .map(
    (c) => `### ${c.name}

${c.description}

**Base Classes:**
\`\`\`
${c.baseClasses}
\`\`\`

${
  c.variants
    ? `**Variants:**
${Object.entries(c.variants)
  .map(([name, classes]) => `- **${name}:** \`${classes}\``)
  .join('\n')}`
    : ''
}

${
  c.states
    ? `**States:**
${Object.entries(c.states)
  .filter(([_, classes]) => classes)
  .map(([name, classes]) => `- **${name}:** \`${classes}\``)
  .join('\n')}`
    : ''
}`
  )
  .join('\n\n')}`;
}

function generateEffectsSection(effects?: DesignGuide['effects']): string {
  if (!effects) return '';

  return `## Special Effects

| Effect | Enabled |
|--------|---------|
| Glassmorphism | ${effects.glassmorphism ? 'Yes' : 'No'} |
| Neumorphism | ${effects.neumorphism ? 'Yes' : 'No'} |
| Gradient Text | ${effects.gradientText ? 'Yes' : 'No'} |
| Glow Effects | ${effects.glowEffects ? 'Yes' : 'No'} |

${effects.animations?.length ? `### Animation Classes\n\n${effects.animations.map((a) => `- \`${a}\``).join('\n')}` : ''}`;
}

function generateAIElementsSection(aiElements?: DesignGuide['aiElements']): string {
  if (!aiElements) return '';

  let section = `## AI-Specific Elements\n\n`;

  if (aiElements.chatInterface) {
    section += `### Chat Interface

**${aiElements.chatInterface.name}:** ${aiElements.chatInterface.description}

Base: \`${aiElements.chatInterface.baseClasses}\`

${
  aiElements.chatInterface.variants
    ? Object.entries(aiElements.chatInterface.variants)
        .map(([name, classes]) => `- **${name}:** \`${classes}\``)
        .join('\n')
    : ''
}
`;
  }

  if (aiElements.loadingStates?.length) {
    section += `\n### Loading States\n\n${aiElements.loadingStates.map((l) => `- **${l.name}:** ${l.description}`).join('\n')}`;
  }

  if (aiElements.dataVisualization?.length) {
    section += `\n\n### Data Visualization\n\n${aiElements.dataVisualization.map((d) => `- ${d}`).join('\n')}`;
  }

  if (aiElements.interactiveElements?.length) {
    section += `\n\n### Interactive Elements\n\n${aiElements.interactiveElements.map((i) => `- ${i}`).join('\n')}`;
  }

  return section;
}

function generateMetadataSection(metadata?: DesignGuide['metadata']): string {
  if (!metadata) return '';

  return `## Metadata

| Property | Value |
|----------|-------|
${metadata.industry ? `| Industry | ${metadata.industry} |` : ''}
${metadata.targetAudience ? `| Target Audience | ${metadata.targetAudience} |` : ''}
${metadata.designSystem ? `| Design System | ${metadata.designSystem} |` : ''}
${metadata.inspirations?.length ? `| Inspirations | ${metadata.inspirations.join(', ')} |` : ''}`;
}

function generateCSSVariables(guide: DesignGuide): string {
  return `## CSS Variables

Use these CSS custom properties in your stylesheets:

\`\`\`css
:root {
  /* Colors - Light Mode */
  --color-primary: ${guide.colors.light.primary};
  --color-secondary: ${guide.colors.light.secondary};
  --color-accent: ${guide.colors.light.accent};
  --color-background: ${guide.colors.light.background};
  --color-foreground: ${guide.colors.light.foreground};
  --color-muted: ${guide.colors.light.muted};
  --color-border: ${guide.colors.light.border};
  ${guide.colors.light.success ? `--color-success: ${guide.colors.light.success};` : ''}
  ${guide.colors.light.warning ? `--color-warning: ${guide.colors.light.warning};` : ''}
  ${guide.colors.light.error ? `--color-error: ${guide.colors.light.error};` : ''}

  /* Typography */
  --font-heading: ${guide.typography.fontFamily.heading};
  --font-body: ${guide.typography.fontFamily.body};
  --font-mono: ${guide.typography.fontFamily.mono};

  /* Spacing */
  --spacing-unit: ${guide.spacing.unit};
  --container-max-width: ${guide.spacing.containerMaxWidth};
  --section-padding: ${guide.spacing.sectionPadding};

  /* Border Radius */
  --radius-sm: ${guide.borderRadius.sm};
  --radius-md: ${guide.borderRadius.md};
  --radius-lg: ${guide.borderRadius.lg};
  --radius-xl: ${guide.borderRadius.xl};
  --radius-full: ${guide.borderRadius.full};

  /* Shadows */
  --shadow-sm: ${guide.shadows.sm};
  --shadow-md: ${guide.shadows.md};
  --shadow-lg: ${guide.shadows.lg};
  --shadow-xl: ${guide.shadows.xl};
  ${guide.shadows.glow ? `--shadow-glow: ${guide.shadows.glow};` : ''}

  /* Animation */
  --duration-fast: ${guide.animation.duration.fast};
  --duration-normal: ${guide.animation.duration.normal};
  --duration-slow: ${guide.animation.duration.slow};
  --easing-default: ${guide.animation.easing.default};
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: ${guide.colors.dark.primary};
    --color-secondary: ${guide.colors.dark.secondary};
    --color-accent: ${guide.colors.dark.accent};
    --color-background: ${guide.colors.dark.background};
    --color-foreground: ${guide.colors.dark.foreground};
    --color-muted: ${guide.colors.dark.muted};
    --color-border: ${guide.colors.dark.border};
    ${guide.colors.dark.success ? `--color-success: ${guide.colors.dark.success};` : ''}
    ${guide.colors.dark.warning ? `--color-warning: ${guide.colors.dark.warning};` : ''}
    ${guide.colors.dark.error ? `--color-error: ${guide.colors.dark.error};` : ''}
  }
}
\`\`\``;
}

function generateTailwindConfig(guide: DesignGuide): string {
  return `## Tailwind CSS Configuration

Add this to your \`tailwind.config.js\`:

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${guide.colors.light.primary}',
        secondary: '${guide.colors.light.secondary}',
        accent: '${guide.colors.light.accent}',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        success: '${guide.colors.light.success || '#22c55e'}',
        warning: '${guide.colors.light.warning || '#f59e0b'}',
        error: '${guide.colors.light.error || '#ef4444'}',
      },
      fontFamily: {
        heading: ['${guide.typography.fontFamily.heading.split(',')[0].replace(/"/g, '')}', 'system-ui', 'sans-serif'],
        body: ['${guide.typography.fontFamily.body.split(',')[0].replace(/"/g, '')}', 'system-ui', 'sans-serif'],
        mono: ['${guide.typography.fontFamily.mono.split(',')[0].replace(/"/g, '')}', 'monospace'],
      },
      borderRadius: {
        sm: '${guide.borderRadius.sm}',
        md: '${guide.borderRadius.md}',
        lg: '${guide.borderRadius.lg}',
        xl: '${guide.borderRadius.xl}',
      },
      boxShadow: {
        sm: '${guide.shadows.sm}',
        md: '${guide.shadows.md}',
        lg: '${guide.shadows.lg}',
        xl: '${guide.shadows.xl}',
        ${guide.shadows.glow ? `glow: '${guide.shadows.glow}',` : ''}
      },
      transitionDuration: {
        fast: '${guide.animation.duration.fast}',
        normal: '${guide.animation.duration.normal}',
        slow: '${guide.animation.duration.slow}',
      },
      transitionTimingFunction: {
        default: '${guide.animation.easing.default}',
        'ease-in': '${guide.animation.easing.in}',
        'ease-out': '${guide.animation.easing.out}',
        'ease-in-out': '${guide.animation.easing.inOut}',
        ${guide.animation.easing.bounce ? `bounce: '${guide.animation.easing.bounce}',` : ''}
      },
    },
  },
};
\`\`\``;
}

function generateUsageExamples(guide: DesignGuide): string {
  return `## Usage Examples

### Applying This Design Guide

To apply this design guide to a project using Claude Code, use the following command:

\`\`\`bash
# Extract design from a website
/design-extract https://example.com

# Apply design guide to current project
/design-apply ./design-guides/my-design.md

# Restyle a specific component
/design-restyle ./components/Button.tsx
\`\`\`

### Quick Start

1. Copy the CSS variables to your \`globals.css\`
2. Update your Tailwind config with the extended theme
3. Use the component patterns in your React components

### Example Component

\`\`\`tsx
// Button using this design system
export function Button({ variant = 'primary', children }) {
  const baseClasses = "${guide.components.find((c) => c.name === 'Button')?.baseClasses || ''}";
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  };

  return (
    <button className={\`\${baseClasses} \${variantClasses[variant]}\`}>
      {children}
    </button>
  );
}
\`\`\`

### Dark Mode Support

This design guide includes full dark mode support. Use Tailwind's \`dark:\` prefix or the \`prefers-color-scheme\` media query:

\`\`\`tsx
<div className="bg-background text-foreground dark:bg-background dark:text-foreground">
  <h1 className="text-primary dark:text-primary">Hello World</h1>
</div>
\`\`\``;
}

/**
 * Parse a design guide markdown back to object
 */
export function parseDesignGuideMarkdown(markdown: string): Partial<DesignGuide> {
  // This is a simplified parser - in production, use a proper markdown parser
  const guide: Partial<DesignGuide> = {};

  // Extract name from header
  const nameMatch = markdown.match(/^# (.+)$/m);
  if (nameMatch) {
    guide.name = nameMatch[1];
  }

  // Extract version
  const versionMatch = markdown.match(/\*\*Version:\*\* (.+)/);
  if (versionMatch) {
    guide.version = versionMatch[1].trim();
  }

  // Extract source URL
  const sourceMatch = markdown.match(/\*\*Source:\*\* (.+)/);
  if (sourceMatch) {
    guide.sourceUrl = sourceMatch[1].trim();
  }

  return guide;
}
