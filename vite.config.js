import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-entrypoint',
      transformIndexHtml(html, ctx) {
        // For development server, inject entrypoint dynamically into HTML stream
        if (ctx.server) {
          return html.replace(
            '</body>',
            '<script type="module" src="/src/main.jsx"></script></body>'
          );
        }
        return html;
      }
    }
  ],
  base: '/Tool-Trove/'
})



