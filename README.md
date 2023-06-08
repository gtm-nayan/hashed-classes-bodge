A really hacky way to get cross-component scoped CSS in Svelte. The work happens in a preprocessor inside svelte.config.js.

It essentially just replaces all instances of `.svelte-hash` with a class `.bodge_abcxyz` where `abcxyz` is a hash of the component's contents. The scoping class will be repeated thrice to increase specificity so that it can override any styles set by the CSS within the child. This may be addressed in the future through once svelte starts using :where or @scope.

We also need to add a :global() selector because otherwise the styles will be purged. This could potentially be addressed by a using a separate style block for these styles and then the preprocessor could add the global automatically, but icba.

Add $$hash to app.d.ts to prevent typescript errors.

See also https://github.com/sveltejs/svelte/issues/6972
