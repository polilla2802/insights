import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	define: {
		'process.env.VITE_FIREBASE_API_KEY': JSON.stringify(process.env.VITE_FIREBASE_API_KEY),
		'process.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.VITE_FIREBASE_AUTH_DOMAIN),
		'process.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify(process.env.VITE_FIREBASE_PROJECT_ID),
		'process.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify(
			process.env.VITE_FIREBASE_STORAGE_BUCKET
		),
		'process.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
			process.env.VITE_FIREBASE_MESSAGING_SENDER_ID
		),
		'process.env.VITE_FIREBASE_APP_ID': JSON.stringify(process.env.VITE_FIREBASE_APP_ID)
	},
	plugins: [tailwindcss(), sveltekit()],
	server: {
		port: Number(process.env.VITE_PORT) || 5173
	},
	preview: {
		port: Number(process.env.VITE_PORT) || 4173
	}
});
