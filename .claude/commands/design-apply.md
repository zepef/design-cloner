# Design Apply Command

Apply a design guide to the current repository, creating a new styled branch.

## Usage

```
/design-apply <design-guide-path> [branch-name]
```

## Arguments

- `design-guide-path` - Path to the design guide markdown file (required)
- `branch-name` - Optional branch name for the restyled version (defaults to `restyle/<guide-name>-<date>`)

## What This Command Does

1. **Reads the design guide** from the specified markdown file
2. **Creates a new git branch** for the restyled version
3. **Updates styling files**:
   - `app/globals.css` - CSS custom properties and base styles
   - Tailwind config - Extended theme values
   - Component files - Apply new styling patterns
4. **Generates UI components** based on the design guide patterns
5. **Commits changes** with a descriptive message
6. **Reports the changes** made to the repository

## Example

```
/design-apply ./design-guides/linear-style.md
/design-apply ./design-guides/vercel-style.md restyle/vercel-theme
```

## Instructions for Claude

When this command is invoked:

1. Parse arguments from: $ARGUMENTS
   - Extract design guide path
   - Extract optional branch name

2. Read and parse the design guide markdown file

3. Create a new git branch:
   ```bash
   git checkout -b <branch-name>
   ```

4. Generate and update files:

   a. **Update `app/globals.css`**:
      - Add CSS custom properties from the design guide
      - Include base styles for typography, colors, and animations
      - Ensure dark mode support

   b. **Create/Update `lib/design-theme.ts`**:
      - Export Tailwind theme extension
      - Include all design tokens

   c. **Generate components in `components/ui/`**:
      - Button.tsx
      - Card.tsx
      - Input.tsx
      - Badge.tsx
      - (others as defined in the guide)

5. Commit changes:
   ```bash
   git add .
   git commit -m "Apply design guide: <guide-name>"
   ```

6. Report results:
   - Files created/modified
   - Branch name
   - Next steps for the user

## File Locations

- CSS Variables: `app/globals.css`
- Theme Extension: `lib/design-theme.ts`
- UI Components: `components/ui/`
- Design Guide: `design-guides/`

## Notes

- The command preserves existing functionality while updating styling
- Components are generated with TypeScript and proper type definitions
- Dark mode is automatically included
- All changes are isolated to the new branch
