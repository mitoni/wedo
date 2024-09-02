<script lang="ts">
	import {
		El,
		Card,
		Icon,
		TabContent,
		TabItem,
		Table,
		TableCell,
		TableHead,
		TableRow,
		TabList,
		TabPanel,
		Tabs,
		CardHeader,
		CardBody,
		Button
	} from 'yesvelte';

	import { page } from '$app/stores';

	const HEADERS = ['Description', 'Category', 'Listed', 'Available', 'Claimed'];
</script>

<El row justifyContent="between" py="2">
	<El col="auto" tag="h1">Listings</El>
	<El col="auto"
		><Button href={`/merchant/${$page.params.merchantId}/listings/add`} color="primary">
			<Icon name="plus" />Add</Button
		>
	</El>
</El>

<Card>
	<Tabs>
		<CardHeader>
			<TabList>
				<TabItem><Icon name="circle-check" />Active</TabItem>
				<TabItem><Icon name="circle-x" />Inactive</TabItem>
			</TabList>
		</CardHeader>

		<CardBody>
			<TabContent>
				<TabPanel>
					<Table border="0">
						<TableHead>
							<TableRow>
								{#each HEADERS as header}
									<TableCell>{header}</TableCell>
								{/each}
							</TableRow>
						</TableHead>
					</Table>
				</TabPanel>

				<TabPanel>
					<Table border="0">
						<TableHead>
							<TableRow>
								{#each HEADERS as header}
									<TableCell>{header}</TableCell>
								{/each}
							</TableRow>
						</TableHead>
					</Table>
				</TabPanel>
			</TabContent>
		</CardBody>
	</Tabs>
</Card>
