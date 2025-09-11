import { createRoot } from 'react-dom/client'
import { App } from "@/app"
import "@/index.css"
import { instantRender } from './shared/lib/instant-render'

// Initialize instant rendering for preview performance
instantRender.disableAnimations();

// Instant loading - no performance monitoring overhead

createRoot(document.getElementById("root")!).render(<App />);
