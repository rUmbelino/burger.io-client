import { defineConfig } from 'cypress';

export default defineConfig({
	env: {
		apiUrl: 'https://virtserver.swaggerhub.com/UMBELINO12897/burg.io/1.0.1',
	},
	e2e: {
		baseUrl: 'http://localhost:3000',
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
