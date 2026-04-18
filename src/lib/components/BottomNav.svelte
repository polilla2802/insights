<script lang="ts">
	import { page } from '$app/state';

	const items = [
		{
			label: 'Explorar',
			href: '/experiencias',
			icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`
		},
		{
			label: 'Alcaldías',
			href: '/alcaldias',
			icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`
		},
		{
			label: 'Reservas',
			href: '/reservas',
			icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`
		},
		{
			label: 'Alertas',
			href: '/alertas',
			icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`
		}
	];
</script>

<nav class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 md:hidden safe-area-pb">
	<div class="flex">
		{#each items as item}
			{@const isActive = page.url.pathname === item.href || page.url.pathname.startsWith(item.href + '/')}
			<a
				href={item.href}
				class="flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors {isActive ? 'text-magenta-600' : 'text-gray-400 hover:text-gray-700'}"
			>
				<span class={isActive ? '[&_svg]:stroke-[var(--color-magenta-600)]' : ''}>
					{@html item.icon}
				</span>
				{item.label}
			</a>
		{/each}
	</div>
</nav>

<style>
	.safe-area-pb {
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
