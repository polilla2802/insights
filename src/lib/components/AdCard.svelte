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

<!-- Mismo aspect-ratio que ExperienceCard para no romper el grid -->
<article class="card group cursor-pointer overflow-hidden">
	<a href={ad.ctaUrl} target="_blank" rel="noopener noreferrer" aria-label="{ad.empresa} — {ad.tagline}">

		<!-- Bloque superior: imagen de fondo + logo centrado -->
		<div class="relative aspect-4/3 overflow-hidden flex items-center justify-center" style="background-color:{ad.accentColor};">
			<!-- Foto difuminada de fondo -->
			<img
				src={ad.imagen}
				alt=""
				aria-hidden="true"
				class="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-300 mix-blend-luminosity"
			/>

			<!-- Logo de la marca -->
			<div class="relative z-10 flex flex-col items-center gap-3">
				<div class="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm p-3 flex items-center justify-center shadow-lg">
					<img
						src={ad.logo}
						alt={ad.empresa}
						class="w-full h-full object-contain"
						onerror={handleImgError}
					/>
					<span class="hidden text-white font-black text-2xl">{ad.empresa.charAt(0)}</span>
				</div>
				<span class="text-white font-bold text-base tracking-tight drop-shadow">{ad.empresa}</span>
			</div>

			<!-- Badge -->
			<span class="absolute top-2.5 right-2.5 text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-black/20 text-white/70">
				Publicidad
			</span>
		</div>

		<!-- Bloque inferior: tagline + CTA -->
		<div class="px-4 py-3 flex items-center justify-between gap-3">
			<p class="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">{ad.tagline}</p>
			<span
				class="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full text-white whitespace-nowrap"
				style="background-color:{ad.accentColor};"
			>
				{ad.ctaLabel}
			</span>
		</div>

	</a>
</article>
