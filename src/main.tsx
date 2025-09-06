import { createRoot } from 'react-dom/client'
import { App } from "@/app"
import "@/index.css"

// Instant loading - no performance monitoring overhead

createRoot(document.getElementById("root")!).render(<App />);
