import { ReactNode } from 'react';
import { useAppFonts } from "@/shared/hooks/use-font-loading";
import { cn } from "@/shared/lib/utils";

interface FontLoaderProps {
  children: ReactNode;
  fallbackClassName?: string;
  className?: string;
}

export const FontLoader = ({ 
  children, 
  fallbackClassName = 'font-sans', 
  className 
}: FontLoaderProps) => {
  const { loaded, loading } = useAppFonts();

  return (
    <div 
      className={cn(
        'transition-opacity duration-300',
        loading && 'opacity-90',
        !loaded && fallbackClassName,
        className
      )}
    >
      {children}
    </div>
  );
};

// Specialized font loader components
export const DisplayText = ({ 
  children, 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLElement>) => {
  const { loaded } = useAppFonts();
  
  return (
    <span 
      className={cn(
        'transition-all duration-300',
        loaded ? 'font-display' : 'font-serif',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export const BodyText = ({ 
  children, 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLElement>) => {
  const { loaded } = useAppFonts();
  
  return (
    <span 
      className={cn(
        'transition-all duration-300',
        loaded ? 'font-body' : 'font-sans',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};