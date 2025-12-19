import { HTMLAttributes } from 'react';

interface ColorSwatchProps extends HTMLAttributes<HTMLDivElement> {
  color: string;
  name: string;
  showHex?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ColorSwatch({ color, name, showHex = true, size = 'md', className = '', ...props }: ColorSwatchProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`} {...props}>
      <div
        className={`${sizeClasses[size]} rounded-lg border border-border shadow-sm`}
        style={{ backgroundColor: color }}
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground capitalize">{name}</span>
        {showHex && <span className="text-xs text-muted-foreground font-mono">{color}</span>}
      </div>
    </div>
  );
}

interface ColorPaletteProps extends HTMLAttributes<HTMLDivElement> {
  colors: Record<string, string>;
  title?: string;
}

export function ColorPalette({ colors, title, className = '', ...props }: ColorPaletteProps) {
  return (
    <div className={className} {...props}>
      {title && <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Object.entries(colors).map(([name, color]) => (
          <ColorSwatch key={name} name={name} color={color} size="sm" />
        ))}
      </div>
    </div>
  );
}
