<script lang="ts">
	import { PUBLIC_GOOGLE_MAPS_API_KEY, PUBLIC_GOOGLE_MAPS_MAP_ID } from '$env/static/public';
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	import { El, FormTextarea, FormAutocomplete, Button, FormInput } from 'yesvelte';

	export let data;

	const { form, errors, enhance } = superForm(data.form);

	$: renderErrors = (name: keyof typeof $errors) => {
		return {
			hint: $errors[name],
			state: $errors[name] ? 'invalid' : undefined
		} as any;
	};

	const units = [
		{ id: 'g', label: 'grams' },
		{ id: 'kg', label: 'kilograms' }
	];

	let mapContainerEl: any;
	let mapSrc: string;

	onMount(() => {
		const { width, height } = mapContainerEl.getBoundingClientRect();
		const center = '37.4239163,-122.0947209';
		mapSrc = encodeURI(
			`https://maps.googleapis.com/maps/api/staticmap?key=${PUBLIC_GOOGLE_MAPS_API_KEY}&map_id=${PUBLIC_GOOGLE_MAPS_MAP_ID}&center=${center}&markers=${center}&zoom=14&size=${width}x${height}&scale=2`
		);
	});
</script>

<El row justifyContent="between" py="2">
	<El col="auto" tag="h1">Add Listing</El>
</El>

<form method="POST" use:enhance>
	<El tag="h2">Material description</El>

	<El row>
		<FormAutocomplete
			label="Category"
			name="category"
			bind:value={$form.category}
			col="6"
			{...renderErrors('category')}
		/>

		<El col="6"></El>

		<FormTextarea
			label="Description"
			name="description"
			bind:value={$form.description}
			{...renderErrors('description')}
		/>
	</El>

	<El tag="h2">Quantities</El>

	<El row>
		<FormInput
			label="Quantity available"
			name="quantity"
			type="number"
			bind:value={$form.quantity}
			col="6"
			{...renderErrors('quantity')}
		/>

		<FormAutocomplete
			label="Unit"
			name="unit"
			items={units}
			bind:value={$form.unit}
			col="6"
			{...renderErrors('unit')}
			let:item
		>
			{item.label}
		</FormAutocomplete>
	</El>

	<Button type="submit" color="primary">Add</Button>

	<El tag="h2" mt="3">Location</El>

	<El row bind:element={mapContainerEl} class="map-container">
		{#if mapSrc}
			<img alt="map" class="map" src={mapSrc} />
		{/if}
	</El>
</form>

<style>
	:global(.map-container) {
		width: 100%;
		height: 500px;
	}

	.map {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
