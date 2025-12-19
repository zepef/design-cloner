# Design Extract Command

Extract a design guide from a website URL and save it as a markdown file.

## Usage

```
/design-extract <url> [output-path]
```

## Arguments

- `url` - The website URL to extract design from (required)
- `output-path` - Optional path for the output markdown file (defaults to `./design-guides/<hostname>.md`)

## What This Command Does

1. **Fetches the target website** using WebFetch to analyze the page content
2. **Analyzes design elements** including:
   - Color palette (primary, secondary, accent, backgrounds)
   - Typography (fonts, sizes, weights, line heights)
   - Spacing system (margins, paddings, gaps)
   - Border radius values
   - Shadow definitions
   - Animation and transition patterns
   - Component patterns (buttons, cards, inputs)
3. **Generates a comprehensive design guide** in markdown format
4. **Saves the design guide** to the specified path

## Example

```
/design-extract https://linear.app
/design-extract https://vercel.com ./design-guides/vercel-style.md
```

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

4. Structure the findings into a DesignGuide object following the schema in `lib/types/design-guide.ts`

5. Generate markdown using the pattern in `lib/generator/markdown-generator.ts`

6. Create the output directory if needed (`design-guides/`)

7. Write the markdown file to the specified path

8. Report the extraction results including:
   - Number of colors extracted
   - Typography details
   - Number of components identified
   - File location

## Output Format

The generated design guide will include:
- Design philosophy and principles
- Color palette (light and dark mode)
- Typography system
- Spacing scale
- Border radius tokens
- Shadow definitions
- Animation presets
- Component style patterns
- CSS variables ready to copy
- Tailwind config extension
- Usage examples
