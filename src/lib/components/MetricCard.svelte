<script lang="ts">
	interface Props {
		etiqueta?: string;
		titulo: string;
		descripcion?: string;
		valor?: string;
		unidad?: string;
		variacion?: string;
		variacionPositiva?: boolean;
		tipo?: 'seguridad' | 'turismo' | 'interes' | 'default';
		tags?: string[];
	}

	let {
		etiqueta,
		titulo,
		descripcion,
		valor,
		unidad,
		variacion,
		variacionPositiva = true,
		tipo = 'default',
		tags = []
	}: Props = $props();
</script>

<div class="card p-5">
	{#if etiqueta}
		<span class="text-[10px] font-bold tracking-widest uppercase text-magenta-600 mb-2 block">{etiqueta}</span>
	{/if}

	<h3 class="font-bold text-gray-900 text-base mb-1">{titulo}</h3>

	{#if descripcion}
		<p class="text-xs text-gray-500 leading-relaxed mb-4">{descripcion}</p>
	{/if}

	{#if tipo === 'seguridad' && valor}
		<div class="flex items-end gap-3 mt-2">
			<!-- Mini bar chart -->
			<div class="flex items-end gap-1 h-14">
				{#each [0.4, 0.6, 0.75, 0.55, 0.85, 0.7, 0.9] as h}
					<div class="w-4 rounded-sm bg-teal-950/80" style="height: {h * 100}%"></div>
				{/each}
			</div>
			<div class="ml-auto text-right">
				<p class="text-3xl font-black text-gray-900">{valor}</p>
				{#if unidad}
					<p class="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{unidad}</p>
				{/if}
			</div>
		</div>
	{/if}

	{#if tipo === 'turismo' && valor}
		<div class="mt-2">
			<!-- Mini bar chart horizontal -->
			<div class="flex items-end gap-1 h-16 mb-2">
				{#each [0.5, 0.7, 0.45, 0.8, 0.6, 0.9, 0.65, 0.75] as h}
					<div class="flex-1 rounded-sm" style="height: {h * 100}%; background-color: {h > 0.75 ? '#d4006a' : '#e5e7eb'}"></div>
				{/each}
			</div>
			{#if variacion}
				<p class="text-xs font-semibold {variacionPositiva ? 'text-emerald-600' : 'text-red-500'}">
					{variacionPositiva ? '↑' : '↓'} {variacion}
				</p>
			{/if}
		</div>
	{/if}

	{#if tipo === 'interes' && tags.length > 0}
		<div class="flex flex-wrap gap-2 mt-3">
			{#each tags as tag}
				<span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">#{tag}</span>
			{/each}
		</div>
	{/if}
</div>
