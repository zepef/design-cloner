# Linear AI Style Design Guide

**Version:** 1.0.0
**Extracted:** 2025-12-19
**Source:** Inspired by Linear.app

## Description

A modern, minimal design system inspired by Linear's clean aesthetic. Features a sophisticated dark-first approach with subtle purple accents, smooth animations, and exceptional attention to typography and spacing.

> This design guide can be applied to any web project to achieve consistent styling.
> Use the Claude slash commands or the design application engine to apply this guide.

---

## Design Philosophy

**Style:** modern-minimal
**Mood:** professional-sophisticated

### Design Principles

- Embrace negative space for visual breathing room
- Dark mode as the primary experience
- Subtle, purposeful animations
- Typography-driven hierarchy
- Minimal color palette with strategic accents
- Micro-interactions for engagement

---

## Color Palette

### Light Mode

| Token | Value |
|-------|-------|
| primary | `#5E6AD2` |
| secondary | `#8A8FE5` |
| accent | `#F2C94C` |
| background | `#FFFFFF` |
| foreground | `#1A1A1A` |
| muted | `#F7F8F9` |
| border | `#E5E5E5` |
| success | `#34D399` |
| warning | `#FBBF24` |
| error | `#F87171` |

### Dark Mode

| Token | Value |
|-------|-------|
| primary | `#8A8FE5` |
| secondary | `#A5A9F0` |
| accent | `#F2C94C` |
| background | `#0A0A0A` |
| foreground | `#FFFFFF` |
| muted | `#1A1A1A` |
| border | `#2A2A2A` |
| success | `#4ADE80` |
| warning | `#FCD34D` |
| error | `#FB7185` |

### Gradients

**primary-gradient**
```css
background: linear-gradient(to right, #5E6AD2 0%, #8A8FE5 100%);
```

**hero-gradient**
```css
background: radial-gradient(ellipse at top, #1A1A3E 0%, #0A0A0A 50%);
```

---

## Typography

### Font Families

| Type | Value |
|------|-------|
| Heading | `"Inter", system-ui, sans-serif` |
| Body | `"Inter", system-ui, sans-serif` |
| Mono | `"JetBrains Mono", "Fira Code", monospace` |

### Font Sizes

| Token | Value |
|-------|-------|
| xs | `0.75rem` |
| sm | `0.875rem` |
| base | `1rem` |
| lg | `1.125rem` |
| xl | `1.25rem` |
| 2xl | `1.5rem` |
| 3xl | `2rem` |
| 4xl | `2.5rem` |
| 5xl | `3.5rem` |
| 6xl | `4.5rem` |

### Font Weights

| Token | Value |
|-------|-------|
| light | `300` |
| normal | `400` |
| medium | `500` |
| semibold | `600` |
| bold | `700` |
| extrabold | `800` |

### Line Heights

| Token | Value |
|-------|-------|
| tight | `1.2` |
| normal | `1.5` |
| relaxed | `1.625` |
| loose | `2` |

### Letter Spacing

| Token | Value |
|-------|-------|
| tight | `-0.02em` |
| normal | `0` |
| wide | `0.02em` |

---

## Spacing

**Base Unit:** `0.25rem`
**Container Max Width:** `1200px`
**Section Padding:** `6rem`

### Spacing Scale

| Token | Value |
|-------|-------|
| xs | `0.5rem` |
| sm | `0.75rem` |
| md | `1rem` |
| lg | `1.5rem` |
| xl | `2rem` |
| 2xl | `3rem` |
| 3xl | `4rem` |

---

## Border Radius

| Token | Value |
|-------|-------|
| none | `0` |
| sm | `0.25rem` |
| md | `0.5rem` |
| lg | `0.75rem` |
| xl | `1rem` |
| full | `9999px` |

---

## Shadows

| Token | Value |
|-------|-------|
| sm | `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| md | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| lg | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |
| xl | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |
| glow | `0 0 30px rgb(94 106 210 / 0.3)` |
| inner | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)` |

---

## Animation

### Durations

| Token | Value |
|-------|-------|
| fast | `100ms` |
| normal | `200ms` |
| slow | `400ms` |

### Easing Functions

| Token | Value |
|-------|-------|
| default | `cubic-bezier(0.4, 0, 0.2, 1)` |
| in | `cubic-bezier(0.4, 0, 1, 1)` |
| out | `cubic-bezier(0, 0, 0.2, 1)` |
| inOut | `cubic-bezier(0.4, 0, 0.2, 1)` |
| bounce | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` |

### Transition Presets

**fade**
```css
transition: opacity 200ms cubic-bezier(0, 0, 0.2, 1);
```

**slide-up**
```css
transition: transform 300ms cubic-bezier(0, 0, 0.2, 1), opacity 300ms cubic-bezier(0, 0, 0.2, 1);
```

**scale**
```css
transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Layout Patterns

### Grid Layout

- **Type:** grid
- **Columns:** 12
- **Gap:** 1.5rem
- **Description:** Standard 12-column grid for responsive layouts

### Bento Layout

- **Type:** bento
- **Columns:** auto-fit
- **Gap:** 1rem
- **Description:** Modern bento-style grid with varying cell sizes for dashboards

### Breakpoints

| Token | Value |
|-------|-------|
| sm | `640px` |
| md | `768px` |
| lg | `1024px` |
| xl | `1280px` |
| 2xl | `1536px` |

---

## Component Styles

### Button

Primary action buttons with hover and focus states

**Base Classes:**
```
inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200
```

**Variants:**
- **primary:** `bg-primary text-white hover:bg-primary/90 shadow-sm`
- **secondary:** `bg-muted text-foreground hover:bg-muted/80`
- **outline:** `border border-border text-foreground hover:bg-muted`
- **ghost:** `text-foreground hover:bg-muted`

**States:**
- **hover:** `scale-[1.02]`
- **focus:** `ring-2 ring-primary/50 ring-offset-2 ring-offset-background`
- **active:** `scale-[0.98]`
- **disabled:** `opacity-50 cursor-not-allowed`

### Card

Content container with subtle shadow and border

**Base Classes:**
```
rounded-xl bg-background p-6 border border-border
```

**Variants:**
- **elevated:** `shadow-lg hover:shadow-xl transition-shadow`
- **flat:** `shadow-none`
- **glass:** `bg-background/80 backdrop-blur-lg border-border/50`

**States:**
- **hover:** `border-primary/30`

### Input

Form input fields with focus states

**Base Classes:**
```
w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground text-sm transition-colors
```

**States:**
- **hover:** `border-foreground/30`
- **focus:** `border-primary ring-2 ring-primary/20 outline-none`
- **disabled:** `bg-muted opacity-50 cursor-not-allowed`

### Badge

Small status indicators and tags

**Base Classes:**
```
inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
```

**Variants:**
- **default:** `bg-primary/10 text-primary`
- **success:** `bg-success/10 text-success`
- **warning:** `bg-warning/10 text-warning`
- **error:** `bg-error/10 text-error`

---

## Special Effects

| Effect | Enabled |
|--------|---------|
| Glassmorphism | Yes |
| Neumorphism | No |
| Gradient Text | Yes |
| Glow Effects | Yes |

### Animation Classes

- `fade-in`
- `slide-up`
- `scale-in`
- `blur-in`

---

## AI-Specific Elements

### Chat Interface

**ChatBubble:** AI conversation interface components

Base: `rounded-2xl p-4 max-w-[80%]`

- **user:** `bg-primary text-white ml-auto rounded-br-md`
- **assistant:** `bg-muted text-foreground mr-auto rounded-bl-md`

### Loading States

- **TypingIndicator:** Animated dots indicating AI is typing
- **SkeletonLoader:** Placeholder content during loading

### Interactive Elements

- Command palette (⌘K)
- Keyboard shortcuts
- Context menus
- Tooltips

---

## CSS Variables

Use these CSS custom properties in your stylesheets:

```css
:root {
  /* Colors - Light Mode */
  --color-primary: #5E6AD2;
  --color-secondary: #8A8FE5;
  --color-accent: #F2C94C;
  --color-background: #FFFFFF;
  --color-foreground: #1A1A1A;
  --color-muted: #F7F8F9;
  --color-border: #E5E5E5;
  --color-success: #34D399;
  --color-warning: #FBBF24;
  --color-error: #F87171;

  /* Typography */
  --font-heading: "Inter", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;

  /* Spacing */
  --spacing-unit: 0.25rem;
  --container-max-width: 1200px;
  --section-padding: 6rem;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-glow: 0 0 30px rgb(94 106 210 / 0.3);

  /* Animation */
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 400ms;
  --easing-default: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #8A8FE5;
    --color-secondary: #A5A9F0;
    --color-accent: #F2C94C;
    --color-background: #0A0A0A;
    --color-foreground: #FFFFFF;
    --color-muted: #1A1A1A;
    --color-border: #2A2A2A;
    --color-success: #4ADE80;
    --color-warning: #FCD34D;
    --color-error: #FB7185;
  }
}
```

---

## Tailwind CSS Configuration

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#5E6AD2',
        secondary: '#8A8FE5',
        accent: '#F2C94C',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        success: '#34D399',
        warning: '#FBBF24',
        error: '#F87171',
      },
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
      boxShadow: {
        glow: '0 0 30px rgb(94 106 210 / 0.3)',
      },
    },
  },
};
```

---

## Usage Examples

### Applying This Design Guide

```bash
# Apply to current project
/design-apply ./design-guides/linear-ai-style.md

# Preview changes first
/design-preview ./design-guides/linear-ai-style.md

# Restyle specific component
/design-restyle ./components/Header.tsx ./design-guides/linear-ai-style.md
```

### Example Button Component

```tsx
export function Button({ variant = 'primary', children }) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-sm",
    secondary: "bg-muted text-foreground hover:bg-muted/80",
    outline: "border border-border text-foreground hover:bg-muted",
    ghost: "text-foreground hover:bg-muted",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
}
```

### Dark Mode Support

```tsx
<div className="bg-background text-foreground">
  <h1 className="text-primary">Welcome</h1>
  <p className="text-foreground/80">Subtitle text</p>
</div>
```
