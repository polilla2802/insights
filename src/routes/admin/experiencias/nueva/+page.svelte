<script lang="ts">
	import { page } from '$app/state';

	let { data } = $props();

	// Pre-seleccionar alcaldía si viene por query param
	const alcaldiaParam = $derived(page.url.searchParams.get('alcaldia') ?? '');

	let titulo = $state('');
	let descripcion = $state('');
	let alcaldiaId = $state(alcaldiaParam);
	let categoriaId = $state('');
	let tipo = $state<string>('RESTAURANTE');
	let precio = $state<number | ''>('');
	let duracion = $state<number | ''>('');
	let lugar = $state('');
	let direccion = $state('');
	let imagen = $state('');
	let destacada = $state(false);
	let saved = $state(false);

	const tipos = ['RESTAURANTE', 'MUSEO', 'EVENTO', 'TOUR', 'ACTIVIDAD'] as const;

	const tipoLabel: Record<string, string> = {
		RESTAURANTE: '🍽️ Restaurante',
		MUSEO: '🏛️ Museo',
		EVENTO: '🎪 Evento',
		TOUR: '🗺️ Tour',
		ACTIVIDAD: '⚡ Actividad'
	};

	const canSave = $derived(
		titulo.trim().length > 0 &&
		alcaldiaId.length > 0 &&
		Number(precio) > 0 &&
		Number(duracion) > 0
	);

	function handleSave() {
		if (!canSave) return;
		const payload = {
			titulo, descripcion, alcaldiaId, categoriaId,
			tipo, precio: Number(precio), duracion: Number(duracion),
			lugar, direccion, imagen, destacada
		};
		console.log('Nueva experiencia:', payload);
		saved = true;
	}
</script>

<svelte:head><title>Nueva experiencia — ConoCé-DMX Admin</title></svelte:head>

<div class="h-full flex flex-col">
	<!-- Header -->
	<div class="px-8 py-5 border-b border-gray-100 bg-white flex items-center justify-between shrink-0">
		<div class="flex items-center gap-3">
			<a href="/admin/experiencias" class="text-gray-400 hover:text-gray-700 transition-colors">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
			</a>
			<h1 class="text-lg font-bold text-gray-900">Nueva experiencia</h1>
		</div>
		<button onclick={handleSave} disabled={!canSave} class="btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed">
			{saved ? '✓ Guardado' : 'Guardar experiencia'}
		</button>
	</div>

	<div class="flex-1 overflow-y-auto">
		<div class="max-w-3xl mx-auto p-8 space-y-8">

			<!-- Bloque: identidad -->
			<section>
				<h2 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Información general</h2>
				<div class="grid grid-cols-1 gap-4">

					<div>
						<label for="titulo" class="block text-xs font-semibold text-gray-600 mb-1.5">Título *</label>
						<input id="titulo" type="text" bind:value={titulo}
							placeholder="ej. Cena en el corazón de Coyoacán"
							class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950" />
					</div>

					<div>
						<label for="desc" class="block text-xs font-semibold text-gray-600 mb-1.5">Descripción</label>
						<textarea id="desc" bind:value={descripcion} rows={4}
							placeholder="Describe la experiencia con detalle…"
							class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950"></textarea>
					</div>

				</div>
			</section>

			<!-- Bloque: clasificación -->
			<section>
				<h2 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Clasificación</h2>
				<div class="grid grid-cols-2 gap-4">

					<div>
						<label for="alcaldia" class="block text-xs font-semibold text-gray-600 mb-1.5">Alcaldía *</label>
						<select id="alcaldia" bind:value={alcaldiaId}
							class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950 bg-white">
							<option value="">Selecciona alcaldía…</option>
							{#each data.alcaldias as a}
								<option value={a.slug}>{a.nombre}</option>
							{/each}
						</select>
					</div>

					<div>
						<label for="categoria" class="block text-xs font-semibold text-gray-600 mb-1.5">Categoría</label>
						<select id="categoria" bind:value={categoriaId}
							class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950 bg-white">
							<option value="">Sin categoría</option>
							{#each data.categorias as c}
								<option value={c.id}>{c.nombre}</option>
							{/each}
						</select>
					</div>

					<!-- Tipo como pills seleccionables -->
					<div class="col-span-2">
						<p class="text-xs font-semibold text-gray-600 mb-1.5">Tipo *</p>
						<div class="flex flex-wrap gap-2">
							{#each tipos as t}
								<button
									onclick={() => (tipo = t)}
									class="pill {tipo === t ? 'pill-active' : ''}"
								>
									{tipoLabel[t]}
								</button>
							{/each}
						</div>
					</div>

				</div>
			</section>

			<!-- Bloque: detalles -->
			<section>
				<h2 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Detalles</h2>
				<div class="grid grid-cols-2 gap-4">

					<div>
						<label for="precio" class="block text-xs font-semibold text-gray-600 mb-1.5">Precio (MXN) *</label>
						<div class="relative">
							<span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
							<input id="precio" type="number" bind:value={precio} min="0" placeholder="1,200"
								class="w-full pl-7 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950" />
						</div>
					</div>

					<div>
						<label for="duracion" class="block text-xs font-semibold text-gray-600 mb-1.5">Duración (minutos) *</label>
						<input id="duracion" type="number" bind:value={duracion} min="0" placeholder="120"
							class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950" />
					</div>

					<div>
						<label for="lugar" class="block text-xs font-semibold text-gray-600 mb-1.5">Nombre del lugar</label>
						<input id="lugar" type="text" bind:value={lugar} placeholder="ej. Jardín Centenario"
							class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950" />
					</div>

					<div>
						<label for="dir" class="block text-xs font-semibold text-gray-600 mb-1.5">Dirección</label>
						<input id="dir" type="text" bind:value={direccion} placeholder="Calle, colonia, CP"
							class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950" />
					</div>

				</div>
			</section>

			<!-- Bloque: imagen -->
			<section>
				<h2 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Imagen</h2>
				<div>
					<label for="img" class="block text-xs font-semibold text-gray-600 mb-1.5">URL de imagen</label>
					<input id="img" type="url" bind:value={imagen} placeholder="https://images.unsplash.com/…"
						class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950" />
				</div>
				{#if imagen}
					<img src={imagen} alt="preview" class="mt-3 w-full h-48 object-cover rounded-xl" />
				{/if}
			</section>

			<!-- Bloque: opciones -->
			<section>
				<h2 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Opciones</h2>
				<label class="flex items-center gap-3 cursor-pointer">
					<div
						role="checkbox"
						aria-checked={destacada}
						tabindex="0"
						onclick={() => (destacada = !destacada)}
						onkeydown={(e) => e.key === ' ' && (destacada = !destacada)}
						class="w-10 h-6 rounded-full transition-colors relative {destacada ? 'bg-teal-950' : 'bg-gray-200'}"
					>
						<span class="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform {destacada ? 'translate-x-5' : 'translate-x-1'}"></span>
					</div>
					<div>
						<p class="text-sm font-semibold text-gray-700">Destacada en home</p>
						<p class="text-xs text-gray-400">Aparece en la sección de Experiencias Destacadas</p>
					</div>
				</label>
			</section>

			<!-- Validación y CTA final -->
			{#if !canSave}
				<div class="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-700">
					Completa: {[
						!titulo.trim() && 'título',
						!alcaldiaId && 'alcaldía',
						!Number(precio) && 'precio',
						!Number(duracion) && 'duración'
					].filter(Boolean).join(', ')}
				</div>
			{/if}

		</div>
	</div>
</div>
