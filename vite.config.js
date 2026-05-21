import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-entrypoint',
      transformIndexHtml(html) {
        return html.replace(
          '</body>',
          '<script type="module" src="/src/main.jsx"></script></body>'
        );
      }
    }
  ],
  base: '/Tool-Trove/'
})

