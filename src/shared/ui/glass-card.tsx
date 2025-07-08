import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'divine' | 'floating' | 'hero';
  glow?: boolean;
  children: React.ReactNode;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', glow = false, children, ...props }, ref) => {
    const baseClasses = "relative overflow-hidden transition-all duration-700";
    
    const variants = {
      default: "bg-white/10 backdrop-filter backdrop-blur-xl border border-white/20 rounded-2xl shadow-glass",
      divine: "bg-gradient-to-br from-white/15 to-white/5 backdrop-filter backdrop-blur-3xl border border-white/30 rounded-3xl shadow-divine",
      floating: "bg-white/8 backdrop-filter backdrop-blur-2xl border border-white/15 rounded-xl shadow-floating hover:shadow-divine",
      hero: "bg-gradient-to-br from-white/20 to-white/10 backdrop-filter backdrop-blur-3xl border border-white/25 rounded-3xl shadow-luxury"
    };

    const glowClasses = glow ? "animate-divine-glow hover:animate-breathe" : "";
    
    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          glowClasses,
          "hover:scale-105 hover:border-white/40 hover:bg-white/20",
          className
        )}
        {...props}
      >
        {/* Divine gradient overlay */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-5 pointer-events-none transition-opacity duration-700 group-hover:opacity-10" />
        
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-inherit bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };