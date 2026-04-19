import { prisma } from '$lib/server/db';

export async function load() {
	const alcaldias = await prisma.alcaldia.findMany({
		include: { _count: { select: { experiencias: true } } },
		orderBy: { nombre: 'asc' }
	});

	return { alcaldias };
}
