<script lang="ts">
	let { data } = $props();
	const exp = data.exp;

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

	let personas = $state(1);
	const total = $derived(exp.precio * personas);
</script>

<svelte:head>
	<title>{exp.titulo} — ConoCé-DMX</title>
</svelte:head>

<!-- Imagen hero -->
<div class="relative h-64 md:h-96 bg-gray-200">
	<img src={exp.imagen ?? ''} alt={exp.titulo} class="w-full h-full object-cover" />
	<a href="/experiencias" aria-label="Volver a experiencias" class="absolute top-4 left-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
			<path d="m15 18-6-6 6-6"/>
		</svg>
	</a>
</div>

<div class="max-w-4xl mx-auto px-4 md:px-6 py-6">
	<div class="md:grid md:grid-cols-3 md:gap-8">
		<!-- Info principal -->
		<div class="md:col-span-2">
			<div class="flex items-center gap-2 mb-2">
				<span class="pill text-xs">{tipoLabel[exp.tipo]}</span>
				{#if exp.rating > 0}
					<span class="text-sm font-semibold text-gray-700">★ {exp.rating.toFixed(1)}</span>
					<span class="text-sm text-gray-400">({exp.numResenas} reseñas)</span>
				{/if}
			</div>

			<h1 class="text-2xl font-bold text-gray-900 mb-1">{exp.titulo}</h1>
			<p class="text-sm text-gray-500 mb-4">{exp.lugar} · {exp.alcaldia.nombre} · {formatDuracion(exp.duracion)}</p>

			<p class="text-gray-700 leading-relaxed mb-6">{exp.descripcion}</p>

			<div class="grid grid-cols-2 gap-3 mb-6">
				<div class="bg-gray-50 rounded-xl p-4">
					<p class="text-xs text-gray-400 mb-1">Duración</p>
					<p class="font-semibold text-gray-900">{formatDuracion(exp.duracion)}</p>
				</div>
				<div class="bg-gray-50 rounded-xl p-4">
					<p class="text-xs text-gray-400 mb-1">Ubicación</p>
					<p class="font-semibold text-gray-900">{exp.alcaldia.nombre}</p>
				</div>
			</div>
		</div>

		<!-- Panel de reserva (sticky en desktop) -->
		<div class="md:col-span-1">
			<div class="card p-5 md:sticky md:top-20">
				<p class="text-2xl font-bold text-gray-900 mb-1">
					${exp.precio.toLocaleString('es-MX')}
					<span class="text-sm font-normal text-gray-500">MXN / persona</span>
				</p>

				<div class="mt-4 mb-4">
					<p class="text-xs font-medium text-gray-600 mb-1.5">Personas</p>
					<div class="flex items-center gap-3">
						<button
							class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:border-gray-400 transition-colors"
							onclick={() => personas = Math.max(1, personas - 1)}
						>−</button>
						<span class="font-semibold text-gray-900 w-4 text-center">{personas}</span>
						<button
							class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:border-gray-400 transition-colors"
							onclick={() => personas = Math.min(10, personas + 1)}
						>+</button>
					</div>
				</div>

				<div class="border-t border-gray-100 pt-4 mb-4">
					<div class="flex justify-between text-sm mb-1">
						<span class="text-gray-500">${exp.precio.toLocaleString('es-MX')} × {personas}</span>
						<span class="font-semibold">${total.toLocaleString('es-MX')} MXN</span>
					</div>
				</div>

				<button class="btn-primary w-full text-center block">
					Reservar ahora
				</button>

				<p class="text-xs text-gray-400 text-center mt-3">No se realiza ningún cargo hasta confirmar</p>
			</div>
		</div>
	</div>
</div>
