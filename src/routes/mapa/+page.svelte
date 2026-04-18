<script lang="ts">
	import MapView from '$lib/components/MapView.svelte';
	import MapSidePanel from '$lib/components/MapSidePanel.svelte';
	import { experiencias, alcaldias } from '$lib/data/mock';

	let selectedSlug = $state<string | null>(null);

	const totalExps = experiencias.length;
	const totalAlcaldias = alcaldias.length;

	function handleSelect(slug: string | null) {
		selectedSlug = slug;
	}

	function handleClose() {
		selectedSlug = null;
	}

	// Legend steps
	const legendSteps = [
		{ label: 'Sin exp.', color: '#e5e7eb' },
		{ label: '1–5', color: '#ccfbf1' },
		{ label: '6–10', color: '#5eead4' },
		{ label: '11–15', color: '#2dd4bf' },
		{ label: '16–20', color: '#0d9488' },
		{ label: '20+', color: '#0f766e' }
	];
</script>

<svelte:head>
	<title>Mapa de Experiencias — ConSearch CDMX</title>
</svelte:head>

<!-- Top bar con stats -->
<div class="bg-white border-b border-gray-100 px-4 md:px-6 py-3">
	<div class="max-w-7xl mx-auto flex items-center justify-between">
		<div>
			<h1 class="text-base font-bold text-gray-900 leading-tight">Mapa de Experiencias CDMX</h1>
			<p class="text-xs text-gray-500">
				{totalExps} experiencias en {totalAlcaldias} alcaldías — haz clic para explorar
			</p>
		</div>

		<!-- Leyenda -->
		<div class="hidden md:flex items-center gap-1.5">
			<span class="text-xs text-gray-400 mr-1">Densidad:</span>
			{#each legendSteps as step}
				<div class="flex flex-col items-center gap-0.5">
					<div class="w-5 h-5 rounded" style="background:{step.color}; border:1px solid #e5e7eb;"></div>
					<span class="text-[9px] text-gray-400">{step.label}</span>
				</div>
			{/each}
		</div>

		<a href="/experiencias" class="text-sm font-semibold text-magenta-600 hover:text-magenta-500 transition-colors hidden md:block">
			Ver lista →
		</a>
	</div>
</div>

<!-- Map container -->
<div class="relative" style="height: calc(100vh - 120px);">
	<MapView onAlcaldiaSelect={handleSelect} />
	<MapSidePanel slug={selectedSlug} onclose={handleClose} />

	<!-- Mobile: selected alcaldía badge -->
	{#if selectedSlug}
		<div class="md:hidden absolute bottom-4 left-4 right-4 z-20">
			<a
				href="/alcaldias/{selectedSlug}"
				class="btn-primary w-full block text-center text-sm"
			>
				Ver experiencias en {alcaldias.find(a => a.slug === selectedSlug)?.nombre} →
			</a>
		</div>
	{/if}
</div>
