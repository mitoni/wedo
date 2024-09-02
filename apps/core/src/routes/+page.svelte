<script lang="ts">
	import {
		PUBLIC_GOOGLE_MAPS_API_KEY,
		PUBLIC_GOOGLE_MAPS_MAP_ID,
		PUBLIC_APP_NAME
	} from '$env/static/public';
	import { onMount } from 'svelte';
	import { El, Avatar, Autocomplete, Input, Badge, Label } from 'yesvelte';

	// let marker: google.maps.marker.AdvancedMarkerElement;
	// let geocoder: google.maps.Geocoder;
	let map: google.maps.Map;

	onMount(async () => {
		const { Map } = await window.google.maps.importLibrary('maps');
		const { Geocoder } = await window.google.maps.importLibrary('geocoding');
		const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker');

		const mapId = PUBLIC_GOOGLE_MAPS_MAP_ID;

		let lat = 37.494656;
		let lng = -120.846596;

		map = new Map(document.getElementById('map-container') as HTMLElement, {
			center: { lat, lng },
			zoom: 13,
			disableDefaultUI: true,
			mapId
		});

		// geocoder = new Geocoder();
		// marker = new AdvancedMarkerElement();

		// add random markers around center
		for (let i = 0; i < 5; i++) {
			const marker = new google.maps.marker.AdvancedMarkerElement();
			marker.map = map;
			marker.position = {
				lat: lat + Math.random() / 10 - 0.05,
				lng: lng + Math.random() / 10 - 0.05
			};
		}
	});

	const farms = [
		{ name: 'Morning Star Farm', address: '1360 Flaming Ave', products: ['Straw'] },
		{ name: 'Dutch Hollow Farms', address: '2500 Santa Fe Ave', products: ['Straw', 'Bamboo'] },
		{ name: 'Copper Penny Farms', address: '1919 7th St', products: ['Straw', 'Flax'] },
		{ name: 'C&G Farms LLC', address: '21602 Carrolton Ave', products: ['Straw', 'Bamboo'] },
		{ name: 'Speer Family Farms', address: '2829 Ford St', products: ['Straw'] }
	];
</script>

<svelte:head>
	<script
		src={`https://maps.googleapis.com/maps/api/js?key=${PUBLIC_GOOGLE_MAPS_API_KEY}&loading=async&libraries=places`}
	></script>
</svelte:head>

<section class="page-wrapper">
	<div class="navbar-container">
		<nav>
			<El fontSize="3" fontWeight="semibold" textColor="green">{PUBLIC_APP_NAME}</El>
			<div class="search-container">
				<Autocomplete placeholder="Search by category" />
				<Input placeholder="or by name" />
			</div>
			<div><Avatar shape="pill">OC</Avatar></div>
		</nav>
	</div>
	<div class="content-container">
		<div class="sidebar">
			{#each farms as farm}
				<div class="place-container">
					<El tag="h2" textColor="primary">{farm.name}</El>
					<El tag="p">{farm.address}</El>
					<Label fontSize="5">Products</Label>
					{#each farm.products as product}
						<Badge ghost color="green">{product}</Badge>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>

<div id="map-container" />

<style>
	.place-container {
		margin-bottom: var(--y-spacer-5);
		padding: var(--y-spacer-2);
		border-radius: var(--y-border-radius-xl);

		cursor: pointer;

		&:hover {
			outline: 1px solid var(--y-green);
		}
	}

	.search-container {
		display: flex;
		gap: var(--y-spacer-1);
	}

	.sidebar {
		pointer-events: auto;
		background-color: rgba(var(--y-white-rgb), 0.75);
		padding: var(--y-spacer-2);
		border-radius: var(--y-border-radius-xl);
		backdrop-filter: var(--blur);
		width: 300px;
		resize: horizontal;
		border: 1px solid var(--y-white);
	}

	.page-wrapper {
		position: relative;
		z-index: 9;

		height: 100vh;
		max-width: 1440px;
		margin: 0 auto;

		display: flex;
		flex-direction: column;
		justify-content: start;

		pointer-events: none;
	}

	.content-container {
		flex-grow: 1;
		display: flex;
		padding: var(--y-page-padding);
	}

	.navbar-container {
		padding: var(--y-page-padding);
		pointer-events: auto;
		height: 100px;
	}

	nav {
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		padding: var(--y-spacer-3);

		background-color: rgba(var(--y-white-rgb), 0.75);
		border: 1px solid var(--y-white);
		border-radius: var(--y-border-radius-xl);

		backdrop-filter: var(--blur);
	}

	#map-container {
		position: absolute;
		inset: 0;
		z-index: 1;
	}
</style>
