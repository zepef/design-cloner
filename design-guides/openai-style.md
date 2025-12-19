# OpenAI Style Design Guide

**Version:** 1.0.0
**Extracted:** 2025-12-19
**Source:** Inspired by OpenAI.com

## Description

A clean, research-focused design system inspired by OpenAI's website. Features elegant typography, thoughtful spacing, and a sophisticated color palette that balances professionalism with approachability. Emphasizes content readability and AI-first interactions.

> This design guide can be applied to any web project to achieve consistent styling.
> Use the Claude slash commands or the design application engine to apply this guide.

---

## Design Philosophy

**Style:** elegant-minimal
**Mood:** intelligent-approachable

### Design Principles

- Content-first approach with exceptional readability
- Generous white space for cognitive breathing room
- Soft, inviting color palette
- Accessible to technical and non-technical audiences
- Seamless dark/light mode transitions
- AI chat as a primary interaction pattern

---

## Color Palette

### Light Mode

| Token | Value |
|-------|-------|
| primary | `#10A37F` |
| secondary | `#1A7F64` |
| accent | `#FF6B35` |
| background | `#FFFFFF` |
| foreground | `#202123` |
| muted | `#F7F7F8` |
| border | `#E5E5E6` |
| success | `#10A37F` |
| warning | `#F59E0B` |
| error | `#EF4444` |

### Dark Mode

| Token | Value |
|-------|-------|
| primary | `#19C37D` |
| secondary | `#25D195` |
| accent | `#FF8A5C` |
| background | `#343541` |
| foreground | `#ECECF1` |
| muted | `#444654` |
| border | `#565869` |
| success | `#19C37D` |
| warning | `#FBBF24` |
| error | `#F87171` |

### Gradients

**hero-gradient**
```css
background: linear-gradient(180deg, #FFFFFF 0%, #F7F7F8 100%);
```

**dark-hero-gradient**
```css
background: linear-gradient(180deg, #343541 0%, #202123 100%);
```

---

## Typography

### Font Families

| Type | Value |
|------|-------|
| Heading | `"Söhne", "Helvetica Neue", Arial, sans-serif` |
| Body | `"Söhne", "Helvetica Neue", Arial, sans-serif` |
| Mono | `"Söhne Mono", "Monaco", "Consolas", monospace` |

### Font Sizes

| Token | Value |
|-------|-------|
| xs | `0.75rem` |
| sm | `0.875rem` |
| base | `1rem` |
| lg | `1.125rem` |
| xl | `1.25rem` |
| 2xl | `1.5rem` |
| 3xl | `1.875rem` |
| 4xl | `2.25rem` |
| 5xl | `3rem` |
| 6xl | `4rem` |

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
| tight | `1.25` |
| normal | `1.6` |
| relaxed | `1.75` |
| loose | `2` |

---

## Spacing

**Base Unit:** `0.25rem`
**Container Max Width:** `1024px`
**Section Padding:** `5rem`

### Spacing Scale

| Token | Value |
|-------|-------|
| xs | `0.5rem` |
| sm | `0.75rem` |
| md | `1rem` |
| lg | `1.5rem` |
| xl | `2rem` |
| 2xl | `3rem` |
| 3xl | `5rem` |

---

## Border Radius

| Token | Value |
|-------|-------|
| none | `0` |
| sm | `0.25rem` |
| md | `0.375rem` |
| lg | `0.5rem` |
| xl | `0.75rem` |
| full | `9999px` |

---

## Shadows

| Token | Value |
|-------|-------|
| sm | `0 1px 2px 0 rgb(0 0 0 / 0.03)` |
| md | `0 2px 4px 0 rgb(0 0 0 / 0.05)` |
| lg | `0 4px 12px 0 rgb(0 0 0 / 0.08)` |
| xl | `0 8px 24px 0 rgb(0 0 0 / 0.12)` |
| glow | `0 0 20px rgb(16 163 127 / 0.2)` |

---

## Animation

### Durations

| Token | Value |
|-------|-------|
| fast | `150ms` |
| normal | `250ms` |
| slow | `400ms` |

### Easing Functions

| Token | Value |
|-------|-------|
| default | `ease-out` |
| in | `ease-in` |
| out | `ease-out` |
| inOut | `ease-in-out` |

### Transition Presets

**fade**
```css
transition: opacity 250ms ease-out;
```

**slide**
```css
transition: transform 300ms ease-out;
```

---

## Component Styles

### Button

**Base Classes:**
```
inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors
```

**Variants:**
- **primary:** `bg-primary text-white hover:bg-secondary`
- **secondary:** `bg-foreground text-background hover:bg-foreground/90`
- **outline:** `border border-foreground/20 text-foreground hover:bg-foreground/5`
- **ghost:** `text-foreground hover:bg-foreground/5`

### Card

**Base Classes:**
```
rounded-lg bg-background p-6 border border-border
```

**Variants:**
- **elevated:** `shadow-lg`
- **flat:** `shadow-none bg-muted`
- **chat:** `bg-muted/50 rounded-2xl`

### Input

**Base Classes:**
```
w-full rounded-md border border-border bg-background px-4 py-3 text-foreground transition-colors
```

**States:**
- **focus:** `border-primary ring-1 ring-primary outline-none`
- **disabled:** `bg-muted/50 opacity-60 cursor-not-allowed`

### Chat Interface

**MessageBubble:**

Base: `rounded-2xl px-4 py-3 max-w-[85%]`

- **user:** `bg-primary text-white ml-auto`
- **assistant:** `bg-muted text-foreground`

**ChatInput:**

```
w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-foreground shadow-lg
```

---

## Special Effects

| Effect | Enabled |
|--------|---------|
| Glassmorphism | No |
| Neumorphism | No |
| Gradient Text | No |
| Glow Effects | Yes (subtle) |

### Animation Classes

- `fade-in`
- `typing-indicator`
- `pulse`

---

## AI-Specific Elements

### Chat Interface

**Core Components:**
- Message container with sticky header
- Auto-scrolling message list
- Expandable text input with send button
- Typing indicator with animated dots
- Code block syntax highlighting
- Copy button for responses

### Loading States

**TypingIndicator:**
```css
.typing-dot {
  animation: typing-bounce 1.4s ease-in-out infinite;
}
.typing-dot:nth-child(1) { animation-delay: 0s; }
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }
```

**StreamingText:**
```css
.streaming {
  animation: cursor-blink 1s step-end infinite;
}
```

---

## CSS Variables

```css
:root {
  /* Colors - Light Mode */
  --color-primary: #10A37F;
  --color-secondary: #1A7F64;
  --color-accent: #FF6B35;
  --color-background: #FFFFFF;
  --color-foreground: #202123;
  --color-muted: #F7F7F8;
  --color-border: #E5E5E6;
  --color-success: #10A37F;
  --color-warning: #F59E0B;
  --color-error: #EF4444;

  /* Typography */
  --font-heading: "Söhne", "Helvetica Neue", Arial, sans-serif;
  --font-body: "Söhne", "Helvetica Neue", Arial, sans-serif;
  --font-mono: "Söhne Mono", "Monaco", "Consolas", monospace;

  /* Spacing */
  --container-max-width: 1024px;
  --section-padding: 5rem;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;

  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
}

/* Dark Mode */
.dark, [data-theme="dark"] {
  --color-primary: #19C37D;
  --color-secondary: #25D195;
  --color-accent: #FF8A5C;
  --color-background: #343541;
  --color-foreground: #ECECF1;
  --color-muted: #444654;
  --color-border: #565869;
}
```

---

## Tailwind CSS Configuration

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10A37F',
          dark: '#19C37D',
        },
        secondary: '#1A7F64',
        accent: '#FF6B35',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['Söhne', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['Söhne Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      maxWidth: {
        prose: '1024px',
      },
      animation: {
        'typing': 'typing-bounce 1.4s ease-in-out infinite',
      },
    },
  },
};
```

---

## Usage Examples

### Chat Component

```tsx
export function ChatMessage({ role, content }) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`rounded-2xl px-4 py-3 max-w-[85%] ${
          isUser
            ? 'bg-primary text-white'
            : 'bg-muted text-foreground'
        }`}
      >
        {content}
      </div>
    </div>
  );
}
```

### Chat Input

```tsx
export function ChatInput({ onSend }) {
  return (
    <div className="relative">
      <textarea
        className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-foreground shadow-lg resize-none"
        placeholder="Send a message..."
        rows={1}
      />
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-foreground/50 hover:text-primary transition-colors"
        onClick={onSend}
      >
        <SendIcon />
      </button>
    </div>
  );
}
```
