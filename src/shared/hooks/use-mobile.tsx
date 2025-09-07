import * as React from "react"

const MOBILE_BREAKPOINT = 768

// Simplified mobile detection for instant loading
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Initialize immediately without delay
    return typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false;
  });

  React.useEffect(() => {
    const checkIsMobile = () => window.innerWidth < MOBILE_BREAKPOINT;
    
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    // Use basic resize listener for instant performance
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}