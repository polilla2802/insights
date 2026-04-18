<script lang="ts">
	interface Props {
		id: string;
		titulo: string;
		lugar: string;
		alcaldia: string;
		duracion: number;
		precio: number;
		imagen: string;
		rating?: number;
		numResenas?: number;
		tipo: string;
	}

	let { id, titulo, lugar, alcaldia, duracion, precio, imagen, rating = 0, numResenas = 0, tipo }: Props = $props();

	const tipoLabel: Record<string, string> = {
		RESTAURANTE: 'Gastronomía',
		MUSEO: 'Cultura',
		EVENTO: 'Evento',
		TOUR: 'Tour',
		ACTIVIDAD: 'Actividad'
	};

	const formatDuracion = (mins: number) => {
		if (mins < 60) return `${mins} min`;
		const h = Math.floor(mins / 60);
		const m = mins % 60;
		return m > 0 ? `${h}h ${m}min` : `${h} hora${h > 1 ? 's' : ''}`;
	};
</script>

<article class="card group cursor-pointer">
	<a href="/experiencias/{id}">
		<div class="relative overflow-hidden aspect-[4/3]">
			<img
				src={imagen}
				alt={titulo}
				class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
			/>
			<span class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-gray-700">
				{tipoLabel[tipo] ?? tipo}
			</span>
			{#if rating > 0}
				<span class="absolute top-3 right-3 bg-teal-950/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
					★ {rating.toFixed(1)}
				</span>
			{/if}
		</div>

		<div class="p-4">
			<div class="flex items-start justify-between gap-2 mb-1">
				<h3 class="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">{titulo}</h3>
			</div>

			<p class="text-xs text-gray-500 mb-1">
				{#if lugar}{lugar} · {/if}{alcaldia}
			</p>

			<p class="text-xs text-gray-400 mb-3">{formatDuracion(duracion)}{#if numResenas > 0} · {numResenas} reseñas{/if}</p>

			<div class="flex items-center justify-between">
				<p class="text-sm font-bold text-gray-900">
					<span class="text-base">${precio.toLocaleString('es-MX')}</span>
					<span class="font-normal text-gray-500 text-xs"> MXN / persona</span>
				</p>
				<button
					class="btn-primary text-xs px-4 py-2"
					onclick={(e) => e.preventDefault()}
				>
					Reservar
				</button>
			</div>
		</div>
	</a>
</article>
