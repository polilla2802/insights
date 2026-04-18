<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const nav = [
		{
			label: 'Dashboard',
			href: '/admin',
			icon: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`
		},
		{
			label: 'Alcaldías',
			href: '/admin/alcaldias',
			icon: `<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>`
		},
		{
			label: 'Experiencias',
			href: '/admin/experiencias',
			icon: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`
		},
		{
			label: 'Anuncios',
			href: '/admin/anuncios',
			icon: `<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>`
		}
	];

	function isActive(href: string) {
		if (href === '/admin') return page.url.pathname === '/admin';
		return page.url.pathname.startsWith(href);
	}
</script>

<div class="flex h-screen bg-gray-50 overflow-hidden">
	<!-- Sidebar -->
	<aside class="w-56 bg-teal-950 flex flex-col shrink-0">
		<!-- Logo -->
		<div class="px-5 py-5 border-b border-white/10">
			<a href="/" class="flex items-center gap-2">
				<div class="w-7 h-7 rounded-lg bg-magenta-600 flex items-center justify-center">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
						<circle cx="12" cy="10" r="3"/>
					</svg>
				</div>
				<span class="text-white font-bold text-sm">ConoCé-DMX</span>
			</a>
			<p class="text-white/40 text-xs mt-1 ml-9">Admin</p>
		</div>

		<!-- Nav -->
		<nav class="flex-1 px-3 py-4 space-y-0.5">
			{#each nav as item}
				<a
					href={item.href}
					class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors {isActive(item.href) ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white hover:bg-white/8'}"
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						{@html item.icon}
					</svg>
					{item.label}
				</a>
			{/each}
		</nav>

		<!-- Back to app -->
		<div class="px-3 pb-4">
			<a href="/" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-white/40 hover:text-white/70 transition-colors">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="m15 18-6-6 6-6"/>
				</svg>
				Volver al sitio
			</a>
		</div>
	</aside>

	<!-- Main -->
	<main class="flex-1 overflow-y-auto">
		{@render children()}
	</main>
</div>
