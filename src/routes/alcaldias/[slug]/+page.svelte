<script lang="ts">
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import FilterPills from '$lib/components/FilterPills.svelte';

	let { data } = $props();

	const tipos = [
		{ label: 'Todo', value: 'todos' },
		{ label: 'Gastronomía', value: 'RESTAURANTE' },
		{ label: 'Cultura', value: 'MUSEO' },
		{ label: 'Tours', value: 'TOUR' },
		{ label: 'Actividades', value: 'ACTIVIDAD' },
		{ label: 'Eventos', value: 'EVENTO' }
	];

	let tipoSeleccionado = $state('todos');

	const resultado = $derived(
		data.experiencias.filter((e: { tipo: string }) =>
			tipoSeleccionado === 'todos' || e.tipo === tipoSeleccionado
		)
	);
</script>

<svelte:head>
	<title>{data.alcaldia.nombre} — ConoCé-DMX</title>
</svelte:head>

<!-- Header alcaldía -->
<div class="bg-teal-950 px-4 md:px-6 py-10">
	<div class="max-w-7xl mx-auto">
		<a href="/alcaldias" class="text-white/60 text-sm hover:text-white transition-colors mb-3 inline-flex items-center gap-1">
			← Todas las alcaldías
		</a>
		<h1 class="text-3xl font-bold text-white">{data.alcaldia.nombre}</h1>
		<p class="text-white/60 text-sm mt-1">{data.experiencias.length} experiencias disponibles</p>
	</div>
</div>

<div class="max-w-7xl mx-auto px-4 md:px-6 py-6">
	<!-- Filtros tipo -->
	<div class="mb-6">
		<FilterPills
			filters={tipos}
			selected={tipoSeleccionado}
			onselect={(v) => (tipoSeleccionado = v)}
		/>
	</div>

	{#if resultado.length > 0}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each resultado as exp (exp.id)}
				<ExperienceCard
					id={exp.id}
					titulo={exp.titulo}
					lugar={exp.lugar ?? ''}
					alcaldia={exp.alcaldia.nombre}
					duracion={exp.duracion}
					precio={exp.precio}
					imagen={exp.imagen ?? ''}
					rating={exp.rating}
					numResenas={exp.numResenas}
					tipo={exp.tipo}
				/>
			{/each}
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center py-20 text-center">
			<p class="text-gray-500 font-medium">No hay experiencias para este filtro</p>
			<button onclick={() => (tipoSeleccionado = 'todos')} class="text-magenta-600 text-sm mt-2 hover:underline">
				Ver todas
			</button>
		</div>
	{/if}
</div>
