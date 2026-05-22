import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if(file.endsWith('.js') || file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('./src');
let issues = [];

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const regex = /import\s+.*?\s+from\s+['"](.*?)['"]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        let importPath = match[1];
        if (importPath.startsWith('.')) {
            const dir = path.dirname(file);
            let targetPath = path.resolve(dir, importPath);
            
            let foundPath = targetPath;
            if (!fs.existsSync(targetPath)) {
                if (fs.existsSync(targetPath + '.js')) foundPath += '.js';
                else if (fs.existsSync(targetPath + '.jsx')) foundPath += '.jsx';
                else if (fs.existsSync(path.join(targetPath, 'index.js'))) foundPath = path.join(targetPath, 'index.js');
                else if (fs.existsSync(path.join(targetPath, 'index.jsx'))) foundPath = path.join(targetPath, 'index.jsx');
            }
            
            if (fs.existsSync(foundPath)) {
                const dirTarget = path.dirname(foundPath);
                const baseTarget = path.basename(foundPath);
                const actualFiles = fs.readdirSync(dirTarget);
                if (!actualFiles.includes(baseTarget)) {
                    issues.push(`Case mismatch in ${file}: imported '${importPath}'`);
                }
            } else {
                 issues.push(`File not found in ${file}: imported '${importPath}'`);
            }
        }
    }
});

if (issues.length > 0) {
    console.log("Issues found:");
    issues.forEach(i => console.log(i));
} else {
    console.log("No case mismatches or missing relative imports found.");
}
