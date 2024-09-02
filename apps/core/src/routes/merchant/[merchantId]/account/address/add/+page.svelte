<script lang="ts">
	import { PUBLIC_GOOGLE_MAPS_API_KEY, PUBLIC_GOOGLE_MAPS_MAP_ID } from '$env/static/public';
	import { onMount } from 'svelte';
	import { Alert, Button, El, FormAutocomplete, FormTextarea } from 'yesvelte';
	import { superForm } from 'sveltekit-superforms';
	import { debounce } from '@wedo/utils-js';

	let formEl: unknown;
	let items: unknown[] = [];

	let autocomplete: google.maps.places.AutocompleteService;
	let geocoder: google.maps.Geocoder;
	let marker: google.maps.marker.AdvancedMarkerElement;
	let map: google.maps.Map;

	onMount(async () => {
		const { Map } = await window.google.maps.importLibrary('maps');
		const { Geocoder } = await window.google.maps.importLibrary('geocoding');
		const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker');

		const mapId = PUBLIC_GOOGLE_MAPS_MAP_ID;

		let lat = 37.4239163;
		let lng = -122.0947209;

		map = new Map(document.getElementById('map-container') as HTMLElement, {
			center: { lat, lng },
			zoom: 14,
			disableDefaultUI: true,
			mapId
		});

		autocomplete = new window.google.maps.places.AutocompleteService();
		geocoder = new Geocoder();
		marker = new AdvancedMarkerElement();
	});

	function handleInput(e: CustomEvent) {
		const input = e.detail;
		autocomplete.getPlacePredictions({ input, types: ['geocode'] }, (predictions) => {
			if (predictions) {
				items = predictions;
			}
		});
	}

	function handleChange(e: CustomEvent) {
		const place = e.detail;
		const { place_id: placeId } = place;

		geocoder.geocode({ placeId }, (results) => {
			const place = results?.[0];

			if (place) {
				const lat = place.geometry.location.lat();
				const lng = place.geometry.location.lng();
				const placeId = place.place_id;

				$form.address = place.formatted_address;
				$form.place_id = placeId;
				$form.lat = lat;
				$form.lng = lng;

				const position = { lat, lng };

				marker.map = map;
				marker.position = position;

				map.setCenter(position);
			}
		});
	}

	const debouncedHandleInput = debounce(handleInput);

	export let data;
	const { form, errors, message, enhance } = superForm(data.form);

	$: renderErrors = (name: keyof typeof $errors) => {
		return {
			hint: $errors[name],
			state: $errors[name] ? 'invalid' : undefined
		} as any;
	};
</script>

<svelte:head>
	<script
		src={`https://maps.googleapis.com/maps/api/js?key=${PUBLIC_GOOGLE_MAPS_API_KEY}&loading=async&libraries=places`}
	></script>
</svelte:head>

<El tag="h1">New Address</El>

<form method="POST" use:enhance bind:this={formEl}>
	<input hidden name="address" bind:value={$form.address} />
	<input hidden name="lat" bind:value={$form.lat} />
	<input hidden name="lng" bind:value={$form.lng} />

	<El row>
		<FormAutocomplete
			label="Address"
			placeholder="Enter an address"
			autofocus
			{items}
			on:input={debouncedHandleInput}
			on:changed={handleChange}
			let:item
			{...renderErrors('address')}
		>
			{item.description}
		</FormAutocomplete>

		<FormTextarea label="Instructions" name="instructions" bind:value={$form.instructions} />
	</El>

	<Button type="submit" color="primary">Add</Button>
</form>

{#if $message}
	<Alert my="3" color="success" title="Success!">{$message}</Alert>
{/if}

<div id="map-container" />

<style>
	#map-container {
		width: 100%;
		height: 500px;

		margin: var(--y-spacer-3) 0;
		border-radius: var(--y-border-radius);
	}
</style>
