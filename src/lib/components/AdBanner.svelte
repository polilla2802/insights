<script lang="ts">
	import type { AnuncioMock } from '$lib/data/ads-mock';
	interface Props { ad: AnuncioMock }
	let { ad }: Props = $props();
</script>

<a
	href={ad.ctaUrl}
	target="_blank"
	rel="noopener noreferrer"
	class="relative overflow-hidden rounded-2xl h-44 md:h-52 flex group block"
	aria-label="{ad.empresa} — {ad.tagline}"
>
	<!-- Foto de fondo -->
	<img
		src={ad.imagen}
		alt=""
		aria-hidden="true"
		class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
	/>

	<!-- Overlay con color de marca (izquierda densa → derecha transparente) -->
	<div
		class="absolute inset-0"
		style="background: linear-gradient(100deg, {ad.accentColor}f5 0%, {ad.accentColor}cc 35%, {ad.accentColor}55 65%, transparent 100%);"
	></div>

	<!-- Badge patrocinado -->
	<span class="absolute top-3 right-3 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-black/20 text-white/80 backdrop-blur-sm">
		Publicidad
	</span>

	<!-- Branding: logo + tagline + CTA -->
	<div class="relative z-10 flex flex-col justify-between p-6 md:p-8 w-full max-w-xs">
		<!-- Logo -->
		<div class="w-14 h-14 rounded-xl bg-white/15 backdrop-blur-sm p-2 flex items-center justify-center">
			<img
				src={ad.logo}
				alt={ad.empresa}
				class="w-full h-full object-contain"
				onerror={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex'; }}
			/>
			<!-- Fallback inicial si logo no carga -->
			<span class="hidden text-white font-black text-lg leading-none">
				{ad.empresa.charAt(0)}
			</span>
		</div>

		<!-- Tagline + CTA -->
		<div>
			<p class="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">{ad.empresa}</p>
			<p class="text-white font-bold text-xl md:text-2xl leading-tight mb-4">{ad.tagline}</p>
			<span class="inline-flex items-center gap-1.5 text-white text-sm font-semibold border border-white/50 rounded-full px-4 py-1.5 group-hover:bg-white/20 transition-colors">
				{ad.ctaLabel}
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</span>
		</div>
	</div>
</a>
