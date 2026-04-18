export interface AnuncioMock {
	id: string;
	tipo: 'BANNER' | 'CARD' | 'STRIP';
	empresa: string;
	logo: string;            // URL del logo (fondo transparente)
	tagline: string;         // frase corta: max ~5 palabras
	imagen: string;
	ctaLabel: string;
	ctaUrl: string;
	alcaldiaIds: string[];
	accentColor: string;     // color primario de la marca
	accentText?: string;     // color del texto sobre accentColor (default white)
}

export const anunciosMock: AnuncioMock[] = [
	// ── BANNERs ───────────────────────────────────────────────────────────────
	{
		id: 'ad-walmart-banner',
		tipo: 'BANNER',
		empresa: 'Walmart',
		logo: 'https://logo.clearbit.com/walmart.com.mx',
		tagline: 'Precios bajos, siempre.',
		imagen: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=1200&q=80',
		ctaLabel: 'Ver tiendas',
		ctaUrl: 'https://www.walmart.com.mx',
		alcaldiaIds: [],
		accentColor: '#0071CE'
	},
	{
		id: 'ad-rappi-banner',
		tipo: 'BANNER',
		empresa: 'Rappi',
		logo: 'https://logo.clearbit.com/rappi.com',
		tagline: 'Todo, en minutos.',
		imagen: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
		ctaLabel: 'Pedir ahora',
		ctaUrl: 'https://rappi.com.mx',
		alcaldiaIds: ['coyoacan', 'roma-norte', 'cuauhtemoc'],
		accentColor: '#FF441F'
	},
	{
		id: 'ad-liverpool-banner',
		tipo: 'BANNER',
		empresa: 'Liverpool',
		logo: 'https://logo.clearbit.com/liverpool.com.mx',
		tagline: 'Lo mejor de la moda.',
		imagen: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80',
		ctaLabel: 'Explorar',
		ctaUrl: 'https://liverpool.com.mx',
		alcaldiaIds: ['coyoacan', 'cuauhtemoc', 'benito-juarez'],
		accentColor: '#C8102E'
	},
	{
		id: 'ad-uber-banner',
		tipo: 'BANNER',
		empresa: 'Uber',
		logo: 'https://logo.clearbit.com/uber.com',
		tagline: 'Muévete sin límites.',
		imagen: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80',
		ctaLabel: 'Pedir viaje',
		ctaUrl: 'https://uber.com',
		alcaldiaIds: [],
		accentColor: '#000000'
	},

	// ── CARDs ─────────────────────────────────────────────────────────────────
	{
		id: 'ad-rappi-card',
		tipo: 'CARD',
		empresa: 'Rappi',
		logo: 'https://logo.clearbit.com/rappi.com',
		tagline: 'Envío gratis ilimitado.',
		imagen: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&q=80',
		ctaLabel: 'Abrir Rappi',
		ctaUrl: 'https://rappi.com.mx',
		alcaldiaIds: ['roma-norte', 'cuauhtemoc', 'benito-juarez', 'miguel-hidalgo'],
		accentColor: '#FF441F'
	},
	{
		id: 'ad-uber-card',
		tipo: 'CARD',
		empresa: 'Uber',
		logo: 'https://logo.clearbit.com/uber.com',
		tagline: 'Tu viaje, seguro.',
		imagen: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80',
		ctaLabel: 'Pedir viaje',
		ctaUrl: 'https://uber.com',
		alcaldiaIds: [],
		accentColor: '#000000'
	},
	{
		id: 'ad-didi-card',
		tipo: 'CARD',
		empresa: 'DiDi',
		logo: 'https://logo.clearbit.com/didiglobal.com',
		tagline: 'El mejor precio de la CDMX.',
		imagen: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80',
		ctaLabel: 'Solicitar DiDi',
		ctaUrl: 'https://web.didiglobal.com/mx',
		alcaldiaIds: [],
		accentColor: '#FF6201'
	},
	{
		id: 'ad-walmart-card',
		tipo: 'CARD',
		empresa: 'Walmart',
		logo: 'https://logo.clearbit.com/walmart.com.mx',
		tagline: 'Entrega en 1 hora.',
		imagen: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=600&q=80',
		ctaLabel: 'Comprar',
		ctaUrl: 'https://www.walmart.com.mx',
		alcaldiaIds: [],
		accentColor: '#0071CE'
	},
	{
		id: 'ad-oxxo-card',
		tipo: 'CARD',
		empresa: 'Oxxo',
		logo: 'https://logo.clearbit.com/oxxo.com',
		tagline: 'Siempre cerca de ti.',
		imagen: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80',
		ctaLabel: 'Encontrar tienda',
		ctaUrl: '#',
		alcaldiaIds: [],
		accentColor: '#E2231A'
	},
	{
		id: 'ad-telcel-card',
		tipo: 'CARD',
		empresa: 'Telcel',
		logo: 'https://logo.clearbit.com/telcel.com',
		tagline: 'Red #1 de México.',
		imagen: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
		ctaLabel: 'Ver planes',
		ctaUrl: '#',
		alcaldiaIds: ['xochimilco', 'tlalpan', 'tlahuac'],
		accentColor: '#003DA5'
	},

	// ── STRIPs ────────────────────────────────────────────────────────────────
	{
		id: 'ad-uber-strip',
		tipo: 'STRIP',
		empresa: 'Uber',
		logo: 'https://logo.clearbit.com/uber.com',
		tagline: 'Disponible las 24h en toda la CDMX.',
		imagen: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80',
		ctaLabel: 'Descargar app',
		ctaUrl: 'https://uber.com',
		alcaldiaIds: [],
		accentColor: '#000000'
	},
	{
		id: 'ad-didi-strip',
		tipo: 'STRIP',
		empresa: 'DiDi',
		logo: 'https://logo.clearbit.com/didiglobal.com',
		tagline: 'DiDi Food — los mejores sabores.',
		imagen: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&q=80',
		ctaLabel: 'Ver menús',
		ctaUrl: 'https://web.didiglobal.com/mx/didifood',
		alcaldiaIds: [],
		accentColor: '#FF6201'
	},
	{
		id: 'ad-bbva-strip',
		tipo: 'STRIP',
		empresa: 'BBVA',
		logo: 'https://logo.clearbit.com/bbva.mx',
		tagline: 'Crédito para tu negocio local.',
		imagen: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
		ctaLabel: 'Solicitar',
		ctaUrl: '#',
		alcaldiaIds: [],
		accentColor: '#004990'
	},
	{
		id: 'ad-aeromexico-strip',
		tipo: 'STRIP',
		empresa: 'Aeroméxico',
		logo: 'https://logo.clearbit.com/aeromexico.com',
		tagline: 'CDMX al mundo.',
		imagen: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
		ctaLabel: 'Buscar vuelos',
		ctaUrl: '#',
		alcaldiaIds: [],
		accentColor: '#0033A0'
	}
];

export function getBanners() {
	return anunciosMock.filter((a) => a.tipo === 'BANNER');
}

export function getAdCards(alcaldiaSlug?: string) {
	return anunciosMock.filter(
		(a) =>
			a.tipo === 'CARD' &&
			(a.alcaldiaIds.length === 0 || (alcaldiaSlug ? a.alcaldiaIds.includes(alcaldiaSlug) : true))
	);
}

export function getStrips(alcaldiaSlug?: string) {
	return anunciosMock.filter(
		(a) =>
			a.tipo === 'STRIP' &&
			(a.alcaldiaIds.length === 0 || (alcaldiaSlug ? a.alcaldiaIds.includes(alcaldiaSlug) : true))
	);
}
