<script lang="ts">
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	import { ChartPieSolid, GridSolid, MailBoxSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import type { LayoutData } from './$types';

	let spanClass = 'flex-1 ms-3 whitespace-nowrap';

	let { children, data } = $props();

	let activeUrl: string = $state('');

	$effect(() => {
		activeUrl = $page.url.pathname;
	});
</script>

<div class="flex flex-col h-screen">
	<Navbar user={data.user} />
	<div class="flex flex-1 overflow-hidden">
		<Sidebar {activeUrl}>
			<SidebarWrapper>
				<SidebarGroup class="h-screen">
					<SidebarItem
						href="/admin/dashboard"
						label="Dashboard"
						class={activeUrl == '/admin/dashboard' ? 'bg-slate-200' : ''}
					>
						<svelte:fragment slot="icon">
							<ChartPieSolid
								class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
							/>
						</svelte:fragment>
					</SidebarItem>
					<SidebarItem
						href="/admin/users"
						label="Users"
						{spanClass}
						class={activeUrl == '/admin/users' ? 'bg-slate-200' : ''}
					>
						<svelte:fragment slot="icon">
							<GridSolid
								class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
							/>
						</svelte:fragment>
					</SidebarItem>
					<SidebarItem
						href="/admin/transactions"
						class={activeUrl == '/admin/transactions' ? 'bg-slate-200' : ''}
						label="Transactions"
						{spanClass}
					>
						<svelte:fragment slot="icon">
							<MailBoxSolid
								class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
							/>
						</svelte:fragment>
					</SidebarItem>
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
		<main class="flex-1 overflow-y-auto px-6">
			{@render children()}
		</main>
	</div>
</div>

