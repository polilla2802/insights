<script lang="ts">
	import { experiencias, alcaldias } from '$lib/data/mock';

	interface Props {
		slug: string | null;
		onclose?: () => void;
	}

	let { slug, onclose }: Props = $props();

	const alcaldia = $derived(alcaldias.find((a) => a.slug === slug));
	const exps = $derived(slug ? experiencias.filter((e) => e.alcaldiaSlug === slug) : []);

	const tipoLabel: Record<string, string> = {
		RESTAURANTE: 'Gastronomía',
		MUSEO: 'Cultura',
		EVENTO: 'Evento',
		TOUR: 'Tour',
		ACTIVIDAD: 'Actividad'
	};

	const formatDuracion = (mins: number) => {
		const h = Math.floor(mins / 60);
		const m = mins % 60;
		return h > 0 ? (m > 0 ? `${h}h ${m}min` : `${h}h`) : `${mins}min`;
	};
</script>

<!-- Slide-in panel -->
<div
	class="absolute top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-10 flex flex-col transition-transform duration-300 {slug ? 'translate-x-0' : 'translate-x-full'}"
	role="complementary"
	aria-label="Panel de experiencias"
>
	{#if slug && alcaldia}
		<!-- Header -->
		<div class="bg-teal-950 px-5 py-4 flex items-start justify-between flex-shrink-0">
			<div>
				<p class="text-white/60 text-xs mb-0.5">Alcaldía</p>
				<h2 class="text-white font-bold text-lg leading-tight">{alcaldia.nombre}</h2>
				<p class="text-white/70 text-xs mt-1">
					{exps.length} experiencia{exps.length !== 1 ? 's' : ''} disponible{exps.length !== 1 ? 's' : ''}
				</p>
			</div>
			<button
				onclick={onclose}
				aria-label="Cerrar panel"
				class="text-white/60 hover:text-white transition-colors mt-0.5 flex-shrink-0"
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M18 6 6 18M6 6l12 12"/>
				</svg>
			</button>
		</div>

		<!-- Legend -->
		<div class="px-5 py-3 border-b border-gray-100 flex gap-3 overflow-x-auto scrollbar-none flex-shrink-0">
			{#each [...new Set(exps.map((e) => e.tipo))] as tipo}
				<span class="flex items-center gap-1.5 text-xs text-gray-600 whitespace-nowrap">
					<span class="w-2 h-2 rounded-full bg-magenta-600 inline-block"></span>
					{tipoLabel[tipo]}
				</span>
			{/each}
		</div>

		<!-- Experience list -->
		<div class="flex-1 overflow-y-auto">
			{#if exps.length === 0}
				<div class="flex flex-col items-center justify-center h-full text-center px-6">
					<p class="text-gray-400 text-sm">Sin experiencias en esta alcaldía aún</p>
					<a href="/experiencias" class="text-magenta-600 text-sm mt-2 hover:underline">Ver todas</a>
				</div>
			{:else}
				<div class="divide-y divide-gray-50">
					{#each exps as exp (exp.id)}
						<a href="/experiencias/{exp.id}" class="flex gap-3 p-4 hover:bg-gray-50 transition-colors group">
							<!-- Imagen -->
							<div class="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
								<img
									src={exp.imagen}
									alt={exp.titulo}
									class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
								/>
							</div>

							<!-- Info -->
							<div class="flex-1 min-w-0">
								<div class="flex items-center gap-1.5 mb-1">
									<span class="text-[10px] font-bold text-magenta-600 uppercase tracking-wide">
										{tipoLabel[exp.tipo]}
									</span>
								</div>
								<h3 class="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-1">
									{exp.titulo}
								</h3>
								<p class="text-xs text-gray-500 mb-2 truncate">{exp.lugar}</p>

								<div class="flex items-center justify-between">
									<div class="flex items-center gap-1">
										<span class="text-xs text-gray-400">
											{#if exp.rating > 0}
												<span class="text-yellow-500">★</span>
												<span class="font-medium text-gray-700">{exp.rating.toFixed(1)}</span>
												<span class="text-gray-400">· {formatDuracion(exp.duracion)}</span>
											{/if}
										</span>
									</div>
									<span class="text-sm font-bold text-gray-900">
										${exp.precio.toLocaleString('es-MX')}
										<span class="text-xs font-normal text-gray-400">MXN</span>
									</span>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Footer CTA -->
		<div class="p-4 border-t border-gray-100 flex-shrink-0">
			<a
				href="/alcaldias/{slug}"
				class="btn-primary w-full block text-center text-sm"
			>
				Ver todas en {alcaldia.nombre} →
			</a>
		</div>
	{/if}
</div>

<style>
	.scrollbar-none {
		scrollbar-width: none;
	}
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
</style>
