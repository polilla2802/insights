<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import FilterPills from '$lib/components/FilterPills.svelte';
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import { experiencias, alcaldias, categorias } from '$lib/data/mock';

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
</script>

<svelte:head>
	<title>Experiencias — Metrópoli CDMX</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 md:px-6 py-6">
	<!-- Header -->
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-gray-900 mb-1">Experiencias en CDMX</h1>
		<p class="text-sm text-gray-500">Restaurantes, museos y eventos únicos por alcaldía</p>
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

	<!-- Resultados -->
	{#if resultado.length > 0}
		<p class="text-xs text-gray-400 mb-4">{resultado.length} experiencia{resultado.length !== 1 ? 's' : ''} encontrada{resultado.length !== 1 ? 's' : ''}</p>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each resultado as exp (exp.id)}
				<ExperienceCard
					id={exp.id}
					titulo={exp.titulo}
					lugar={exp.lugar}
					alcaldia={exp.alcaldia}
					duracion={exp.duracion}
					precio={exp.precio}
					imagen={exp.imagen}
					rating={exp.rating}
					numResenas={exp.numResenas}
					tipo={exp.tipo}
				/>
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
