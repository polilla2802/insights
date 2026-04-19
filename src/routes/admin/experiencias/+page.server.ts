import { prisma } from '$lib/server/db';

export async function load() {
	const experiencias = await prisma.experiencia.findMany({
		include: { alcaldia: true, categoria: true },
		orderBy: { createdAt: 'desc' }
	});

	return { experiencias };
}
