import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { useResponsiveBreakpoint } from "@/shared/hooks/use-responsive-breakpoint";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";

interface ResponsiveFormProps {
  children: React.ReactNode;
  className?: string;
  layout?: 'stacked' | 'inline' | 'grid';
}

export function ResponsiveForm({ children, className, layout = 'stacked' }: ResponsiveFormProps) {
  const { isMobile } = useResponsiveBreakpoint();
  
  const formClasses = cn(
    'space-y-4',
    layout === 'grid' && 'responsive-grid-2',
    layout === 'inline' && !isMobile && 'flex flex-wrap gap-4 items-end',
    isMobile && 'mobile-stack',
    className
  );

  return (
    <form className={formClasses}>
      {children}
    </form>
  );
}

interface ResponsiveFormFieldProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  required?: boolean;
  error?: string;
}

export function ResponsiveFormField({ 
  children, 
  className, 
  label, 
  required,
  error 
}: ResponsiveFormFieldProps) {
  const { isMobile } = useResponsiveBreakpoint();
  
  return (
    <div className={cn('space-y-2', isMobile && 'mobile-stack', className)}>
      {label && (
        <Label className={cn('responsive-body font-medium', required && 'after:content-["*"] after:text-destructive after:ml-1')}>
          {label}
        </Label>
      )}
      {children}
      {error && (
        <p className="text-destructive text-sm">{error}</p>
      )}
    </div>
  );
}

interface ResponsiveInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const ResponsiveInput = React.forwardRef<HTMLInputElement, ResponsiveInputProps>(
  ({ className, label, error, ...props }, ref) => {
    const { isMobile } = useResponsiveBreakpoint();
    
    const inputClasses = cn(
      'w-full',
      isMobile && 'mobile-input mobile-touch-target text-base',
      className
    );

    if (label) {
      return (
        <ResponsiveFormField label={label} error={error}>
          <Input ref={ref} className={inputClasses} {...props} />
        </ResponsiveFormField>
      );
    }

    return <Input ref={ref} className={inputClasses} {...props} />;
  }
);

ResponsiveInput.displayName = "ResponsiveInput";

interface ResponsiveButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical' | 'responsive';
  className?: string;
}

export function ResponsiveButtonGroup({ 
  children, 
  orientation = 'responsive',
  className 
}: ResponsiveButtonGroupProps) {
  const { isMobile } = useResponsiveBreakpoint();
  
  const groupClasses = cn(
    'flex gap-3',
    orientation === 'vertical' || (orientation === 'responsive' && isMobile) 
      ? 'flex-col' 
      : 'flex-row flex-wrap',
    className
  );

  return (
    <div className={groupClasses}>
      {children}
    </div>
  );
}