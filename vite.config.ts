import vue from "@vitejs/plugin-vue"
import { resolve } from "node:path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        dts({
            include: ["lib"],
            exclude: ["lib/components"]
        })
    ],
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, "lib/index.ts"),
            // Name of the library.
            name: "vue-pincode",
            // We are building for CJS and ESM, use a function to rename automatically files.
            // Example: my-component-library.esm.js
            fileName: (format) => `${"vue-pincode"}.${format}.js`
        },
        rollupOptions: {
            // Vue is provided by the parent project, don't compile Vue source-code inside our library.
            external: ["vue"],
            output: { globals: { vue: "Vue" } }
        }
    }
})
