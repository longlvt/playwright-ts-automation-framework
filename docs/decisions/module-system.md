# Module System Decision: CommonJS vs ES Modules

## Decision

This project uses `"type": "commonjs"` in `package.json`.  
Config files (`.js`) use `require()` / `module.exports`. TypeScript source files use `import`/`export` as normal.

---

## Background

Node.js supports two module systems. The `"type"` field in `package.json` controls how Node.js interprets `.js` files.

### CommonJS (`"type": "commonjs"`)

```js
const playwright = require("eslint-plugin-playwright");
module.exports = { ... };
```

- Node.js default since the beginning
- Synchronous loading
- Used by most tooling config files (ESLint, Prettier, etc.)

### ES Modules (`"type": "module"`)

```js
import playwright from "eslint-plugin-playwright";
export default { ... };
```

- Modern standard, same syntax as TypeScript source
- Asynchronous loading
- Required by some newer packages that ship ESM-only

---

## Why CommonJS was chosen

1. **TypeScript compiles to CommonJS.** `tsconfig.json` has `"module": "Node16"`, which outputs `require()` calls. The `"type"` field must match what TypeScript emits, or Node.js will reject the compiled output.

2. **Tooling compatibility.** All config files in this project (`eslint.config.js`, `playwright.config.ts`) are resolved by Node.js at runtime. CommonJS has broader, more stable support across the tooling ecosystem.

3. **No practical benefit to switching.** ES module `import` syntax is available in `.ts` source files via TypeScript regardless of this setting. Switching `"type"` to `"module"` would only affect `.js` config files — not worth the migration risk.
