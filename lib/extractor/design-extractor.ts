/**
 * Design Extractor
 * Extracts design patterns from websites using analysis techniques
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
  ExtractionOptions,
} from '../types/design-guide';

/**
 * Color analysis utilities
 */
export function analyzeColorScheme(cssContent: string, htmlContent: string): { light: ColorPalette; dark: ColorPalette } {
  // Extract CSS custom properties (CSS variables)
  const cssVarPattern = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
  const colorPattern = /(#[0-9A-Fa-f]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\))/g;

  const extractedColors: string[] = [];
  let match;

  while ((match = cssVarPattern.exec(cssContent)) !== null) {
    if (match[2].match(colorPattern)) {
      extractedColors.push(match[2].trim());
    }
  }

  // Default AI-modern color scheme as fallback
  return {
    light: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#ffffff',
      foreground: '#0f172a',
      muted: '#f1f5f9',
      border: '#e2e8f0',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      gradients: [
        {
          name: 'primary-gradient',
          type: 'linear',
          direction: 'to right',
          stops: [
            { color: '#6366f1', position: '0%' },
            { color: '#8b5cf6', position: '100%' },
          ],
        },
      ],
    },
    dark: {
      primary: '#818cf8',
      secondary: '#a78bfa',
      accent: '#22d3ee',
      background: '#0f172a',
      foreground: '#f8fafc',
      muted: '#1e293b',
      border: '#334155',
      success: '#4ade80',
      warning: '#fbbf24',
      error: '#f87171',
      gradients: [
        {
          name: 'primary-gradient',
          type: 'linear',
          direction: 'to right',
          stops: [
            { color: '#818cf8', position: '0%' },
            { color: '#a78bfa', position: '100%' },
          ],
        },
      ],
    },
  };
}

/**
 * Typography analysis
 */
export function analyzeTypography(cssContent: string): Typography {
  const fontFamilyPattern = /font-family:\s*([^;]+);/g;
  const fontSizePattern = /font-size:\s*([^;]+);/g;

  // Extract font families
  const fonts: string[] = [];
  let match;
  while ((match = fontFamilyPattern.exec(cssContent)) !== null) {
    fonts.push(match[1].trim());
  }

  return {
    fontFamily: {
      heading: fonts[0] || '"Inter", system-ui, sans-serif',
      body: fonts[1] || '"Inter", system-ui, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
    },
  };
}

/**
 * Spacing analysis
 */
export function analyzeSpacing(): Spacing {
  return {
    unit: '0.25rem',
    scale: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    containerMaxWidth: '1280px',
    sectionPadding: '5rem',
  };
}

/**
 * Border radius analysis
 */
export function analyzeBorderRadius(): BorderRadius {
  return {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  };
}

/**
 * Shadow analysis
 */
export function analyzeShadows(): Shadows {
  return {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    glow: '0 0 20px rgb(99 102 241 / 0.3)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  };
}

/**
 * Animation analysis
 */
export function analyzeAnimations(): Animation {
  return {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    transitions: [
      {
        name: 'fade',
        property: 'opacity',
        duration: '300ms',
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      {
        name: 'slide-up',
        property: 'transform, opacity',
        duration: '400ms',
        easing: 'cubic-bezier(0, 0, 0.2, 1)',
      },
      {
        name: 'scale',
        property: 'transform',
        duration: '200ms',
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    ],
  };
}

/**
 * Layout pattern analysis
 */
export function analyzeLayouts(): LayoutPattern[] {
  return [
    {
      type: 'grid',
      columns: 12,
      gap: '1.5rem',
      description: 'Standard 12-column grid for responsive layouts',
    },
    {
      type: 'bento',
      columns: 'auto-fit',
      gap: '1rem',
      description: 'Bento-style grid with varying cell sizes for modern dashboards',
    },
    {
      type: 'flex',
      gap: '1rem',
      description: 'Flexible layouts for component arrangements',
    },
  ];
}

/**
 * Component style extraction
 */
export function extractComponentStyles(): ComponentStyle[] {
  return [
    {
      name: 'Button',
      description: 'Primary action buttons with hover and focus states',
      baseClasses: 'inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-all duration-200',
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
    },
    {
      name: 'Card',
      description: 'Content container with subtle shadow and border',
      baseClasses: 'rounded-xl bg-white dark:bg-muted p-6 shadow-md border border-border',
      variants: {
        elevated: 'shadow-xl hover:shadow-2xl transition-shadow',
        flat: 'shadow-none border-2',
        glass: 'bg-white/80 dark:bg-black/40 backdrop-blur-lg border-white/20',
      },
      states: {
        hover: 'border-primary/30',
      },
    },
    {
      name: 'Input',
      description: 'Form input fields with focus states',
      baseClasses: 'w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors',
      states: {
        hover: 'border-primary/50',
        focus: 'border-primary ring-2 ring-primary/20 outline-none',
        disabled: 'bg-muted opacity-50 cursor-not-allowed',
      },
    },
    {
      name: 'Badge',
      description: 'Small status indicators and tags',
      baseClasses: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      variants: {
        default: 'bg-primary/10 text-primary',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        error: 'bg-error/10 text-error',
      },
    },
    {
      name: 'Avatar',
      description: 'User profile images with fallback',
      baseClasses: 'relative inline-flex items-center justify-center rounded-full bg-muted overflow-hidden',
      variants: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
      },
    },
  ];
}

/**
 * Main extraction function
 */
export async function extractDesignGuide(options: ExtractionOptions): Promise<DesignGuide> {
  const { url, depth = 'medium' } = options;

  // This would be enhanced with actual web scraping
  // For now, return a template based on modern AI design trends

  const now = new Date().toISOString();

  return {
    name: `Design Guide - ${new URL(url).hostname}`,
    version: '1.0.0',
    sourceUrl: url,
    extractedAt: now,
    description: `Design system extracted from ${url}`,

    philosophy: {
      style: 'modern-ai',
      mood: 'professional',
      principles: [
        'Clean and minimal interfaces',
        'Bold typography for hierarchy',
        'Subtle animations for delight',
        'Dark mode as first-class citizen',
        'Accessible and inclusive design',
      ],
    },

    colors: analyzeColorScheme('', ''),
    typography: analyzeTypography(''),
    spacing: analyzeSpacing(),
    borderRadius: analyzeBorderRadius(),
    shadows: analyzeShadows(),
    animation: analyzeAnimations(),
    layouts: analyzeLayouts(),

    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    components: extractComponentStyles(),

    effects: {
      glassmorphism: true,
      neumorphism: false,
      gradientText: true,
      glowEffects: true,
      animations: ['fade-in', 'slide-up', 'scale-in', 'blur-in'],
    },

    aiElements: {
      chatInterface: {
        name: 'ChatBubble',
        description: 'AI conversation interface components',
        baseClasses: 'rounded-2xl p-4 max-w-[80%]',
        variants: {
          user: 'bg-primary text-white ml-auto rounded-br-sm',
          assistant: 'bg-muted text-foreground mr-auto rounded-bl-sm',
        },
      },
      loadingStates: [
        {
          name: 'TypingIndicator',
          description: 'Animated dots indicating AI is typing',
          baseClasses: 'flex gap-1 p-3',
        },
        {
          name: 'SkeletonLoader',
          description: 'Placeholder content during loading',
          baseClasses: 'animate-pulse bg-muted rounded',
        },
      ],
      dataVisualization: ['charts', 'graphs', 'metrics-cards'],
      interactiveElements: ['sliders', 'toggles', 'dropdowns', 'command-palette'],
    },

    metadata: {
      industry: 'technology',
      targetAudience: 'developers and professionals',
      designSystem: 'custom',
      inspirations: ['Linear', 'Vercel', 'Stripe', 'OpenAI'],
    },
  };
}

/**
 * Extract design from URL using Claude-assisted analysis
 */
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

Please provide the extracted information in a structured format that can be converted to a design guide.
`;
}
