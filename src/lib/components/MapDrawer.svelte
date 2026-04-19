<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { buildGeoJSON } from '$lib/utils/geo';
	import type { AlcaldiaGeo } from '$lib/utils/geo';

	interface Props {
		alcaldiasGeo?: AlcaldiaGeo[];
		initialPolygon?: [number, number][];
		onchange?: (polygon: [number, number][], centroid: [number, number]) => void;
	}

	let { alcaldiasGeo = [], initialPolygon = [], onchange }: Props = $props();

	let mapEl: HTMLDivElement;
	let L: typeof import('leaflet') | null = null;
	let map: import('leaflet').Map | null = null;

	// Estado del dibujo
	let drawing = $state(false);
	let vertices = $state<[number, number][]>([...initialPolygon]);
	let vertexCount = $derived(vertices.length);

	// Capas de Leaflet (no reactivas — manejadas con imperativo)
	let vertexMarkers: import('leaflet').CircleMarker[] = [];
	let previewPolygon: import('leaflet').Polygon | null = null;
	let finishedPolygon: import('leaflet').Polygon | null = null;
	let mouseMoveHandler: ((e: import('leaflet').LeafletMouseEvent) => void) | null = null;
	let clickHandler: ((e: import('leaflet').LeafletMouseEvent) => void) | null = null;
	let dblClickHandler: ((e: import('leaflet').LeafletMouseEvent) => void) | null = null;

	function calcCentroid(pts: [number, number][]): [number, number] {
		const lat = pts.reduce((s, p) => s + p[0], 0) / pts.length;
		const lng = pts.reduce((s, p) => s + p[1], 0) / pts.length;
		return [lat, lng];
	}

	function slugify(text: string) {
		return text.toLowerCase()
			.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
	}

	function updatePreview(pts: [number, number][], cursorPos?: [number, number]) {
		if (!L || !map) return;
		const allPts = cursorPos ? [...pts, cursorPos] : pts;
		if (allPts.length < 2) { previewPolygon?.remove(); previewPolygon = null; return; }

		if (!previewPolygon) {
			previewPolygon = L.polygon(allPts, {
				color: '#d4006a', weight: 2, dashArray: '6 4',
				fillColor: '#d4006a', fillOpacity: 0.15
			}).addTo(map);
		} else {
			previewPolygon.setLatLngs(allPts);
		}
	}

	function addVertexMarker(lat: number, lng: number, index: number) {
		if (!L || !map) return;
		const m = L.circleMarker([lat, lng], {
			radius: 6, color: '#082e2e', weight: 2,
			fillColor: '#fff', fillOpacity: 1
		})
		.bindTooltip(`Vértice ${index + 1}`, { permanent: false })
		.addTo(map);

		// Click en vértice → eliminar
		m.on('click', (e) => {
			import('leaflet').then(L => L.DomEvent.stopPropagation(e));
			vertices = vertices.filter((_, i) => i !== index);
			rebuildMarkers();
			if (vertices.length === 0) clearAll();
			else {
				updatePreview(vertices);
				emitChange();
			}
		});

		vertexMarkers.push(m);
	}

	function rebuildMarkers() {
		vertexMarkers.forEach(m => m.remove());
		vertexMarkers = [];
		vertices.forEach((v, i) => addVertexMarker(v[0], v[1], i));
	}

	function startDrawing() {
		if (!L || !map) return;
		drawing = true;
		map.getContainer().style.cursor = 'crosshair';

		clickHandler = (e: import('leaflet').LeafletMouseEvent) => {
			const { lat, lng } = e.latlng;
			vertices = [...vertices, [lat, lng]];
			addVertexMarker(lat, lng, vertices.length - 1);
			updatePreview(vertices);
		};

		mouseMoveHandler = (e: import('leaflet').LeafletMouseEvent) => {
			if (vertices.length > 0) updatePreview(vertices, [e.latlng.lat, e.latlng.lng]);
		};

		dblClickHandler = (e: import('leaflet').LeafletMouseEvent) => {
			import('leaflet').then(L => L.DomEvent.stopPropagation(e));
			closePolygon();
		};

		map.on('click', clickHandler);
		map.on('mousemove', mouseMoveHandler);
		map.on('dblclick', dblClickHandler);
	}

	function stopDrawing() {
		if (!L || !map) return;
		drawing = false;
		map.getContainer().style.cursor = '';
		if (clickHandler) map.off('click', clickHandler);
		if (mouseMoveHandler) map.off('mousemove', mouseMoveHandler);
		if (dblClickHandler) map.off('dblclick', dblClickHandler);
		previewPolygon?.remove();
		previewPolygon = null;
	}

	function closePolygon() {
		if (vertices.length < 3) return;
		stopDrawing();
		finishedPolygon?.remove();
		finishedPolygon = L!.polygon(vertices, {
			color: '#082e2e', weight: 2.5,
			fillColor: '#d4006a', fillOpacity: 0.25
		}).addTo(map!);
		emitChange();
	}

	function clearAll() {
		stopDrawing();
		vertices = [];
		vertexMarkers.forEach(m => m.remove());
		vertexMarkers = [];
		finishedPolygon?.remove();
		finishedPolygon = null;
		onchange?.([], [0, 0]);
	}

	function undoLast() {
		if (vertices.length === 0) return;
		vertices = vertices.slice(0, -1);
		vertexMarkers.pop()?.remove();
		updatePreview(vertices);
		if (vertices.length < 3) { finishedPolygon?.remove(); finishedPolygon = null; }
		emitChange();
	}

	function emitChange() {
		if (vertices.length >= 3) {
			onchange?.(vertices, calcCentroid(vertices));
		}
	}

	onMount(async () => {
		L = await import('leaflet');

		map = L.map(mapEl, { center: [19.36, -99.14], zoom: 10, zoomControl: false });
		L.control.zoom({ position: 'bottomright' }).addTo(map);

		L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
			attribution: '© OpenStreetMap © CARTO', subdomains: 'abcd', maxZoom: 19
		}).addTo(map);

		// Polígonos de referencia de las alcaldías existentes (guía visual)
		L.geoJSON(buildGeoJSON(alcaldiasGeo) as GeoJSON.GeoJsonObject, {
			style: { color: '#94a3b8', weight: 1, fillColor: '#e2e8f0', fillOpacity: 0.3 }
		}).addTo(map);

		// Labels de alcaldías existentes
		alcaldiasGeo.forEach(a => {
			L!.marker([a.lat, a.lng], {
				icon: L!.divIcon({
					className: '',
					html: `<div style="font-size:10px;color:#64748b;font-weight:600;pointer-events:none;white-space:nowrap;text-align:center;">${a.nombre}</div>`,
					iconAnchor: [40, 8]
				}),
				interactive: false
			}).addTo(map!);
		});

		// Si hay polígono inicial, dibujarlo
		if (initialPolygon.length >= 3) {
			vertices = [...initialPolygon];
			rebuildMarkers();
			finishedPolygon = L.polygon(vertices, {
				color: '#082e2e', weight: 2.5, fillColor: '#d4006a', fillOpacity: 0.25
			}).addTo(map);
			map.fitBounds(finishedPolygon.getBounds(), { padding: [40, 40] });
		}
	});

	onDestroy(() => { map?.remove(); map = null; });
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</svelte:head>

<div class="flex flex-col h-full">
	<!-- Toolbar -->
	<div class="flex items-center gap-2 px-3 py-2.5 bg-white border-b border-gray-100 flex-wrap">
		{#if !drawing}
			<button
				onclick={startDrawing}
				class="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg bg-teal-950 text-white hover:bg-teal-800 transition-colors"
			>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<path d="m3 17 1.5-1.5M21 3l-6.5 18-3-7-7-3 18-6.5"/><path d="m10.5 13.5 1.5-1.5"/>
				</svg>
				{vertices.length >= 3 ? 'Redibujar zona' : 'Dibujar zona'}
			</button>
		{:else}
			<div class="flex items-center gap-1.5 text-sm font-medium text-magenta-600 bg-magenta-50 px-3 py-1.5 rounded-lg">
				<span class="w-2 h-2 rounded-full bg-magenta-600 animate-pulse"></span>
				Dibujando — {vertexCount} vértice{vertexCount !== 1 ? 's' : ''}
			</div>
			{#if vertexCount >= 3}
				<button
					onclick={closePolygon}
					class="text-sm font-semibold px-3 py-1.5 rounded-lg bg-teal-950 text-white hover:bg-teal-800 transition-colors"
				>
					Cerrar polígono ✓
				</button>
			{/if}
			<button
				onclick={stopDrawing}
				class="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
			>
				Cancelar
			</button>
		{/if}

		{#if vertexCount > 0}
			<button
				onclick={undoLast}
				class="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
			>
				↩ Deshacer
			</button>
			<button
				onclick={clearAll}
				class="text-sm px-3 py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors"
			>
				Limpiar
			</button>
		{/if}

		{#if vertexCount >= 3}
			<span class="ml-auto text-xs text-emerald-600 font-semibold flex items-center gap-1">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
				Zona válida ({vertexCount} vértices)
			</span>
		{/if}
	</div>

	<!-- Instrucciones contextuales -->
	{#if drawing}
		<div class="bg-amber-50 border-b border-amber-100 px-3 py-1.5 text-xs text-amber-700 flex items-center gap-2">
			<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
			Clic para agregar vértices · Doble clic para cerrar · Clic en vértice para eliminarlo
		</div>
	{/if}

	<!-- Mapa -->
	<div bind:this={mapEl} class="flex-1 min-h-0"></div>

	<!-- Coordenadas generadas -->
	{#if vertices.length >= 3}
		<div class="px-3 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 font-mono truncate">
			Centroide: {calcCentroid(vertices)[0].toFixed(5)}, {calcCentroid(vertices)[1].toFixed(5)}
			· {vertexCount} vértices
		</div>
	{/if}
</div>
