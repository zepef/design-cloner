# Design Restyle Command

Restyle a specific component or file using the active design guide.

## Usage

```
/design-restyle <file-path> [design-guide-path]
```

## Arguments

- `file-path` - Path to the component or file to restyle (required)
- `design-guide-path` - Optional path to design guide (defaults to `./design-guides/active.md`)

## What This Command Does

1. **Reads the target file** and analyzes its current styling
2. **Loads the design guide** to understand the target style
3. **Transforms the styling** to match the design guide:
   - Updates Tailwind classes
   - Adjusts color references
   - Applies typography patterns
   - Updates spacing values
4. **Preserves functionality** while updating visual appearance
5. **Shows a diff** of the changes made

## Example

```
/design-restyle ./components/Header.tsx
/design-restyle ./app/page.tsx ./design-guides/vercel-style.md
```

## Instructions for Claude

When this command is invoked:

1. Parse arguments from: $ARGUMENTS
   - Extract file path
   - Extract optional design guide path

2. Read the target file and analyze:
   - Current Tailwind classes used
   - Inline styles
   - Color values
   - Typography settings
   - Spacing values

3. Load the design guide and extract:
   - Color mappings
   - Typography tokens
   - Component patterns
   - Spacing scale

4. Transform the file:

   a. **Color Updates**:
   ```
   bg-blue-500 → bg-primary
   text-gray-900 → text-foreground
   border-gray-200 → border-border
   ```

   b. **Typography Updates**:
   ```
   font-sans → font-body
   text-xl font-bold → text-xl font-heading
   ```

   c. **Spacing Updates**:
   ```
   p-4 → p-md
   gap-6 → gap-lg
   ```

   d. **Component Patterns**:
   - Apply base classes from design guide
   - Use variant patterns
   - Add state classes

5. Show changes:
   - Display before/after diff
   - Highlight key transformations
   - List any manual adjustments needed

6. Write the updated file

## Mapping Examples

### Color Mappings
| Original | Design Guide |
|----------|--------------|
| blue-500, indigo-600 | primary |
| purple-500, violet-600 | secondary |
| cyan-500, teal-500 | accent |
| white | background |
| gray-900, slate-900 | foreground |
| gray-100, slate-100 | muted |
| gray-200, slate-200 | border |

### Component Patterns
When restyling a button, apply the full pattern:
```tsx
// Before
<button className="px-4 py-2 bg-blue-500 text-white rounded-md">

// After (using design guide)
<button className="inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-all duration-200 bg-primary text-white hover:bg-primary/90">
```

## Notes

- Always preserve functionality (onClick handlers, props, etc.)
- Keep accessibility attributes intact
- Maintain component structure
- Only update styling-related code
