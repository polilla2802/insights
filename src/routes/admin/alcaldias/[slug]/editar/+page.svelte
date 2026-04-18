<script lang="ts">
	import { page } from '$app/state';
	import MapDrawer from '$lib/components/MapDrawer.svelte';
	import { alcaldias } from '$lib/data/mock';
	import { alcaldiasGeo } from '$lib/data/cdmx-geo';

	const slug = $derived(page.params.slug);
	const alcaldia = $derived(alcaldias.find(a => a.slug === slug));
	const geoData = $derived(alcaldiasGeo.find(a => a.slug === slug));

	let nombre = $state(alcaldia?.nombre ?? '');
	let descripcion = $state('');
	let imagen = $state('');
	let saved = $state(false);

	let polygon = $state<[number, number][]>(
		geoData?.polygon.map(([lng, lat]) => [lat, lng] as [number, number]) ?? []
	);
	let centroid = $state<[number, number]>([geoData?.lat ?? 0, geoData?.lng ?? 0]);

	function handleZona(poly: [number, number][], cen: [number, number]) {
		polygon = poly;
		centroid = cen;
	}

	const canSave = $derived(nombre.trim().length > 0 && polygon.length >= 3);

	function handleSave() {
		if (!canSave) return;
		console.log('Actualizar alcaldía:', {
			slug, nombre, descripcion, imagen,
			lat: centroid[0], lng: centroid[1], polygon
		});
		saved = true;
	}
</script>

<svelte:head><title>Editar {alcaldia?.nombre ?? slug} — ConoCé-DMX Admin</title></svelte:head>

<div class="h-full flex flex-col">
	<div class="px-8 py-5 border-b border-gray-100 bg-white flex items-center justify-between shrink-0">
		<div class="flex items-center gap-3">
			<a href="/admin/alcaldias" class="text-gray-400 hover:text-gray-700 transition-colors">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
			</a>
			<h1 class="text-lg font-bold text-gray-900">Editar — {alcaldia?.nombre ?? slug}</h1>
		</div>
		<button onclick={handleSave} disabled={!canSave} class="btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed">
			{saved ? '✓ Guardado' : 'Guardar cambios'}
		</button>
	</div>

	<div class="flex flex-1 min-h-0">
		<!-- Form -->
		<div class="w-80 shrink-0 overflow-y-auto border-r border-gray-100 bg-white p-6 space-y-5">

			<div>
				<label for="nombre" class="block text-xs font-semibold text-gray-600 mb-1.5">Nombre</label>
				<input id="nombre" type="text" bind:value={nombre}
					class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950" />
			</div>

			<div>
				<label class="block text-xs font-semibold text-gray-600 mb-1.5">Slug</label>
				<p class="px-3 py-2 text-sm font-mono text-gray-400 bg-gray-50 rounded-xl">{slug}</p>
			</div>

			<div>
				<label for="desc" class="block text-xs font-semibold text-gray-600 mb-1.5">Descripción</label>
				<textarea id="desc" bind:value={descripcion} rows={3}
					class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950"></textarea>
			</div>

			<div>
				<label for="img" class="block text-xs font-semibold text-gray-600 mb-1.5">URL de imagen</label>
				<input id="img" type="url" bind:value={imagen} placeholder="https://…"
					class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950" />
				{#if imagen}
					<img src={imagen} alt="preview" class="mt-2 w-full h-24 object-cover rounded-xl" />
				{/if}
			</div>

			<div class="rounded-xl bg-gray-50 p-4">
				<p class="text-xs font-semibold text-gray-500 mb-2">Zona actual</p>
				<div class="space-y-1 text-xs font-mono text-gray-600">
					<p>Lat: <span class="text-gray-900">{centroid[0].toFixed(5)}</span></p>
					<p>Lng: <span class="text-gray-900">{centroid[1].toFixed(5)}</span></p>
					<p>Vértices: <span class="text-gray-900">{polygon.length}</span></p>
				</div>
			</div>

			<a href="/admin/experiencias/nueva?alcaldia={slug}" class="block text-center text-sm font-semibold text-magenta-600 border border-magenta-200 rounded-xl py-2.5 hover:bg-magenta-50 transition-colors">
				+ Agregar experiencia aquí
			</a>
		</div>

		<!-- Map con polígono pre-cargado -->
		<div class="flex-1 min-w-0">
			<MapDrawer initialPolygon={polygon} onchange={handleZona} />
		</div>
	</div>
</div>
