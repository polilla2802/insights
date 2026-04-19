<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Alcaldías — ConoCé-DMX</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 md:px-6 py-8">
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-gray-900 mb-1">Alcaldías de la CDMX</h1>
		<p class="text-sm text-gray-500">Explora experiencias por cada demarcación territorial</p>
	</div>

	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
		{#each data.alcaldias as alcaldia}
			<a
				href="/alcaldias/{alcaldia.slug}"
				class="group relative h-48 rounded-2xl overflow-hidden bg-teal-950 flex items-end p-4 cursor-pointer"
			>
				<div class="absolute inset-0 bg-gradient-to-br from-teal-900/80 to-teal-950 group-hover:from-teal-800/80 transition-colors duration-200"></div>
				<div class="absolute top-4 right-4 opacity-20">
					<svg width="60" height="60" viewBox="0 0 100 100" fill="white">
						<path d="M50 10 L70 30 L80 25 L90 40 L80 50 L85 65 L70 70 L65 85 L50 80 L35 90 L20 75 L25 60 L15 50 L20 35 L35 30 L30 15 Z"/>
					</svg>
				</div>
				<div class="relative z-10">
					<p class="text-white font-bold text-base leading-tight">{alcaldia.nombre}</p>
					<p class="text-white/60 text-xs mt-0.5">{alcaldia._count.experiencias} experiencias</p>
				</div>
			</a>
		{/each}
	</div>
</div>
