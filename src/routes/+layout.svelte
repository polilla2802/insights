<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import { locale } from 'svelte-i18n';
	import '$lib/i18n';
	import Navbar from '$lib/components/Navbar.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	if (browser) {
		locale.set(window.navigator.language.split('-')[0]);
	}

	const isAdmin = $derived(page.url.pathname.startsWith('/admin'));
</script>

{#if isAdmin}
	{@render children()}
{:else}
	<div class="min-h-screen flex flex-col">
		<Navbar />
		<main class="flex-1 pb-16 md:pb-0">
			{@render children()}
		</main>
		<BottomNav />
	</div>
{/if}
