import fs from 'fs';
import path from 'path';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const deps = Object.keys(pkg.dependencies || {});
const devDeps = Object.keys(pkg.devDependencies || {});
const allDeps = [...deps, ...devDeps];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.js') || file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('./src');
let issues = [];
const builtin = ['fs', 'path', 'crypto', 'os', 'child_process', 'buffer'];

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const regex = /import\s+.*?\s+from\s+['"](.*?)['"]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        let importPath = match[1];
        if (!importPath.startsWith('.')) {
            // external module
            const pkgName = importPath.startsWith('@') ? importPath.split('/').slice(0, 2).join('/') : importPath.split('/')[0];
            if (!allDeps.includes(pkgName) && !builtin.includes(pkgName)) {
                issues.push(`Unlisted dependency in ${file}: imported '${importPath}' (parsed as '${pkgName}')`);
            }
        }
    }
});

if (issues.length > 0) {
    console.log("Issues found:");
    issues.forEach(i => console.log(i));
} else {
    console.log("All external imports are listed in package.json.");
}
