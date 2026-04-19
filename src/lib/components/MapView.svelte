<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { buildGeoJSON } from '$lib/utils/geo';
	import type { AlcaldiaGeo } from '$lib/utils/geo';

	interface Experiencia {
		id: string;
		titulo: string;
		lugar: string | null;
		imagen: string | null;
		precio: number;
		rating: number;
		numResenas: number;
		tipo: string;
		alcaldia: { slug: string; nombre: string };
	}

	interface Props {
		alcaldiasGeo: AlcaldiaGeo[];
		experiencias: Experiencia[];
		onAlcaldiaSelect?: (slug: string | null) => void;
	}

	let { alcaldiasGeo, experiencias, onAlcaldiaSelect }: Props = $props();

	let mapEl: HTMLDivElement;
	let map: import('leaflet').Map | null = null;
	let selectedSlug = $state<string | null>(null);
	let L: typeof import('leaflet') | null = null;

	// Experience count per alcaldía
	const expCount = Object.fromEntries(
		alcaldiasGeo.map((a) => [
			a.slug,
			experiencias.filter((e) => e.alcaldia.slug === a.slug).length
		])
	);

	const maxCount = Math.max(...Object.values(expCount), 1);

	// Color scale: teal gradient based on experience density
	function getColor(slug: string): string {
		const count = expCount[slug] ?? 0;
		const t = count / maxCount;
		if (t === 0) return '#e5e7eb';
		if (t < 0.2) return '#ccfbf1';
		if (t < 0.4) return '#5eead4';
		if (t < 0.6) return '#2dd4bf';
		if (t < 0.8) return '#0d9488';
		return '#0f766e';
	}

	function getStyle(slug: string, isSelected: boolean) {
		return {
			fillColor: isSelected ? '#d4006a' : getColor(slug),
			fillOpacity: isSelected ? 0.85 : 0.65,
			color: isSelected ? '#a8005a' : '#fff',
			weight: isSelected ? 2.5 : 1.5
		};
	}

	// NSE layer state
	let nseVisible = $state(false);
	let nseLoading = $state(false);
	let nseLayer: import('leaflet').LayerGroup | null = null;

	const NSE_FILES = [
		'/datasets/NSE_1.geojson',
		'/datasets/NSE_2.geojson',
		'/datasets/NSE_3.geojson',
		'/datasets/NSE_4.geojson',
		'/datasets/NSE_5.geojson'
	];

	const NSE_COLORS: Record<string, string> = {
		AB:  '#1565c0',
		'C+': '#42a5f5',
		C:   '#66bb6a',
		'C-': '#ffca28',
		'D+': '#ffa726',
		D:   '#ef5350',
		E:   '#b71c1c',
		ND:  '#9e9e9e'
	};

	function getNseStyle(layer: string) {
		return {
			fillColor: NSE_COLORS[layer] ?? '#9e9e9e',
			fillOpacity: 0.55,
			color: 'transparent',
			weight: 0
		};
	}

	async function toggleNseLayer() {
		if (!L || !map) return;

		if (nseVisible) {
			nseLayer?.remove();
			nseLayer = null;
			nseVisible = false;
			return;
		}

		nseLoading = true;
		nseLayer = L.layerGroup().addTo(map);

		try {
			for (const url of NSE_FILES) {
				const res = await fetch(url);
				const data = await res.json();
				L.geoJSON(data, {
					style: (feature) => getNseStyle(feature?.properties?.layer ?? 'ND'),
					interactive: false
				}).addTo(nseLayer!);
			}
			nseVisible = true;
		} finally {
			nseLoading = false;
		}
	}

	// Patrullaje layer state
	let patrullajeVisible = $state(false);
	let patrullajeLoading = $state(false);
	let patrullajeLayer: import('leaflet').GeoJSON | null = null;

	const ZONA_COLORS: Record<string, string> = {
		CENTRO:  '#7c3aed',
		NORTE:   '#0891b2',
		ORIENTE: '#d97706',
		PONIENTE:'#059669',
		SUR:     '#dc2626'
	};

	function getPatrullajeStyle(zona: string) {
		const color = ZONA_COLORS[zona] ?? '#6b7280';
		return { fillColor: color, fillOpacity: 0.25, color, weight: 1.5 };
	}

	async function togglePatrullajeLayer() {
		if (!L || !map) return;

		if (patrullajeVisible) {
			patrullajeLayer?.remove();
			patrullajeLayer = null;
			patrullajeVisible = false;
			return;
		}

		patrullajeLoading = true;
		try {
			const res = await fetch('/datasets_3/zonas_patrullaje.geojson');
			const data = await res.json();

			patrullajeLayer = L.geoJSON(data, {
				style: (feature) => getPatrullajeStyle(feature?.properties?.zona ?? ''),
				onEachFeature(feature, layer) {
					const { deleg, sctr_18, zona, are_km2 } = feature.properties;
					layer.bindTooltip(`
						<div style="font-family:system-ui,sans-serif;padding:2px 4px;">
							<strong style="font-size:12px;">${sctr_18}</strong><br/>
							<span style="font-size:11px;color:#6b7280;">${deleg}</span><br/>
							<span style="font-size:10px;">Zona <strong>${zona}</strong> · ${Number(are_km2).toFixed(2)} km²</span>
						</div>
					`, { sticky: true, direction: 'top', className: 'consearch-tooltip' });
				}
			}).addTo(map);

			patrullajeVisible = true;
		} finally {
			patrullajeLoading = false;
		}
	}

	// Airbnb heatmap layer state
	let airbnbVisible = $state(false);
	let airbnbLoading = $state(false);
	let airbnbHeatLayer: { addTo: (m: unknown) => unknown; remove: () => void } | null = null;
	let heatScriptLoaded = false;

	const AIRBNB_FILES = [
		'/datasets_2/Airbnb_1.geojson',
		'/datasets_2/Airbnb_2.geojson',
		'/datasets_2/Airbnb_3.geojson',
		'/datasets_2/Airbnb_4.geojson'
	];

	async function loadHeatScript(): Promise<void> {
		if (heatScriptLoaded) return;
		// Expose L globally so leaflet.heat can patch it
		(window as Record<string, unknown>).L = L;
		await new Promise<void>((resolve, reject) => {
			const s = document.createElement('script');
			s.src = 'https://unpkg.com/leaflet.heat/dist/leaflet-heat.js';
			s.onload = () => { heatScriptLoaded = true; resolve(); };
			s.onerror = reject;
			document.head.appendChild(s);
		});
	}

	async function toggleAirbnbLayer() {
		if (!L || !map) return;

		if (airbnbVisible) {
			airbnbHeatLayer?.remove();
			airbnbHeatLayer = null;
			airbnbVisible = false;
			return;
		}

		airbnbLoading = true;
		try {
			await loadHeatScript();

			const points: [number, number, number][] = [];
			for (const url of AIRBNB_FILES) {
				const res = await fetch(url);
				const data = await res.json();
				for (const feat of data.features) {
					const { latitude, longitude, estimated_occupancy_l365d } = feat.properties;
					if (!latitude || !longitude) continue;
					const weight = Math.min((estimated_occupancy_l365d ?? 30) / 365, 1);
					points.push([latitude, longitude, Math.max(weight, 0.05)]);
				}
			}

			const heatFn = (L as unknown as Record<string, Function>).heatLayer;
			airbnbHeatLayer = heatFn(points, {
				radius: 18,
				blur: 14,
				maxZoom: 17,
				max: 1.0,
				gradient: { 0.0: '#0ea5e9', 0.3: '#a855f7', 0.6: '#f97316', 1.0: '#dc2626' }
			}) as { addTo: (m: unknown) => unknown; remove: () => void };
			airbnbHeatLayer.addTo(map);
			airbnbVisible = true;
		} finally {
			airbnbLoading = false;
		}
	}

	// Alcaldías base layer visibility
	let alcaldiasVisible = $state(true);

	function toggleAlcaldiasLayer() {
		if (!map || !geoLayer) return;
		if (alcaldiasVisible) {
			geoLayer.remove();
		} else {
			geoLayer.addTo(map);
		}
		alcaldiasVisible = !alcaldiasVisible;
	}

	// Experience markers layer
	let markersLayer: import('leaflet').LayerGroup | null = null;
	let geoLayer: import('leaflet').GeoJSON | null = null;

	function addExperienceMarkers(slug: string) {
		if (!L || !map) return;
		markersLayer?.clearLayers();
		markersLayer = L.layerGroup().addTo(map);

		const alcaldiaExps = experiencias.filter((e) => e.alcaldia.slug === slug);
		const geo = alcaldiasGeo.find((a) => a.slug === slug);
		if (!geo) return;

		// Spread markers around the centroid
		alcaldiaExps.forEach((exp, i) => {
			const angle = (i / alcaldiaExps.length) * 2 * Math.PI;
			const radius = 0.012;
			const lat = geo.lat + radius * Math.sin(angle);
			const lng = geo.lng + radius * Math.cos(angle);

			const icon = L!.divIcon({
				className: '',
				html: `
					<div style="
						background: #082e2e;
						color: white;
						border: 2px solid white;
						border-radius: 9999px;
						padding: 4px 8px;
						font-size: 11px;
						font-weight: 700;
						white-space: nowrap;
						box-shadow: 0 2px 8px rgba(0,0,0,0.25);
						font-family: system-ui, sans-serif;
					">
						$${(exp.precio / 1000).toFixed(1)}k
					</div>`,
				iconAnchor: [24, 16]
			});

			const marker = L!.marker([lat, lng], { icon });

			const starsHtml = Array.from({ length: 5 }, (_, si) =>
				`<span style="color:${si < Math.round(exp.rating) ? '#d4006a' : '#d1d5db'}">★</span>`
			).join('');

			marker.bindPopup(`
				<div style="width:220px;font-family:system-ui,sans-serif;padding:2px;">
					<img src="${exp.imagen}" alt="${exp.titulo}"
						style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px;"/>
					<div style="font-size:10px;color:#d4006a;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px;">
						${exp.tipo.charAt(0) + exp.tipo.slice(1).toLowerCase()}
					</div>
					<p style="font-weight:700;font-size:13px;color:#111;margin:0 0 2px;">${exp.titulo}</p>
					<p style="font-size:11px;color:#6b7280;margin:0 0 6px;">${exp.lugar} · ${exp.alcaldia}</p>
					<div style="display:flex;align-items:center;justify-content:space-between;">
						<div style="font-size:11px;">${starsHtml} <span style="color:#6b7280;">(${exp.numResenas})</span></div>
						<span style="font-weight:700;font-size:13px;color:#111;">$${exp.precio.toLocaleString('es-MX')}</span>
					</div>
					<a href="/experiencias/${exp.id}" style="
						display:block;margin-top:8px;background:#d4006a;color:white;
						text-align:center;padding:6px;border-radius:9999px;
						font-size:12px;font-weight:700;text-decoration:none;">
						Reservar
					</a>
				</div>
			`, { maxWidth: 240, className: 'consearch-popup' });

			markersLayer!.addLayer(marker);
		});
	}

	function clearMarkers() {
		markersLayer?.clearLayers();
	}

	onMount(async () => {
		// Dynamic import — Leaflet requires window
		L = await import('leaflet');

		map = L.map(mapEl, {
			center: [19.36, -99.14],
			zoom: 11,
			zoomControl: false
		});

		// Zoom control bottom-right
		L.control.zoom({ position: 'bottomright' }).addTo(map);

		// Stadia Alidade Smooth tile layer (neutral, clean look)
		L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
			attribution: '© OpenStreetMap contributors © CARTO',
			subdomains: 'abcd',
			maxZoom: 18
		}).addTo(map);

		// GeoJSON layer
		const geojson = buildGeoJSON(alcaldiasGeo);

		geoLayer = L.geoJSON(geojson as GeoJSON.GeoJsonObject, {
			style: (feature) => getStyle(feature?.properties.slug, false),
			onEachFeature(feature, layer) {
				const { nombre, slug } = feature.properties as { nombre: string; slug: string };
				const count = expCount[slug] ?? 0;

				// Hover tooltip
				layer.bindTooltip(`
					<div style="font-family:system-ui,sans-serif;padding:2px 4px;">
						<strong style="font-size:13px;">${nombre}</strong><br/>
						<span style="font-size:11px;color:#6b7280;">${count} experiencia${count !== 1 ? 's' : ''}</span>
					</div>
				`, { sticky: true, direction: 'top', className: 'consearch-tooltip' });

				layer.on('mouseover', () => {
					if (slug !== selectedSlug) {
						(layer as import('leaflet').Path).setStyle({
							fillOpacity: 0.85,
							weight: 2
						});
					}
				});

				layer.on('mouseout', () => {
					if (slug !== selectedSlug) {
						geoLayer?.resetStyle(layer);
					}
				});

				layer.on('click', () => {
					// Reset previous selection
					geoLayer?.eachLayer((l) => {
						const f = (l as import('leaflet').GeoJSON).feature as GeoJSON.Feature;
						if (f?.properties?.slug !== slug) {
							geoLayer?.resetStyle(l);
						}
					});

					if (selectedSlug === slug) {
						// Deselect
						selectedSlug = null;
						geoLayer?.resetStyle(layer);
						clearMarkers();
						onAlcaldiaSelect?.(null);
					} else {
						selectedSlug = slug;
						(layer as import('leaflet').Path).setStyle(getStyle(slug, true));
						addExperienceMarkers(slug);
						onAlcaldiaSelect?.(slug);

						// Fly to alcaldía
						const geo = alcaldiasGeo.find((a) => a.slug === slug)!;
						map?.flyTo([geo.lat, geo.lng], 13, { duration: 0.8 });
					}
				});
			}
		}).addTo(map);

		// Alcaldía name labels
		alcaldiasGeo.forEach((a) => {
			const count = expCount[a.slug] ?? 0;
			const label = L!.divIcon({
				className: '',
				html: `<div style="
					font-family:system-ui,sans-serif;
					font-size:10px;
					font-weight:700;
					color:#082e2e;
					text-shadow:0 0 4px white, 0 0 4px white, 0 0 4px white;
					pointer-events:none;
					white-space:nowrap;
					text-align:center;
				">${a.nombre}<br/><span style="font-size:9px;color:#6b7280;font-weight:400;">${count > 0 ? count + ' exp.' : ''}</span></div>`,
				iconAnchor: [40, 16]
			});
			L!.marker([a.lat, a.lng], { icon: label, interactive: false }).addTo(map!);
		});
	});

	onDestroy(() => {
		map?.remove();
		map = null;
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</svelte:head>

<div class="relative w-full h-full min-h-[400px]">
	<div bind:this={mapEl} class="w-full h-full z-0"></div>

	<!-- Layer toggle buttons row -->
	<div class="absolute top-3 left-3 z-1000 flex flex-wrap gap-2">
		<button
			onclick={toggleAlcaldiasLayer}
			class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-700 shadow-md transition-all cursor-pointer hover:shadow-lg
				{alcaldiasVisible ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 border border-gray-200'}"
		>
			<span class="text-[13px]">🗺️</span>
			{alcaldiasVisible ? 'Ocultar Alcaldías' : 'Ver Alcaldías'}
		</button>

		<button
			onclick={toggleNseLayer}
			disabled={nseLoading}
			class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-700 shadow-md transition-all
				{nseVisible ? 'bg-indigo-700 text-white' : 'bg-white text-gray-700 border border-gray-200'}
				{nseLoading ? 'opacity-60 cursor-wait' : 'cursor-pointer hover:shadow-lg'}"
		>
			{#if nseLoading}
				<span class="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
				Cargando NSE…
			{:else}
				<span class="inline-block w-2.5 h-2.5 rounded-full {nseVisible ? 'bg-blue-300' : 'bg-indigo-600'}"></span>
				{nseVisible ? 'Ocultar NSE' : 'Ver NSE'}
			{/if}
		</button>

		<button
			onclick={toggleAirbnbLayer}
			disabled={airbnbLoading}
			class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-700 shadow-md transition-all
				{airbnbVisible ? 'bg-rose-600 text-white' : 'bg-white text-gray-700 border border-gray-200'}
				{airbnbLoading ? 'opacity-60 cursor-wait' : 'cursor-pointer hover:shadow-lg'}"
		>
			{#if airbnbLoading}
				<span class="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
				Cargando…
			{:else}
				<span class="text-[13px]">🏠</span>
				{airbnbVisible ? 'Ocultar Airbnb' : 'Ver Airbnb'}
			{/if}
		</button>

		<button
			onclick={togglePatrullajeLayer}
			disabled={patrullajeLoading}
			class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-700 shadow-md transition-all
				{patrullajeVisible ? 'bg-violet-700 text-white' : 'bg-white text-gray-700 border border-gray-200'}
				{patrullajeLoading ? 'opacity-60 cursor-wait' : 'cursor-pointer hover:shadow-lg'}"
		>
			{#if patrullajeLoading}
				<span class="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
				Cargando…
			{:else}
				<span class="text-[13px]">🚔</span>
				{patrullajeVisible ? 'Ocultar Patrullaje' : 'Ver Patrullaje'}
			{/if}
		</button>
	</div>

	<!-- Legends stacked container — grows upward from bottom-left -->
	<div class="absolute bottom-10 left-3 z-1000 flex flex-col gap-2 items-start">
		{#if nseVisible}
			<div class="bg-white rounded-xl shadow-lg p-3 text-xs font-sans min-w-36">
				<p class="font-bold text-gray-700 mb-2 text-[11px] uppercase tracking-wide">Nivel Socioeconómico</p>
				{#each [['AB','#1565c0','Alto'], ['C+','#42a5f5','Medio alto'], ['C','#66bb6a','Medio'], ['C-','#ffca28','Medio bajo'], ['D+','#ffa726','Bajo alto'], ['D','#ef5350','Bajo'], ['E','#b71c1c','Muy bajo'], ['ND','#9e9e9e','Sin datos']] as [label, color, desc]}
					<div class="flex items-center gap-2 mb-1">
						<span class="inline-block w-3 h-3 rounded-sm shrink-0" style="background:{color}"></span>
						<span class="text-gray-600"><strong>{label}</strong> · {desc}</span>
					</div>
				{/each}
			</div>
		{/if}

		{#if patrullajeVisible}
			<div class="bg-white rounded-xl shadow-lg p-3 text-xs font-sans min-w-36">
				<p class="font-bold text-gray-700 mb-2 text-[11px] uppercase tracking-wide">Zonas de Patrullaje</p>
				{#each [['CENTRO','#7c3aed'],['NORTE','#0891b2'],['ORIENTE','#d97706'],['PONIENTE','#059669'],['SUR','#dc2626']] as [zona, color]}
					<div class="flex items-center gap-2 mb-1">
						<span class="inline-block w-3 h-3 rounded-sm shrink-0 border" style="background:{color}33;border-color:{color}"></span>
						<span class="text-gray-600">{zona}</span>
					</div>
				{/each}
			</div>
		{/if}

		{#if airbnbVisible}
			<div class="bg-white rounded-xl shadow-lg p-3 text-xs font-sans min-w-40">
				<p class="font-bold text-gray-700 mb-2 text-[11px] uppercase tracking-wide">Turistas en Airbnb</p>
				<div class="flex items-center gap-1 mb-1.5">
					<div class="h-2 w-24 rounded-full" style="background: linear-gradient(to right, #0ea5e9, #a855f7, #f97316, #dc2626)"></div>
				</div>
				<div class="flex justify-between text-gray-500 text-[10px] mb-2">
					<span>Baja</span><span>Alta</span>
				</div>
				<p class="text-gray-400 text-[10px] leading-tight">Intensidad = noches ocupadas estimadas / año</p>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(.consearch-popup .leaflet-popup-content-wrapper) {
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
		padding: 0;
		overflow: hidden;
	}
	:global(.consearch-popup .leaflet-popup-content) {
		margin: 12px;
	}
	:global(.consearch-popup .leaflet-popup-tip-container) {
		display: none;
	}
	:global(.consearch-tooltip .leaflet-tooltip) {
		border-radius: 8px;
		border: none;
		box-shadow: 0 2px 12px rgba(0,0,0,0.12);
		padding: 6px 10px;
	}
</style>
