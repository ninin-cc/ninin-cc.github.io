# RIESM mini local assets

Runtime assets are served from this directory. The page no longer needs the
Tailwind Play CDN, cdnjs React, cdnjs ReactDOM, Babel Standalone at runtime, or
cdnjs html2canvas.

- `src/app.jsx`: editable React source
- `assets/app.js`: browser-ready compiled application
- `assets/tailwind.css`: static Tailwind CSS generated from the current page
- `assets/vendor/`: runtime libraries pinned to the previous versions
- `tools/babel.min.js`: build-only Babel 7.23.6
- `tools/tailwind-build/`: reproducible Tailwind CSS 3.4.17 build configuration

After editing `src/app.jsx`, run:

```powershell
node .\build-app.cjs
```

If new Tailwind utility class names are introduced, regenerate the stylesheet:

```powershell
cd .\tools\tailwind-build
pnpm install --frozen-lockfile
pnpm exec tailwindcss -c .\tailwind.config.cjs -i .\input.css -o ..\..\assets\tailwind.css --minify
```

Existing class names need no CSS rebuild. The build tools are not loaded by the
website and therefore do not affect the page at runtime.
