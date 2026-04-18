<script lang="ts">
	import MapDrawer from '$lib/components/MapDrawer.svelte';

	// Form state
	let nombre = $state('');
	let slug = $state('');
	let descripcion = $state('');
	let imagen = $state('');
	let slugManual = $state(false);

	// Zona dibujada
	let polygon = $state<[number, number][]>([]);
	let centroid = $state<[number, number]>([0, 0]);
	let saved = $state(false);

	$effect(() => {
		if (!slugManual && nombre) {
			slug = nombre.toLowerCase()
				.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
				.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
		}
	});

	function handleZona(poly: [number, number][], cen: [number, number]) {
		polygon = poly;
		centroid = cen;
	}

	const canSave = $derived(nombre.trim().length > 0 && polygon.length >= 3);

	function handleSave() {
		if (!canSave) return;
		// En producción: POST /api/alcaldias con el payload
		console.log('Nueva alcaldía:', {
			nombre, slug, descripcion, imagen,
			lat: centroid[0], lng: centroid[1],
			polygon
		});
		saved = true;
	}

	const payload = $derived(canSave ? JSON.stringify({
		nombre, slug,
		lat: +centroid[0].toFixed(5),
		lng: +centroid[1].toFixed(5),
		polygon: polygon.map(([lat, lng]) => [+lat.toFixed(5), +lng.toFixed(5)])
	}, null, 2) : '');
</script>

<svelte:head><title>Nueva alcaldía — ConoCé-DMX Admin</title></svelte:head>

<div class="h-full flex flex-col">
	<!-- Header -->
	<div class="px-8 py-5 border-b border-gray-100 bg-white flex items-center justify-between shrink-0">
		<div class="flex items-center gap-3">
			<a href="/admin/alcaldias" class="text-gray-400 hover:text-gray-700 transition-colors">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
			</a>
			<h1 class="text-lg font-bold text-gray-900">Nueva alcaldía</h1>
		</div>
		<button
			onclick={handleSave}
			disabled={!canSave}
			class="btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
		>
			{saved ? '✓ Guardado' : 'Guardar alcaldía'}
		</button>
	</div>

	<div class="flex flex-1 min-h-0">
		<!-- Form panel -->
		<div class="w-80 shrink-0 overflow-y-auto border-r border-gray-100 bg-white p-6 space-y-5">

			<!-- Nombre -->
			<div>
				<label for="nombre" class="block text-xs font-semibold text-gray-600 mb-1.5">Nombre *</label>
				<input
					id="nombre"
					type="text"
					bind:value={nombre}
					placeholder="ej. Cuauhtémoc"
					class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950"
				/>
			</div>

			<!-- Slug -->
			<div>
				<label for="slug" class="block text-xs font-semibold text-gray-600 mb-1.5">
					Slug
					<span class="text-gray-400 font-normal ml-1">/ alcaldias/<strong>{slug || '…'}</strong></span>
				</label>
				<input
					id="slug"
					type="text"
					bind:value={slug}
					oninput={() => (slugManual = true)}
					placeholder="cuauhtemoc"
					class="w-full px-3 py-2 text-sm font-mono border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950"
				/>
			</div>

			<!-- Descripción -->
			<div>
				<label for="desc" class="block text-xs font-semibold text-gray-600 mb-1.5">Descripción</label>
				<textarea
					id="desc"
					bind:value={descripcion}
					rows={3}
					placeholder="Describe la alcaldía brevemente…"
					class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950"
				></textarea>
			</div>

			<!-- Imagen -->
			<div>
				<label for="img" class="block text-xs font-semibold text-gray-600 mb-1.5">URL de imagen</label>
				<input
					id="img"
					type="url"
					bind:value={imagen}
					placeholder="https://…"
					class="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950"
				/>
				{#if imagen}
					<img src={imagen} alt="preview" class="mt-2 w-full h-24 object-cover rounded-xl" />
				{/if}
			</div>

			<!-- Zona (centroide calculado del polígono) -->
			<div class="rounded-xl bg-gray-50 p-4">
				<p class="text-xs font-semibold text-gray-500 mb-2">Zona dibujada</p>
				{#if polygon.length >= 3}
					<div class="space-y-1 text-xs font-mono text-gray-600">
						<p>Lat: <span class="text-gray-900">{centroid[0].toFixed(5)}</span></p>
						<p>Lng: <span class="text-gray-900">{centroid[1].toFixed(5)}</span></p>
						<p>Vértices: <span class="text-gray-900">{polygon.length}</span></p>
					</div>
				{:else}
					<p class="text-xs text-gray-400">Dibuja la zona en el mapa →</p>
				{/if}
			</div>

			<!-- Payload JSON para backend -->
			{#if canSave}
				<div>
					<p class="text-xs font-semibold text-gray-500 mb-1.5">Payload generado</p>
					<pre class="text-[10px] bg-gray-900 text-green-400 rounded-xl p-3 overflow-x-auto leading-relaxed">{payload}</pre>
				</div>
			{/if}

		</div>

		<!-- Map -->
		<div class="flex-1 min-w-0">
			<MapDrawer onchange={handleZona} />
		</div>
	</div>
</div>
