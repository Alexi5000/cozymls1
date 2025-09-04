import { createRoot } from 'react-dom/client'
import { App } from "@/app"
import "@/index.css"

// Only initialize minimal monitoring in development
if (process.env.NODE_ENV === 'development') {
  import('@/shared/lib/performance-fonts').then(({ monitorFontPerformance }) => {
    monitorFontPerformance();
  });
}

createRoot(document.getElementById("root")!).render(<App />);
