import { prisma } from '$lib/server/db';

export async function load() {
	const [alcaldias, destacadas] = await Promise.all([
		prisma.alcaldia.findMany({
			include: { _count: { select: { experiencias: true } } },
			orderBy: { nombre: 'asc' }
		}),
		prisma.experiencia.findMany({
			where: { destacada: true, activa: true },
			include: { alcaldia: true },
			orderBy: { rating: 'desc' }
		})
	]);

	return { alcaldias, destacadas };
}
