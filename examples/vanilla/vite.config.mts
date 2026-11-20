import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const repoRoot = fileURLToPath(new URL('../..', import.meta.url))
const core = (file: string) => fileURLToPath(new URL(`../../packages/core/src/${file}`, import.meta.url))

// Points the package name at the planned core source (MODERNIZATION_STEPS.md, Phase 5).
// Until that source exists, this example fails to load: the expected first "red" step.
export default defineConfig({
    resolve: {
        alias: [
            { find: /^@scroll-presentation\/core\/styles\.css$/, replacement: core('styles.css') },
            { find: /^@scroll-presentation\/core$/, replacement: core('index.ts') },
        ],
    },
    server: {
        fs: { allow: [repoRoot] },
    },
})
