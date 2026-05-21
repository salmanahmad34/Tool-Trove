import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const action = process.argv[2];
const indexPath = path.resolve(__dirname, '../index.html');

if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf-8');
  if (action === 'inject') {
    if (!content.includes('/src/main.jsx')) {
      const modified = content.replace(
        '</body>',
        '<script type="module" src="/src/main.jsx"></script></body>'
      );
      fs.writeFileSync(indexPath, modified, 'utf-8');
      console.log('[Entrypoint] Injected /src/main.jsx into index.html');
    }
  } else if (action === 'restore') {
    if (content.includes('/src/main.jsx')) {
      const modified = content.replace(
        '<script type="module" src="/src/main.jsx"></script>',
        ''
      );
      fs.writeFileSync(indexPath, modified, 'utf-8');
      console.log('[Entrypoint] Restored index.html (removed /src/main.jsx)');
    }
  }
}
