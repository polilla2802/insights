export interface AlcaldiaGeo {
	id: string;
	nombre: string;
	slug: string;
	lat: number;
	lng: number;
	polygon: [number, number][];
}

export function buildGeoJSON(geo: AlcaldiaGeo[]) {
	return {
		type: 'FeatureCollection' as const,
		features: geo.map((a) => ({
			type: 'Feature' as const,
			properties: { id: a.id, nombre: a.nombre, slug: a.slug },
			geometry: {
				type: 'Polygon' as const,
				coordinates: [a.polygon.map(([lng, lat]) => [lng, lat])]
			}
		}))
	};
}
