import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

import fs from "fs";

// Tentukan path ke sertifikat Laragon
const host = "laravel-inertia-test.dev"; // <-- Ganti dengan host Anda
const laragonCertPath = "D:/laragon-ent/etc/ssl/laragon.crt"; // <-- Sesuaikan path jika perlu
const laragonKeyPath = "D:/laragon-ent/etc/ssl/laragon.key"; // <-- Sesuaikan path jika perlu

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [
			laravel({
				input: "resources/js/app.tsx",
				refresh: true,
			}),
			react(),
		],
		server: {
			host,
			hmr: { host },
			https: {
				key: fs.readFileSync(laragonKeyPath),
				cert: fs.readFileSync(laragonCertPath),
			},
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		},
	};
});
