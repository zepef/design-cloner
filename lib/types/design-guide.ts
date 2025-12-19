/**
 * Design Guide Type Definitions
 * Core types for the design cloning system
 */

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  success?: string;
  warning?: string;
  error?: string;
  gradients?: GradientDefinition[];
}

export interface GradientDefinition {
  name: string;
  type: 'linear' | 'radial' | 'conic';
  direction?: string;
  stops: { color: string; position: string }[];
}

export interface Typography {
  fontFamily: {
    heading: string;
    body: string;
    mono: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
  fontWeights: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
  lineHeights: {
    tight: string;
    normal: string;
    relaxed: string;
    loose: string;
  };
  letterSpacing: {
    tight: string;
    normal: string;
    wide: string;
  };
}

export interface Spacing {
  unit: string;
  scale: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  containerMaxWidth: string;
  sectionPadding: string;
}

export interface BorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface Shadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  glow?: string;
  inner?: string;
}

export interface Animation {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    default: string;
    in: string;
    out: string;
    inOut: string;
    bounce?: string;
  };
  transitions: TransitionDefinition[];
}

export interface TransitionDefinition {
  name: string;
  property: string;
  duration: string;
  easing: string;
}

export interface LayoutPattern {
  type: 'grid' | 'flex' | 'bento' | 'masonry' | 'asymmetric';
  columns?: number | string;
  gap: string;
  description: string;
}

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

export interface DesignGuide {
  name: string;
  version: string;
  sourceUrl?: string;
  extractedAt: string;
  description: string;

  // Design Philosophy
  philosophy: {
    style: string; // e.g., "minimalist", "brutalist", "organic", "futuristic"
    mood: string; // e.g., "professional", "playful", "elegant", "bold"
    principles: string[];
  };

  // Core Design Tokens
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };

  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  animation: Animation;

  // Layout
  layouts: LayoutPattern[];
  breakpoints: Record<string, string>;

  // Component Styles
  components: ComponentStyle[];

  // Special Effects
  effects?: {
    glassmorphism?: boolean;
    neumorphism?: boolean;
    gradientText?: boolean;
    glowEffects?: boolean;
    animations?: string[];
  };

  // AI-Specific Design Elements
  aiElements?: {
    chatInterface?: ComponentStyle;
    loadingStates?: ComponentStyle[];
    dataVisualization?: string[];
    interactiveElements?: string[];
  };

  // Metadata
  metadata?: {
    industry?: string;
    targetAudience?: string;
    designSystem?: string;
    inspirations?: string[];
  };
}

export interface ExtractionOptions {
  url: string;
  includeScreenshots?: boolean;
  analyzeAnimations?: boolean;
  extractComponents?: boolean;
  depth?: 'shallow' | 'medium' | 'deep';
}

export interface ApplicationOptions {
  designGuidePath: string;
  targetRepo: string;
  branchName: string;
  preserveStructure?: boolean;
  generateComponents?: boolean;
  includeDocumentation?: boolean;
}

export interface DesignDiff {
  property: string;
  before: string;
  after: string;
  impact: 'low' | 'medium' | 'high';
}
