import { prisma } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const [alcaldia, todasAlcaldias] = await Promise.all([
		prisma.alcaldia.findUnique({ where: { slug: params.slug } }),
		prisma.alcaldia.findMany({ orderBy: { nombre: 'asc' } })
	]);

	if (!alcaldia) throw error(404, 'Alcaldía no encontrada');

	const alcaldiasGeo = todasAlcaldias.map((a) => ({
		id: a.id,
		nombre: a.nombre,
		slug: a.slug,
		lat: a.lat ?? 0,
		lng: a.lng ?? 0,
		polygon: (a.poligono as [number, number][]) ?? []
	}));

	return { alcaldia, alcaldiasGeo };
}
