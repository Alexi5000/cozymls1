import { createRoot } from 'react-dom/client'
import { App } from "@/app"
import "@/index.css"

console.log('Starting app...');

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element not found!');
} else {
  console.log('Root element found, creating app...');
  createRoot(rootElement).render(<App />);
  console.log('App rendered!');
}
