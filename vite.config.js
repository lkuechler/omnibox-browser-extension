import { defineConfig } from "vite";
import { resolve } from "path";
import { copyFileSync, cpSync } from "fs";

export default defineConfig({
	build: {
		outDir: "dist",
		emptyOutDir: true,
		rollupOptions: {
			input: {
				background: "./background.js",
				popup: "./popup.html",
			},
			output: {
				entryFileNames: "[name].js",
				chunkFileNames: "chunks/[name]-[hash].js",
				assetFileNames: "assets/[name]-[hash][extname]",
			},
		},
	},
	plugins: [
		{
			name: "copy-manifest",
			closeBundle() {
				copyFileSync(
					resolve(__dirname, "manifest.json"),
					resolve(__dirname, "dist/manifest.json"),
				);
			},
		},
		{
			name: "copy-license",
			closeBundle() {
				copyFileSync(
					resolve(__dirname, "LICENSE"),
					resolve(__dirname, "dist/LICENSE"),
				);
			},
		},
		{
			name: "copy-logo-folder",
			closeBundle() {
				cpSync(resolve(__dirname, "logo"), resolve(__dirname, "dist/logo"), {
					recursive: true,
				});
			},
		},
	],
});
