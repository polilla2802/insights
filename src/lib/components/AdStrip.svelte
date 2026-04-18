<script lang="ts">
	import type { AnuncioMock } from '$lib/data/ads-mock';
	interface Props { ad: AnuncioMock }
	let { ad }: Props = $props();

	function handleImgError(e: Event) {
		const img = e.currentTarget as HTMLImageElement;
		img.style.display = 'none';
		(img.nextElementSibling as HTMLElement).style.display = 'flex';
	}
</script>

<a
	href={ad.ctaUrl}
	target="_blank"
	rel="noopener noreferrer"
	aria-label="{ad.empresa} — {ad.tagline}"
	class="relative flex items-center overflow-hidden rounded-2xl h-16 group"
>
	<!-- Foto de fondo desaturada -->
	<img
		src={ad.imagen}
		alt=""
		aria-hidden="true"
		class="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:scale-105 transition-transform duration-500"
	/>
	<!-- Color de marca como base -->
	<div class="absolute inset-0" style="background-color:{ad.accentColor};"></div>

	<!-- Logo -->
	<div class="relative z-10 flex items-center h-full px-4 border-r border-white/20 shrink-0">
		<div class="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center p-1.5">
			<img
				src={ad.logo}
				alt={ad.empresa}
				class="w-full h-full object-contain"
				onerror={handleImgError}
			/>
			<span class="hidden text-white font-black text-base">{ad.empresa.charAt(0)}</span>
		</div>
		<span class="ml-2.5 text-white font-bold text-sm hidden sm:block">{ad.empresa}</span>
	</div>

	<!-- Tagline -->
	<p class="relative z-10 flex-1 text-white font-semibold text-sm px-4 truncate">{ad.tagline}</p>

	<!-- CTA -->
	<span class="relative z-10 shrink-0 text-white text-xs font-bold px-4 py-1.5 mr-3 rounded-full border border-white/40 group-hover:bg-white/20 transition-colors whitespace-nowrap">
		{ad.ctaLabel} →
	</span>

	<!-- Badge -->
	<span class="absolute top-1.5 right-2 text-[9px] font-semibold uppercase tracking-wide text-white/50">
		Publicidad
	</span>
</a>
