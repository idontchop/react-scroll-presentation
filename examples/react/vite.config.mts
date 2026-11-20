import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoRoot = fileURLToPath(new URL('../..', import.meta.url))

// Default mode imports the library source for instant reloads.
// `--mode dist` imports the Rollup output instead, the way an app installing the package would.
export default defineConfig(({ mode }) => ({
    plugins: [react()],
    resolve: {
        alias: {
            'react-scroll-presentation': fileURLToPath(new URL(
                mode === 'dist' ? '../../dist/esm/index.js' : '../../src/index.ts',
                import.meta.url)),
        },
    },
    server: {
        fs: { allow: [repoRoot] },
    },
}))
