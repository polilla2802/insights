import { prisma } from '$lib/server/db';

export async function load() {
	const [alcaldias, categorias] = await Promise.all([
		prisma.alcaldia.findMany({ orderBy: { nombre: 'asc' } }),
		prisma.categoria.findMany({ orderBy: { nombre: 'asc' } })
	]);

	return { alcaldias, categorias };
}
