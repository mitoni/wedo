<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { El, Button, Icon } from 'yesvelte';
	import { page } from '$app/stores';
</script>

<section>
	<div class="sidebar-container">
		<div class="sidebar-upper">
			<El fontSize="3" fontWeight="semibold" textColor="green" py="4">{PUBLIC_APP_NAME}</El>

			<div class="sidebar-buttons">
				<Button
					ghost
					href={`/merchant/${$page.params.merchantId}/listings`}
					size="sm"
					color="primary"
					justifyContent="start"
				>
					<Icon name="list-details" />
					Listings</Button
				>

				<Button
					ghost
					href={`/merchant/${$page.params.merchantId}/requests`}
					size="sm"
					color="primary"
					justifyContent="start"
				>
					<Icon name="shopping-bag" />
					Requests</Button
				>
			</div>
		</div>

		<div class="sidebar-lower">
			<Button
				ghost
				href={`/merchant/${$page.params.merchantId}/account`}
				size="sm"
				color="green"
				justifyContent="start"
			>
				<Icon name="user" />
				Account</Button
			>
		</div>
	</div>
	<div class="content-container">
		<slot />
	</div>
</section>

<style>
	section {
		max-width: 1440px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		min-height: 100vh;
	}

	.sidebar-container {
		position: sticky;
		top: var(--y-page-padding);
		width: 250px;
		height: calc(100vh - 2 * var(--y-page-padding));
		box-sizing: border-box;
		margin: var(--y-page-padding);
		padding: var(--y-spacer-3) var(--y-spacer-3);
		gap: var(--y-spacer-3);

		display: flex;
		flex-direction: column;
		justify-content: space-between;

		background-color: var(--y-green-lt);

		border-color: rgba(var(--y-green-rgb), 0.75);
		border-radius: var(--y-border-radius-xl);
		border-style: solid;
		border-width: 1px;
	}

	.content-container {
		flex: 1;
		padding: var(--y-page-padding);
	}

	.sidebar-upper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		gap: var(--y-spacer-3);

		flex-grow: 1;
	}

	.sidebar-lower {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.sidebar-buttons {
		display: flex;
		flex-direction: column;

		gap: var(--y-spacer-3);
	}
</style>
