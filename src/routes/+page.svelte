<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import MetricCard from '$lib/components/MetricCard.svelte';
	import AlcaldiaCard from '$lib/components/AlcaldiaCard.svelte';
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import AdBanner from '$lib/components/AdBanner.svelte';
	import AdCard from '$lib/components/AdCard.svelte';
	import AdStrip from '$lib/components/AdStrip.svelte';
	import { alcaldias, experiencias } from '$lib/data/mock';
	import { getBanners, getAdCards, getStrips } from '$lib/data/ads-mock';

	const destacadas = experiencias.filter((e) => e.destacada);
	const banners = getBanners();
	const adCards = getAdCards();
	const strips = getStrips();

	// Intercala AdCards en el grid: una ad cada 3 experiencias
	type GridItem =
		| { kind: 'exp'; data: (typeof destacadas)[number] }
		| { kind: 'ad'; data: ReturnType<typeof getAdCards>[number] };

	const gridItems: GridItem[] = [];
	let adIdx = 0;
	destacadas.forEach((exp, i) => {
		gridItems.push({ kind: 'exp', data: exp });
		if ((i + 1) % 3 === 0 && adIdx < adCards.length) {
			gridItems.push({ kind: 'ad', data: adCards[adIdx++] });
		}
	});
</script>

<svelte:head>
	<title>ConoCé-DMX — Experiencias en CDMX</title>
</svelte:head>

<!-- Hero -->
<Hero />

<!-- ── Pasarela de ads: Banners enterprise ─────────────────────────────── -->
{#if banners.length > 0}
<section class="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-2">
	<div class="flex items-center justify-between mb-3">
		<p class="text-xs font-bold tracking-widest uppercase text-gray-400">Partners Regionales</p>
		<a href="/anunciarse" class="text-xs text-gray-400 hover:text-gray-600 transition-colors">¿Quieres anunciarte? →</a>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each banners as ad (ad.id)}
			<AdBanner {ad} />
		{/each}
	</div>
</section>
{/if}

<!-- Métricas de la ciudad -->
<section class="bg-white border-b border-gray-100 mt-6">
	<div class="max-w-7xl mx-auto px-4 md:px-6 py-8">
		<p class="text-xs font-bold tracking-widest uppercase text-magenta-600 mb-4">Ciudad de México</p>
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
			<MetricCard
				etiqueta="Métrica Global"
				titulo="Índice de Seguridad"
				descripcion="Análisis predictivo basado en incidentes reportados y sensores urbanos."
				valor="84%"
				unidad="Confianza Operativa"
				tipo="seguridad"
			/>
			<MetricCard
				etiqueta="Datos en tiempo real"
				titulo="Afluencia Turística"
				descripcion="Monitoreo de densidad peatonal en zonas de interés."
				variacion="+12% incremento en tiempo real"
				variacionPositiva={true}
				tipo="turismo"
			/>
			<MetricCard
				etiqueta="Análisis Territorial"
				titulo="Zonas de Interés"
				descripcion="Descubre hotspots emergentes. Cruzamos datos de consumo, seguridad y eventos culturales."
				tipo="interes"
				tags={['Xochimilco', 'Coyoacán', 'Insurgentes', 'Tlatelolco', 'Narvarte']}
			/>
		</div>
	</div>
</section>

<!-- Explorar por alcaldía -->
<section class="max-w-7xl mx-auto px-4 md:px-6 py-10">
	<div class="flex items-end justify-between mb-5">
		<div>
			<h2 class="text-xl font-bold text-gray-900">Explora por alcaldía</h2>
			<p class="text-sm text-gray-500 mt-0.5">Desde el dinamismo de Cuauhtémoc hasta la tradición de Tlalpan</p>
		</div>
		<a href="/alcaldias" class="text-sm font-semibold text-magenta-600 hover:text-magenta-500 transition-colors whitespace-nowrap">
			Ver todas →
		</a>
	</div>

	<div class="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
		{#each alcaldias as alcaldia}
			<AlcaldiaCard
				nombre={alcaldia.nombre}
				slug={alcaldia.slug}
				numExperiencias={alcaldia.numExperiencias}
			/>
		{/each}
	</div>
</section>

<!-- ── Strip ad entre secciones ───────────────────────────────────────────── -->
{#if strips[0]}
<div class="max-w-7xl mx-auto px-4 md:px-6 pb-4">
	<AdStrip ad={strips[0]} />
</div>
{/if}

<!-- Experiencias Destacadas + AdCards intercaladas -->
<section class="max-w-7xl mx-auto px-4 md:px-6 pb-10">
	<div class="flex items-end justify-between mb-5">
		<h2 class="text-xl font-bold text-gray-900">Experiencias Destacadas</h2>
		<a href="/experiencias" class="text-sm font-semibold text-magenta-600 hover:text-magenta-500 transition-colors">
			Ver todas →
		</a>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each gridItems as item (item.kind === 'exp' ? item.data.id : item.data.id)}
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
</section>

<!-- ── Strip ad 2 antes del CTA ───────────────────────────────────────────── -->
{#if strips[1]}
<div class="max-w-7xl mx-auto px-4 md:px-6 pb-4">
	<AdStrip ad={strips[1]} />
</div>
{/if}

<!-- CTA corporativo -->
<section class="bg-teal-950 mx-4 md:mx-auto mb-8 rounded-2xl max-w-7xl px-6 py-10 text-center">
	<h2 class="text-white font-bold text-xl md:text-2xl mb-2">Optimiza tu Estrategia Hoy</h2>
	<p class="text-white/70 text-sm mb-6 max-w-md mx-auto">
		Únete a la red de inteligencia urbana de la CDMX. Accede a análisis avanzados de tu región.
	</p>
	<a href="/contacto" class="btn-primary">Solicitar Demo</a>
</section>

<style>
	.scrollbar-none {
		scrollbar-width: none;
	}
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
</style>
