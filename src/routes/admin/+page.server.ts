import { prisma } from '$lib/server/db';

export async function load() {
	const [numAlcaldias, numExperiencias] = await Promise.all([
		prisma.alcaldia.count(),
		prisma.experiencia.count()
	]);

	return { numAlcaldias, numExperiencias };
}
