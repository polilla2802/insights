<script lang="ts">
	import { page } from '$app/state';
</script>

<header class="sticky top-0 z-40 bg-white border-b border-gray-100">
	<div class="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
		<a href="/" class="flex items-center gap-2">
			<div class="w-7 h-7 rounded-lg bg-teal-950 flex items-center justify-center">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
					<circle cx="12" cy="10" r="3"/>
				</svg>
			</div>
			<span class="font-bold text-gray-900 text-sm tracking-tight">ConoCé-DMX</span>
		</a>

		<nav class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
			<a href="/experiencias" class="hover:text-gray-900 transition-colors {page.url.pathname.startsWith('/experiencias') ? 'text-gray-900' : ''}">Experiencias</a>
			<a href="/alcaldias" class="hover:text-gray-900 transition-colors {page.url.pathname.startsWith('/alcaldias') ? 'text-gray-900' : ''}">Alcaldías</a>
			<a href="/mapa" class="hover:text-gray-900 transition-colors">Mapa</a>
		</nav>

		<div class="flex items-center gap-2">
			<a href="/reservas" class="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
				</svg>
				Reservas
			</a>
			<a href="/perfil" class="w-8 h-8 rounded-full bg-teal-950 flex items-center justify-center text-white text-xs font-bold">
				M
			</a>
		</div>
	</div>
</header>
