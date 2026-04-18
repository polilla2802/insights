<script lang="ts">
	interface Props {
		titulo?: string;
		subtitulo?: string;
		ctaLabel?: string;
		ctaHref?: string;
		secondaryLabel?: string;
		secondaryHref?: string;
		imagenFondo?: string;
	}

	let {
		titulo = 'Decisiones Inteligentes en el Corazón de México',
		subtitulo = 'Descubre restaurantes, museos y eventos únicos por alcaldía. Navega la CDMX con precisión.',
		ctaLabel = 'Explorar experiencias →',
		ctaHref = '/experiencias',
		secondaryLabel = 'Ver mapa',
		secondaryHref = '/mapa',
		imagenFondo = ''
	}: Props = $props();
</script>

<section
	class="relative min-h-[480px] md:min-h-[560px] flex items-end bg-teal-950 overflow-hidden"
	style={imagenFondo ? `background-image: url(${imagenFondo}); background-size: cover; background-position: center;` : ''}
>
	{#if imagenFondo}
		<div class="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/50 to-transparent"></div>
	{:else}
		<!-- Decorative grid overlay -->
		<div class="absolute inset-0 opacity-10"
			style="background-image: repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px);">
		</div>
		<!-- Bottom SAFE WORK text -->
		<span class="absolute bottom-4 left-6 text-white/10 font-black text-5xl tracking-widest select-none pointer-events-none">
			SAFE WORK
		</span>
	{/if}

	<div class="relative z-10 px-6 py-10 md:px-12 md:py-14 max-w-2xl">
		<h1 class="text-white font-bold text-3xl md:text-4xl leading-tight mb-4">
			{titulo}
		</h1>
		<p class="text-white/70 text-sm md:text-base mb-8 leading-relaxed">
			{subtitulo}
		</p>
		<div class="flex flex-wrap gap-3">
			<a href={ctaHref} class="btn-primary">
				{ctaLabel}
			</a>
			<a href={secondaryHref} class="btn-outline">
				{secondaryLabel}
			</a>
		</div>
	</div>
</section>
