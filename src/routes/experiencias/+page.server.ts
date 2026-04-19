import { prisma } from '$lib/server/db';

export async function load() {
	const [experiencias, alcaldias, categorias] = await Promise.all([
		prisma.experiencia.findMany({
			where: { activa: true },
			include: { alcaldia: true },
			orderBy: { rating: 'desc' }
		}),
		prisma.alcaldia.findMany({ orderBy: { nombre: 'asc' } }),
		prisma.categoria.findMany({ orderBy: { nombre: 'asc' } })
	]);

	return { experiencias, alcaldias, categorias };
}
