import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Use '/the-forgotten-frontier/' only when specifically targeting GitHub Pages
  // Everywhere else (Netlify, Vercel, local dev, preview), use standard root '/'
  const isGitHubPages = process.env.GITHUB_PAGES === 'true';
  const base = isGitHubPages ? '/the-forgotten-frontier/' : '/';

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      port: 5173,
      strictPort: true,
    },
    preview: {
      port: 5173,
      strictPort: true,
    }
  };
})
