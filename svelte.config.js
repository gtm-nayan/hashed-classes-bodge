// @ts-check

import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

function hash(str) {
	let hash = 5381,
		i = str.length;

	while (i) hash = (hash * 33) ^ str.charCodeAt(--i);

	return hash >>> 0;
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		/**
		 * @type {import('svelte/types/compiler/preprocess').PreprocessorGroup}
		 */ ({
			markup({ content }) {
				const hashed_class = 'bodge_' + hash(content).toString(36);
				return {
					code: content
						.replaceAll('.svelte-hash', `.${hashed_class}`.repeat(3))
						.replaceAll('$$hash', JSON.stringify(hashed_class))
				};
			}
		})
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
