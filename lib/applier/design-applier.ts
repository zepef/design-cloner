/**
 * Design Applier
 * Applies design guides to repositories
 */

import { DesignGuide, ApplicationOptions, DesignDiff } from '../types/design-guide';

/**
 * File type patterns for different styling approaches
 */
export const FILE_PATTERNS = {
  css: ['**/*.css', '**/*.scss', '**/*.sass', '**/*.less'],
  tailwind: ['tailwind.config.*', 'tailwind.config.ts', 'tailwind.config.js'],
  react: ['**/*.tsx', '**/*.jsx'],
  vue: ['**/*.vue'],
  svelte: ['**/*.svelte'],
  globals: ['**/globals.css', '**/global.css', '**/styles.css', '**/main.css', '**/app.css'],
  layout: ['**/layout.tsx', '**/layout.jsx', '**/Layout.tsx', '**/Layout.jsx', '**/App.tsx', '**/App.jsx'],
};

/**
 * Generate CSS custom properties from design guide
 */
export function generateCSSVariables(guide: DesignGuide): string {
  const lightVars = `
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

  /* Font Sizes */
  --text-xs: ${guide.typography.fontSizes.xs};
  --text-sm: ${guide.typography.fontSizes.sm};
  --text-base: ${guide.typography.fontSizes.base};
  --text-lg: ${guide.typography.fontSizes.lg};
  --text-xl: ${guide.typography.fontSizes.xl};
  --text-2xl: ${guide.typography.fontSizes['2xl']};
  --text-3xl: ${guide.typography.fontSizes['3xl']};
  --text-4xl: ${guide.typography.fontSizes['4xl']};
  --text-5xl: ${guide.typography.fontSizes['5xl']};
  --text-6xl: ${guide.typography.fontSizes['6xl']};

  /* Spacing */
  --spacing-unit: ${guide.spacing.unit};
  --spacing-xs: ${guide.spacing.scale.xs};
  --spacing-sm: ${guide.spacing.scale.sm};
  --spacing-md: ${guide.spacing.scale.md};
  --spacing-lg: ${guide.spacing.scale.lg};
  --spacing-xl: ${guide.spacing.scale.xl};
  --spacing-2xl: ${guide.spacing.scale['2xl']};
  --spacing-3xl: ${guide.spacing.scale['3xl']};
  --container-max-width: ${guide.spacing.containerMaxWidth};
  --section-padding: ${guide.spacing.sectionPadding};

  /* Border Radius */
  --radius-none: ${guide.borderRadius.none};
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
  ${guide.shadows.inner ? `--shadow-inner: ${guide.shadows.inner};` : ''}

  /* Animation */
  --duration-fast: ${guide.animation.duration.fast};
  --duration-normal: ${guide.animation.duration.normal};
  --duration-slow: ${guide.animation.duration.slow};
  --easing-default: ${guide.animation.easing.default};
  --easing-in: ${guide.animation.easing.in};
  --easing-out: ${guide.animation.easing.out};
  --easing-in-out: ${guide.animation.easing.inOut};
  ${guide.animation.easing.bounce ? `--easing-bounce: ${guide.animation.easing.bounce};` : ''}`;

  const darkVars = `
  /* Colors - Dark Mode */
  --color-primary: ${guide.colors.dark.primary};
  --color-secondary: ${guide.colors.dark.secondary};
  --color-accent: ${guide.colors.dark.accent};
  --color-background: ${guide.colors.dark.background};
  --color-foreground: ${guide.colors.dark.foreground};
  --color-muted: ${guide.colors.dark.muted};
  --color-border: ${guide.colors.dark.border};
  ${guide.colors.dark.success ? `--color-success: ${guide.colors.dark.success};` : ''}
  ${guide.colors.dark.warning ? `--color-warning: ${guide.colors.dark.warning};` : ''}
  ${guide.colors.dark.error ? `--color-error: ${guide.colors.dark.error};` : ''}`;

  return `@import "tailwindcss";

:root {
${lightVars}
}

@media (prefers-color-scheme: dark) {
  :root {
${darkVars}
  }
}

.dark {
${darkVars}
}

/* Base Styles */
body {
  font-family: var(--font-body);
  background-color: var(--color-background);
  color: var(--color-foreground);
  line-height: ${guide.typography.lineHeights.normal};
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: ${guide.typography.fontWeights.bold};
  line-height: ${guide.typography.lineHeights.tight};
}

code, pre {
  font-family: var(--font-mono);
}

/* Animation Keyframes */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes blur-in {
  from {
    opacity: 0;
    filter: blur(8px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
}

.animate-fade-in {
  animation: fade-in var(--duration-normal) var(--easing-out) forwards;
}

.animate-slide-up {
  animation: slide-up var(--duration-normal) var(--easing-out) forwards;
}

.animate-scale-in {
  animation: scale-in var(--duration-fast) var(--easing-out) forwards;
}

.animate-blur-in {
  animation: blur-in var(--duration-slow) var(--easing-out) forwards;
}
`;
}

/**
 * Generate Tailwind config extension from design guide
 */
export function generateTailwindExtension(guide: DesignGuide): string {
  return `import type { Config } from 'tailwindcss';

const designGuideExtension: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '${guide.colors.light.primary}',
          dark: '${guide.colors.dark.primary}',
        },
        secondary: {
          DEFAULT: '${guide.colors.light.secondary}',
          dark: '${guide.colors.dark.secondary}',
        },
        accent: {
          DEFAULT: '${guide.colors.light.accent}',
          dark: '${guide.colors.dark.accent}',
        },
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        success: '${guide.colors.light.success || '#22c55e'}',
        warning: '${guide.colors.light.warning || '#f59e0b'}',
        error: '${guide.colors.light.error || '#ef4444'}',
      },
      fontFamily: {
        heading: ${JSON.stringify(guide.typography.fontFamily.heading.split(',').map(f => f.trim().replace(/"/g, '')))},
        body: ${JSON.stringify(guide.typography.fontFamily.body.split(',').map(f => f.trim().replace(/"/g, '')))},
        mono: ${JSON.stringify(guide.typography.fontFamily.mono.split(',').map(f => f.trim().replace(/"/g, '')))},
      },
      fontSize: {
        xs: '${guide.typography.fontSizes.xs}',
        sm: '${guide.typography.fontSizes.sm}',
        base: '${guide.typography.fontSizes.base}',
        lg: '${guide.typography.fontSizes.lg}',
        xl: '${guide.typography.fontSizes.xl}',
        '2xl': '${guide.typography.fontSizes['2xl']}',
        '3xl': '${guide.typography.fontSizes['3xl']}',
        '4xl': '${guide.typography.fontSizes['4xl']}',
        '5xl': '${guide.typography.fontSizes['5xl']}',
        '6xl': '${guide.typography.fontSizes['6xl']}',
      },
      borderRadius: {
        none: '${guide.borderRadius.none}',
        sm: '${guide.borderRadius.sm}',
        DEFAULT: '${guide.borderRadius.md}',
        md: '${guide.borderRadius.md}',
        lg: '${guide.borderRadius.lg}',
        xl: '${guide.borderRadius.xl}',
        full: '${guide.borderRadius.full}',
      },
      boxShadow: {
        sm: '${guide.shadows.sm}',
        DEFAULT: '${guide.shadows.md}',
        md: '${guide.shadows.md}',
        lg: '${guide.shadows.lg}',
        xl: '${guide.shadows.xl}',
        ${guide.shadows.glow ? `glow: '${guide.shadows.glow}',` : ''}
        ${guide.shadows.inner ? `inner: '${guide.shadows.inner}',` : ''}
      },
      spacing: {
        xs: '${guide.spacing.scale.xs}',
        sm: '${guide.spacing.scale.sm}',
        md: '${guide.spacing.scale.md}',
        lg: '${guide.spacing.scale.lg}',
        xl: '${guide.spacing.scale.xl}',
        '2xl': '${guide.spacing.scale['2xl']}',
        '3xl': '${guide.spacing.scale['3xl']}',
        'section': '${guide.spacing.sectionPadding}',
      },
      maxWidth: {
        container: '${guide.spacing.containerMaxWidth}',
      },
      transitionDuration: {
        fast: '${guide.animation.duration.fast}',
        normal: '${guide.animation.duration.normal}',
        slow: '${guide.animation.duration.slow}',
      },
      transitionTimingFunction: {
        DEFAULT: '${guide.animation.easing.default}',
        in: '${guide.animation.easing.in}',
        out: '${guide.animation.easing.out}',
        'in-out': '${guide.animation.easing.inOut}',
        ${guide.animation.easing.bounce ? `bounce: '${guide.animation.easing.bounce}',` : ''}
      },
      animation: {
        'fade-in': 'fade-in var(--duration-normal) var(--easing-out) forwards',
        'slide-up': 'slide-up var(--duration-normal) var(--easing-out) forwards',
        'scale-in': 'scale-in var(--duration-fast) var(--easing-out) forwards',
        'blur-in': 'blur-in var(--duration-slow) var(--easing-out) forwards',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(1rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'blur-in': {
          from: { opacity: '0', filter: 'blur(8px)' },
          to: { opacity: '1', filter: 'blur(0)' },
        },
      },
    },
  },
};

export default designGuideExtension;
`;
}

/**
 * Generate component templates from design guide
 */
export function generateComponentTemplates(guide: DesignGuide): Record<string, string> {
  const components: Record<string, string> = {};

  // Button component
  const buttonStyle = guide.components.find(c => c.name === 'Button');
  if (buttonStyle) {
    components['Button.tsx'] = `import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = "${buttonStyle.baseClasses}";

  const variantClasses = {
    primary: "${buttonStyle.variants?.primary || 'bg-primary text-white hover:bg-primary/90'}",
    secondary: "${buttonStyle.variants?.secondary || 'bg-secondary text-white hover:bg-secondary/90'}",
    outline: "${buttonStyle.variants?.outline || 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}",
    ghost: "${buttonStyle.variants?.ghost || 'text-primary hover:bg-primary/10'}",
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
}
`;
  }

  // Card component
  const cardStyle = guide.components.find(c => c.name === 'Card');
  if (cardStyle) {
    components['Card.tsx'] = `import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'flat' | 'glass';
  children: ReactNode;
}

export function Card({
  variant = 'default',
  children,
  className = '',
  ...props
}: CardProps) {
  const baseClasses = "${cardStyle.baseClasses}";

  const variantClasses = {
    default: '',
    elevated: "${cardStyle.variants?.elevated || 'shadow-xl hover:shadow-2xl transition-shadow'}",
    flat: "${cardStyle.variants?.flat || 'shadow-none border-2'}",
    glass: "${cardStyle.variants?.glass || 'bg-white/80 dark:bg-black/40 backdrop-blur-lg border-white/20'}",
  };

  return (
    <div
      className={\`\${baseClasses} \${variantClasses[variant]} \${className}\`}
      {...props}
    >
      {children}
    </div>
  );
}
`;
  }

  // Input component
  const inputStyle = guide.components.find(c => c.name === 'Input');
  if (inputStyle) {
    components['Input.tsx'] = `import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const baseClasses = "${inputStyle.baseClasses}";
    const focusClasses = "${inputStyle.states?.focus || 'focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none'}";
    const errorClasses = error ? 'border-error focus:border-error focus:ring-error/20' : '';

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={\`\${baseClasses} \${focusClasses} \${errorClasses} \${className}\`}
          {...props}
        />
        {error && (
          <span className="text-sm text-error">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
`;
  }

  // Badge component
  const badgeStyle = guide.components.find(c => c.name === 'Badge');
  if (badgeStyle) {
    components['Badge.tsx'] = `import { ReactNode, HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
  children: ReactNode;
}

export function Badge({
  variant = 'default',
  children,
  className = '',
  ...props
}: BadgeProps) {
  const baseClasses = "${badgeStyle.baseClasses}";

  const variantClasses = {
    default: "${badgeStyle.variants?.default || 'bg-primary/10 text-primary'}",
    success: "${badgeStyle.variants?.success || 'bg-success/10 text-success'}",
    warning: "${badgeStyle.variants?.warning || 'bg-warning/10 text-warning'}",
    error: "${badgeStyle.variants?.error || 'bg-error/10 text-error'}",
  };

  return (
    <span
      className={\`\${baseClasses} \${variantClasses[variant]} \${className}\`}
      {...props}
    >
      {children}
    </span>
  );
}
`;
  }

  return components;
}

/**
 * Calculate design differences between two guides
 */
export function calculateDesignDiff(before: DesignGuide, after: DesignGuide): DesignDiff[] {
  const diffs: DesignDiff[] = [];

  // Compare colors
  const colorKeys = ['primary', 'secondary', 'accent', 'background', 'foreground'] as const;
  for (const key of colorKeys) {
    if (before.colors.light[key] !== after.colors.light[key]) {
      diffs.push({
        property: `colors.light.${key}`,
        before: before.colors.light[key],
        after: after.colors.light[key],
        impact: key === 'primary' || key === 'background' ? 'high' : 'medium',
      });
    }
  }

  // Compare typography
  if (before.typography.fontFamily.heading !== after.typography.fontFamily.heading) {
    diffs.push({
      property: 'typography.fontFamily.heading',
      before: before.typography.fontFamily.heading,
      after: after.typography.fontFamily.heading,
      impact: 'high',
    });
  }

  if (before.typography.fontFamily.body !== after.typography.fontFamily.body) {
    diffs.push({
      property: 'typography.fontFamily.body',
      before: before.typography.fontFamily.body,
      after: after.typography.fontFamily.body,
      impact: 'high',
    });
  }

  // Compare border radius
  if (before.borderRadius.lg !== after.borderRadius.lg) {
    diffs.push({
      property: 'borderRadius.lg',
      before: before.borderRadius.lg,
      after: after.borderRadius.lg,
      impact: 'medium',
    });
  }

  return diffs;
}

/**
 * Generate branch name for restyled version
 */
export function generateBranchName(guideName: string): string {
  const sanitized = guideName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  return `restyle/${sanitized}-${timestamp}`;
}

/**
 * Application plan generator
 */
export function generateApplicationPlan(guide: DesignGuide, options: ApplicationOptions): string {
  return `# Design Application Plan

## Target: ${options.targetRepo}
## Design: ${guide.name}
## Branch: ${options.branchName}

### Files to Create/Update

1. **globals.css** - CSS custom properties and base styles
2. **tailwind.config.ts** - Extended Tailwind theme
3. **components/ui/** - Generated UI components

### Application Steps

1. Create new branch: \`${options.branchName}\`
2. Update CSS variables in globals.css
3. Extend Tailwind configuration
4. ${options.generateComponents ? 'Generate component library' : 'Skip component generation'}
5. ${options.includeDocumentation ? 'Create design documentation' : 'Skip documentation'}
6. Commit and push changes

### Design Tokens to Apply

- **Colors:** ${Object.keys(guide.colors.light).length} tokens
- **Typography:** ${Object.keys(guide.typography.fontSizes).length} size variants
- **Spacing:** ${Object.keys(guide.spacing.scale).length} scale values
- **Components:** ${guide.components.length} component styles

### Estimated Changes

- ~3-5 files modified
- ~${guide.components.length} components generated
- Design system fully applied
`;
}
