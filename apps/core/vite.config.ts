import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	server: {
		host: '127.0.0.1',
		port: 4010
	},

	resolve: {
		alias: {
			'@wedo/utils-js': path.join(__dirname, '../../', 'packages/utils-js/src/index.ts')
		}
	}
});
