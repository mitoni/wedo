<script lang="ts">
	import { El, Icon, Button } from 'yesvelte';
	import { page } from '$app/stores';
</script>

<El>
	<El col="auto" tag="h1">Account</El>
</El>

<El>
	<El col="auto" tag="h2">Info</El>
</El>

<El row justifyContent="between">
	<El col="auto" tag="h2">Address and Location</El>
	<El col="auto"
		><Button href={`/merchant/${$page.params.merchantId}/account/address/add`} color="primary">
			<Icon name="plus" />Add</Button
		>
	</El>
</El>
