<script>
	import Child from './Child.svelte';
	import Child2 from './Child2.svelte';
</script>

<Child class={$$hash} />
<Child2 />

<style>
	:global(.svelte-hash) {
		color: red;
	}
</style>
