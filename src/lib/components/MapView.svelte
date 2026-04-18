<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { alcaldiasGeo, buildGeoJSON } from '$lib/data/cdmx-geo';
	import { experiencias } from '$lib/data/mock';
	import type { AlcaldiaGeo } from '$lib/data/cdmx-geo';

	interface Props {
		onAlcaldiaSelect?: (slug: string | null) => void;
	}

	let { onAlcaldiaSelect }: Props = $props();

	let mapEl: HTMLDivElement;
	let map: import('leaflet').Map | null = null;
	let selectedSlug = $state<string | null>(null);
	let L: typeof import('leaflet') | null = null;

	// Experience count per alcaldía
	const expCount = Object.fromEntries(
		alcaldiasGeo.map((a) => [
			a.slug,
			experiencias.filter((e) => e.alcaldiaSlug === a.slug).length
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

	// Experience markers layer
	let markersLayer: import('leaflet').LayerGroup | null = null;
	let geoLayer: import('leaflet').GeoJSON | null = null;

	function addExperienceMarkers(slug: string) {
		if (!L || !map) return;
		markersLayer?.clearLayers();
		markersLayer = L.layerGroup().addTo(map);

		const alcaldiaExps = experiencias.filter((e) => e.alcaldiaSlug === slug);
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
			`, { maxWidth: 240, className: 'metropoli-popup' });

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
				`, { sticky: true, direction: 'top', className: 'metropoli-tooltip' });

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

<div bind:this={mapEl} class="w-full h-full min-h-[400px] z-0"></div>

<style>
	:global(.metropoli-popup .leaflet-popup-content-wrapper) {
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
		padding: 0;
		overflow: hidden;
	}
	:global(.metropoli-popup .leaflet-popup-content) {
		margin: 12px;
	}
	:global(.metropoli-popup .leaflet-popup-tip-container) {
		display: none;
	}
	:global(.metropoli-tooltip .leaflet-tooltip) {
		border-radius: 8px;
		border: none;
		box-shadow: 0 2px 12px rgba(0,0,0,0.12);
		padding: 6px 10px;
	}
</style>
