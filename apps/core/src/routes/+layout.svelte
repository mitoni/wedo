<script lang="ts">
	import overrides from '../styles/overrides.css?url';
	import tabler from 'yesvelte/css/tabler.min.css?url';
</script>

<svelte:head>
	<link rel="stylesheet" href={tabler} />
	<link rel="stylesheet" href={overrides} />
</svelte:head>

<main>
	<slot />
</main>
