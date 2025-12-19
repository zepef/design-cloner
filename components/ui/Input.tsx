import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className = '', ...props }, ref) => {
    const baseClasses = 'w-full rounded-lg border bg-background px-4 py-2.5 text-foreground text-sm transition-colors placeholder:text-muted-foreground';
    const stateClasses = error
      ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
      : 'border-border hover:border-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/20';

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`${baseClasses} ${stateClasses} ${icon ? 'pl-10' : ''} ${className} outline-none`}
            {...props}
          />
        </div>
        {error && <span className="text-sm text-error">{error}</span>}
        {hint && !error && <span className="text-sm text-muted-foreground">{hint}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', ...props }, ref) => {
    const baseClasses = 'w-full rounded-lg border bg-background px-4 py-3 text-foreground text-sm transition-colors placeholder:text-muted-foreground resize-none';
    const stateClasses = error
      ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
      : 'border-border hover:border-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/20';

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`${baseClasses} ${stateClasses} ${className} outline-none`}
          {...props}
        />
        {error && <span className="text-sm text-error">{error}</span>}
        {hint && !error && <span className="text-sm text-muted-foreground">{hint}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
