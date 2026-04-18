<script lang="ts">
	interface Props {
		nombre: string;
		slug: string;
		imagen?: string;
		numExperiencias?: number;
	}

	let { nombre, slug, imagen, numExperiencias = 0 }: Props = $props();

	const gradients = [
		'from-teal-900 to-teal-700',
		'from-magenta-600 to-magenta-400',
		'from-gray-800 to-gray-600',
		'from-teal-800 to-teal-600'
	];

	const gradientIndex = nombre.charCodeAt(0) % gradients.length;
</script>

<a href="/alcaldias/{slug}" class="relative flex-shrink-0 w-36 h-44 rounded-2xl overflow-hidden group cursor-pointer block">
	{#if imagen}
		<img src={imagen} alt={nombre} class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
		<div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
	{:else}
		<div class="absolute inset-0 bg-gradient-to-br {gradients[gradientIndex]}"></div>
	{/if}
	<div class="absolute bottom-0 left-0 right-0 p-3">
		<p class="text-white font-bold text-sm leading-tight">{nombre}</p>
		{#if numExperiencias > 0}
			<p class="text-white/70 text-xs mt-0.5">{numExperiencias} experiencias</p>
		{/if}
	</div>
</a>
