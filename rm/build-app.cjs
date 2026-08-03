const fs = require('node:fs');
const path = require('node:path');
const Babel = require('./tools/babel.min.js');

const root = __dirname;
const sourcePath = path.join(root, 'src', 'app.jsx');
const outputPath = path.join(root, 'assets', 'app.js');
const source = fs.readFileSync(sourcePath, 'utf8');
const result = Babel.transform(source, {
  presets: ['react'],
  sourceMaps: false,
  compact: false,
  comments: true
});

fs.writeFileSync(outputPath, `${result.code}\n`, 'utf8');
console.log(`Built ${path.relative(root, outputPath)}`);

