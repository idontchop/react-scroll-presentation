import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { readFileSync } from "node:fs";

const packageJson = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

const external = ["react", "react-dom", "styled-components"]

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                interop: "auto",
                sourcemap: true
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve({ extensions: [".mjs", ".js", ".json", ".ts", ".tsx"] }),
            commonjs( {include: /node__modules/ }),
            esbuild({ tsconfig: "./tsconfig.json", target: "es2020" }),
            terser(),
        ],
        external
    },
    {
        // TypeScript 7 has no compiler API; rollup-plugin-dts uses @typescript/typescript6.
        input: "src/index.ts",
        output: { file: packageJson.types, format: "esm" },
        plugins: [dts()],
        external
    }
];