<script lang="ts">
	import { alcaldias, experiencias } from '$lib/data/mock';
</script>

<svelte:head><title>Dashboard — ConoCé-DMX Admin</title></svelte:head>

<div class="p-8">
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
		<p class="text-sm text-gray-500 mt-1">Gestión de contenidos de ConoCé-DMX</p>
	</div>

	<!-- Stats -->
	<div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
		{#each [
			{ label: 'Alcaldías', value: alcaldias.length, href: '/admin/alcaldias', color: 'bg-teal-950' },
			{ label: 'Experiencias', value: experiencias.length, href: '/admin/experiencias', color: 'bg-magenta-600' },
			{ label: 'Reservas', value: 0, href: '#', color: 'bg-gray-400' }
		] as stat}
			<a href={stat.href} class="card p-5 hover:shadow-md transition-shadow">
				<div class="w-9 h-9 rounded-xl {stat.color} mb-3"></div>
				<p class="text-3xl font-black text-gray-900">{stat.value}</p>
				<p class="text-sm text-gray-500 mt-0.5">{stat.label}</p>
			</a>
		{/each}
	</div>

	<!-- Quick actions -->
	<h2 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Acciones rápidas</h2>
	<div class="flex flex-wrap gap-3">
		<a href="/admin/alcaldias/nueva" class="btn-primary text-sm">+ Nueva alcaldía</a>
		<a href="/admin/experiencias/nueva" class="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm">+ Nueva experiencia</a>
	</div>
</div>
