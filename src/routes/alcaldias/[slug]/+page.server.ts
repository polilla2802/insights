import { prisma } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const [alcaldia, experiencias] = await Promise.all([
		prisma.alcaldia.findUnique({ where: { slug: params.slug } }),
		prisma.experiencia.findMany({
			where: { alcaldia: { slug: params.slug }, activa: true },
			include: { alcaldia: true },
			orderBy: { rating: 'desc' }
		})
	]);

	if (!alcaldia) throw error(404, 'Alcaldía no encontrada');

	return { alcaldia, experiencias };
}
