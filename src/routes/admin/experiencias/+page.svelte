<script lang="ts">
	import { experiencias, alcaldias } from '$lib/data/mock';
</script>

<svelte:head><title>Experiencias — ConSearch Admin</title></svelte:head>

<div class="p-8">
	<div class="flex items-center justify-between mb-8">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Experiencias</h1>
			<p class="text-sm text-gray-500 mt-1">{experiencias.length} experiencias en la plataforma</p>
		</div>
		<a href="/admin/experiencias/nueva" class="btn-primary text-sm">+ Nueva experiencia</a>
	</div>

	<div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
		<table class="w-full text-sm">
			<thead class="bg-gray-50 border-b border-gray-100">
				<tr>
					<th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Experiencia</th>
					<th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Alcaldía</th>
					<th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tipo</th>
					<th class="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Precio</th>
					<th class="px-5 py-3"></th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-50">
				{#each experiencias as exp}
					<tr class="hover:bg-gray-50 transition-colors">
						<td class="px-5 py-3.5">
							<div class="flex items-center gap-3">
								<img src={exp.imagen} alt="" class="w-10 h-10 rounded-lg object-cover shrink-0" />
								<div>
									<p class="font-medium text-gray-900 line-clamp-1">{exp.titulo}</p>
									<p class="text-xs text-gray-400">{exp.lugar}</p>
								</div>
							</div>
						</td>
						<td class="px-5 py-3.5 text-gray-600">{exp.alcaldia}</td>
						<td class="px-5 py-3.5">
							<span class="text-xs font-semibold px-2 py-1 rounded-full bg-teal-50 text-teal-700">{exp.tipo}</span>
						</td>
						<td class="px-5 py-3.5 text-right font-semibold text-gray-900">${exp.precio.toLocaleString('es-MX')}</td>
						<td class="px-5 py-3.5 text-right">
							<div class="flex items-center justify-end gap-2">
								<a href="/experiencias/{exp.id}" target="_blank" class="text-xs text-gray-400 hover:text-gray-600 transition-colors">Ver →</a>
								<a href="/admin/experiencias/{exp.id}/editar" class="text-xs font-semibold text-teal-700 hover:text-teal-900 px-3 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">Editar</a>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
