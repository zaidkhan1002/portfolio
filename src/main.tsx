import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyThemeClass, getStoredTheme, resolveTheme } from './theme'

// Apply theme before first paint to avoid a flash
applyThemeClass(resolveTheme(getStoredTheme() ?? 'system'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
