/**
 * Design Cloner Library
 *
 * A comprehensive system for extracting design guides from websites
 * and applying them to repositories using Claude AI assistance.
 */

// Types
export * from './types/design-guide';

// Extractor
export {
  extractDesignGuide,
  analyzeColorScheme,
  analyzeTypography,
  analyzeSpacing,
  analyzeBorderRadius,
  analyzeShadows,
  analyzeAnimations,
  analyzeLayouts,
  extractComponentStyles,
  generateExtractionPrompt,
} from './extractor/design-extractor';

// Generator
export {
  generateDesignGuideMarkdown,
  parseDesignGuideMarkdown,
} from './generator/markdown-generator';

// Applier
export {
  FILE_PATTERNS,
  generateCSSVariables,
  generateTailwindExtension,
  generateComponentTemplates,
  calculateDesignDiff,
  generateBranchName,
  generateApplicationPlan,
} from './applier/design-applier';

// CLI
export {
  extractCommand,
  applyCommand,
  previewCommand,
  listCommand,
  compareCommand,
  commands,
} from './cli/index';
