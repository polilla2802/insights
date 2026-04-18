<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import FilterPills from '$lib/components/FilterPills.svelte';
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import AdCard from '$lib/components/AdCard.svelte';
	import AdStrip from '$lib/components/AdStrip.svelte';
	import { experiencias, alcaldias, categorias } from '$lib/data/mock';
	import { getAdCards, getStrips } from '$lib/data/ads-mock';

	let busqueda = $state('');
	let alcaldiaSeleccionada = $state('todos');
	let categoriaSeleccionada = $state('todos');

	const alcaldiaFiltros = [
		{ label: 'Todas', value: 'todos' },
		...alcaldias.map((a) => ({ label: a.nombre, value: a.slug }))
	];

	const categoriaFiltros = [
		{ label: 'Todo', value: 'todos' },
		...categorias.map((c) => ({ label: c.nombre, value: c.slug }))
	];

	const tipoToSlug: Record<string, string> = {
		RESTAURANTE: 'gastronomia',
		MUSEO: 'cultura',
		TOUR: 'tours',
		EVENTO: 'eventos',
		ACTIVIDAD: 'actividades'
	};

	const resultado = $derived(
		experiencias.filter((e) => {
			const matchBusqueda =
				busqueda.trim() === '' ||
				e.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
				e.alcaldia.toLowerCase().includes(busqueda.toLowerCase()) ||
				e.lugar.toLowerCase().includes(busqueda.toLowerCase());

			const matchAlcaldia =
				alcaldiaSeleccionada === 'todos' || e.alcaldiaSlug === alcaldiaSeleccionada;

			const matchCategoria =
				categoriaSeleccionada === 'todos' || tipoToSlug[e.tipo] === categoriaSeleccionada;

			return matchBusqueda && matchAlcaldia && matchCategoria;
		})
	);

	// Ads filtrados por alcaldía seleccionada
	const adCards = $derived(
		getAdCards(alcaldiaSeleccionada === 'todos' ? undefined : alcaldiaSeleccionada)
	);
	const strips = $derived(
		getStrips(alcaldiaSeleccionada === 'todos' ? undefined : alcaldiaSeleccionada)
	);

	// Grid intercalado: 1 AdCard cada 4 experiencias
	type GridItem =
		| { kind: 'exp'; data: (typeof experiencias)[number] }
		| { kind: 'ad'; data: ReturnType<typeof getAdCards>[number] };

	const gridItems = $derived<GridItem[]>(() => {
		const items: GridItem[] = [];
		let adIdx = 0;
		resultado.forEach((exp, i) => {
			items.push({ kind: 'exp', data: exp });
			if ((i + 1) % 4 === 0 && adIdx < adCards.length) {
				items.push({ kind: 'ad', data: adCards[adIdx++] });
			}
		});
		return items;
	});
</script>

<svelte:head>
	<title>Experiencias — ConSearch CDMX</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 md:px-6 py-6">
	<!-- Header -->
	<div class="flex items-start justify-between mb-6">
		<div>
			<h1 class="text-2xl font-bold text-gray-900 mb-1">Experiencias en CDMX</h1>
			<p class="text-sm text-gray-500">Restaurantes, museos y eventos únicos por alcaldía</p>
		</div>
		<a href="/anunciarse" class="hidden md:block text-xs text-gray-400 hover:text-gray-600 transition-colors mt-1 whitespace-nowrap">
			¿Anunciarte aquí? →
		</a>
	</div>

	<!-- Search -->
	<div class="mb-4">
		<SearchBar bind:value={busqueda} placeholder="Busca por nombre, lugar o alcaldía…" />
	</div>

	<!-- Filtros alcaldías -->
	<div class="mb-3">
		<FilterPills
			filters={alcaldiaFiltros}
			selected={alcaldiaSeleccionada}
			onselect={(v) => (alcaldiaSeleccionada = v)}
		/>
	</div>

	<!-- Filtros categorías -->
	<div class="mb-6">
		<FilterPills
			filters={categoriaFiltros}
			selected={categoriaSeleccionada}
			onselect={(v) => (categoriaSeleccionada = v)}
		/>
	</div>

	<!-- Strip ad contextual (top, según alcaldía) -->
	{#if strips[0]}
		<div class="mb-6">
			<AdStrip ad={strips[0]} />
		</div>
	{/if}

	<!-- Resultados -->
	{#if resultado.length > 0}
		<p class="text-xs text-gray-400 mb-4">
			{resultado.length} experiencia{resultado.length !== 1 ? 's' : ''} encontrada{resultado.length !== 1 ? 's' : ''}
		</p>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each gridItems() as item (item.kind + '-' + item.data.id)}
				{#if item.kind === 'exp'}
					<ExperienceCard
						id={item.data.id}
						titulo={item.data.titulo}
						lugar={item.data.lugar}
						alcaldia={item.data.alcaldia}
						duracion={item.data.duracion}
						precio={item.data.precio}
						imagen={item.data.imagen}
						rating={item.data.rating}
						numResenas={item.data.numResenas}
						tipo={item.data.tipo}
					/>
				{:else}
					<AdCard ad={item.data} />
				{/if}
			{/each}
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center py-20 text-center">
			<div class="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
				</svg>
			</div>
			<p class="text-gray-500 font-medium">Sin resultados</p>
			<p class="text-gray-400 text-sm mt-1">Prueba con otra búsqueda o filtro</p>
		</div>
	{/if}
</div>
