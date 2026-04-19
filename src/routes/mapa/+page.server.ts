import { prisma } from '$lib/server/db';

export async function load() {
	const [alcaldias, experiencias] = await Promise.all([
		prisma.alcaldia.findMany({ orderBy: { nombre: 'asc' } }),
		prisma.experiencia.findMany({
			where: { activa: true },
			include: { alcaldia: true },
			orderBy: { titulo: 'asc' }
		})
	]);

	const alcaldiasGeo = alcaldias.map((a) => ({
		id: a.id,
		nombre: a.nombre,
		slug: a.slug,
		lat: a.lat ?? 0,
		lng: a.lng ?? 0,
		polygon: (a.poligono as [number, number][]) ?? []
	}));

	return { alcaldiasGeo, alcaldias, experiencias };
}
