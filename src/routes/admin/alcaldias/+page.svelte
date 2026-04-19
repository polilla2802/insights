<script lang="ts">
	let { data } = $props();
</script>

<svelte:head><title>Alcaldías — ConoCé-DMX Admin</title></svelte:head>

<div class="p-8">
	<div class="flex items-center justify-between mb-8">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Alcaldías</h1>
			<p class="text-sm text-gray-500 mt-1">{data.alcaldias.length} demarcaciones configuradas</p>
		</div>
		<a href="/admin/alcaldias/nueva" class="btn-primary text-sm">+ Nueva alcaldía</a>
	</div>

	<div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
		<table class="w-full text-sm">
			<thead class="bg-gray-50 border-b border-gray-100">
				<tr>
					<th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre</th>
					<th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Slug</th>
					<th class="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Experiencias</th>
					<th class="px-5 py-3"></th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-50">
				{#each data.alcaldias as a}
					<tr class="hover:bg-gray-50 transition-colors">
						<td class="px-5 py-3.5 font-medium text-gray-900">{a.nombre}</td>
						<td class="px-5 py-3.5 font-mono text-gray-400 text-xs">{a.slug}</td>
						<td class="px-5 py-3.5 text-center">
							<span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-teal-50 text-teal-700 text-xs font-bold">
								{a._count.experiencias}
							</span>
						</td>
						<td class="px-5 py-3.5 text-right">
							<div class="flex items-center justify-end gap-2">
								<a href="/alcaldias/{a.slug}" target="_blank" class="text-xs text-gray-400 hover:text-gray-600 transition-colors">Ver →</a>
								<a href="/admin/alcaldias/{a.slug}/editar" class="text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors px-3 py-1 rounded-lg bg-teal-50 hover:bg-teal-100">
									Editar
								</a>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
