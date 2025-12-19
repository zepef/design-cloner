# Design Preview Command

Preview a design guide without applying changes.

## Usage

```
/design-preview <design-guide-path>
```

## Arguments

- `design-guide-path` - Path to the design guide markdown file (required)

## What This Command Does

1. **Reads the design guide** from the specified markdown file
2. **Displays a summary** of the design system including:
   - Color palette visualization
   - Typography preview
   - Component examples
   - Spacing and layout patterns
3. **Shows potential changes** that would be made to the repository
4. **Does NOT modify any files** - purely informational

## Example

```
/design-preview ./design-guides/linear-style.md
```

## Instructions for Claude

When this command is invoked:

1. Parse the design guide path from: $ARGUMENTS

2. Read the design guide markdown file

3. Extract and display the following sections:

   a. **Design Philosophy**
   - Style and mood
   - Key principles

   b. **Color Palette**
   - Show colors with their hex values
   - Light mode and dark mode variants
   - Any gradients defined

   c. **Typography**
   - Font families
   - Size scale
   - Weight options

   d. **Component Styles**
   - List each component
   - Show base classes
   - Display variants

   e. **Effects**
   - Glassmorphism, glow effects, etc.
   - Animation presets

4. Analyze current repository:
   - Compare with existing styles
   - Highlight differences
   - Estimate scope of changes

5. Output format:
   - Use markdown tables for tokens
   - Use code blocks for CSS/Tailwind examples
   - Keep it concise and scannable

## Output Example

```markdown
# Design Preview: Linear Style

## Colors
| Token | Light | Dark |
|-------|-------|------|
| Primary | #5E6AD2 | #8A8FE5 |
| Background | #FFFFFF | #0A0A0A |

## Typography
- Heading: Inter
- Body: Inter
- Mono: JetBrains Mono

## Components (4)
- Button: 4 variants
- Card: 3 variants
- Input: focus/error states
- Badge: 4 status variants

## Changes Required
- Update globals.css: ~50 lines
- Generate 4 component files
- Extend Tailwind config
```
