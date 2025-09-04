import { createRoot } from 'react-dom/client'
import { App } from "@/app"
import "@/index.css"
import { initializeBundleMonitoring } from '@/shared/lib/bundle-analyzer'
import { monitorFontPerformance } from '@/shared/lib/performance-fonts'

// Initialize performance monitoring
initializeBundleMonitoring();
monitorFontPerformance();

createRoot(document.getElementById("root")!).render(<App />);
