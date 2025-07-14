import { createRoot } from 'react-dom/client'
import { App } from "@/app"
import "@/index.css"
import { initializeBundleMonitoring } from '@/shared/lib/bundle-analyzer'

// Initialize performance monitoring
initializeBundleMonitoring();

createRoot(document.getElementById("root")!).render(<App />);
