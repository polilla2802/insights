import { prisma } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const exp = await prisma.experiencia.findUnique({
		where: { id: params.id },
		include: { alcaldia: true, categoria: true }
	});

	if (!exp) throw error(404, 'Experiencia no encontrada');

	return { exp };
}
