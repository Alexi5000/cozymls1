import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";
import { Eye, EyeOff, Search, X } from "lucide-react";
import { MobileButton } from "./mobile-optimized-button";

const mobileInputVariants = cva(
  "mobile-input mobile-focus mobile-tap-highlight-none flex w-full rounded-md border border-input bg-background text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-10 px-3 py-2 text-sm",
        default: "h-11 px-3 py-2",
        lg: "h-12 px-4 py-3 text-base",
      },
      variant: {
        default: "border-input",
        filled: "bg-muted border-transparent",
        outlined: "border-2 border-input bg-transparent",
      }
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    }
  }
);

export interface MobileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof mobileInputVariants> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  label?: string;
  error?: string;
  helperText?: string;
}

const MobileInput = React.forwardRef<HTMLInputElement, MobileInputProps>(
  ({ 
    className, 
    type = "text",
    size = "default",
    variant = "default",
    startIcon,
    endIcon,
    clearable = false,
    onClear,
    label,
    error,
    helperText,
    value,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const hasValue = value !== undefined && value !== "";

    const handleClear = () => {
      onClear?.();
      if (props.onChange) {
        props.onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {startIcon}
            </div>
          )}
          
          <input
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              mobileInputVariants({ size, variant }),
              startIcon && "pl-10",
              (endIcon || clearable || isPassword) && "pr-10",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            ref={ref}
            value={value}
            {...props}
          />
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {clearable && hasValue && (
              <MobileButton
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0 hover:bg-transparent"
                onClick={handleClear}
                type="button"
                enableHaptic
              >
                <X className="h-4 w-4" />
              </MobileButton>
            )}
            
            {isPassword && (
              <MobileButton
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                enableHaptic
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </MobileButton>
            )}
            
            {endIcon && !clearable && !isPassword && (
              <div className="text-muted-foreground">
                {endIcon}
              </div>
            )}
          </div>
        </div>
        
        {(error || helperText) && (
          <p className={cn(
            "text-sm",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

MobileInput.displayName = "MobileInput";

// Search Input Component
interface MobileSearchInputProps extends Omit<MobileInputProps, "startIcon" | "type"> {
  onSearch?: (value: string) => void;
  searchDelay?: number;
}

const MobileSearchInput = React.forwardRef<HTMLInputElement, MobileSearchInputProps>(
  ({ onSearch, searchDelay = 300, ...props }, ref) => {
    const [searchValue, setSearchValue] = React.useState(props.value || "");
    const timeoutRef = React.useRef<NodeJS.Timeout>();

    React.useEffect(() => {
      if (onSearch) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          onSearch(searchValue as string);
        }, searchDelay);
      }
      
      return () => clearTimeout(timeoutRef.current);
    }, [searchValue, onSearch, searchDelay]);

    return (
      <MobileInput
        ref={ref}
        type="search"
        placeholder="Search..."
        startIcon={<Search className="h-4 w-4" />}
        clearable
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onClear={() => setSearchValue("")}
        {...props}
      />
    );
  }
);

MobileSearchInput.displayName = "MobileSearchInput";

export { MobileInput, MobileSearchInput, mobileInputVariants };