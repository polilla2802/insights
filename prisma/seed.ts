import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('Seeding database...');

	// ── Alcaldías (16 totales con geo data) ─────────────────────────────────
	const alcaldiaData = [
		{
			nombre: 'Cuauhtémoc', slug: 'cuauhtemoc',
			lat: 19.4326, lng: -99.1442,
			poligono: [
				[-99.168, 19.456], [-99.148, 19.462], [-99.128, 19.458],
				[-99.120, 19.442], [-99.122, 19.420], [-99.132, 19.408],
				[-99.148, 19.404], [-99.165, 19.410], [-99.172, 19.424],
				[-99.170, 19.444], [-99.168, 19.456]
			]
		},
		{
			nombre: 'Miguel Hidalgo', slug: 'miguel-hidalgo',
			lat: 19.4205, lng: -99.1974,
			poligono: [
				[-99.228, 19.452], [-99.200, 19.462], [-99.170, 19.456],
				[-99.168, 19.444], [-99.172, 19.424], [-99.175, 19.400],
				[-99.190, 19.385], [-99.210, 19.382], [-99.228, 19.390],
				[-99.238, 19.408], [-99.238, 19.430], [-99.228, 19.452]
			]
		},
		{
			nombre: 'Benito Juárez', slug: 'benito-juarez',
			lat: 19.3919, lng: -99.1614,
			poligono: [
				[-99.175, 19.410], [-99.165, 19.410], [-99.148, 19.404],
				[-99.132, 19.408], [-99.128, 19.395], [-99.132, 19.378],
				[-99.148, 19.368], [-99.162, 19.368], [-99.175, 19.375],
				[-99.180, 19.390], [-99.175, 19.410]
			]
		},
		{
			nombre: 'Coyoacán', slug: 'coyoacan',
			lat: 19.3467, lng: -99.1631,
			poligono: [
				[-99.175, 19.375], [-99.162, 19.368], [-99.148, 19.368],
				[-99.132, 19.378], [-99.120, 19.372], [-99.115, 19.350],
				[-99.118, 19.328], [-99.135, 19.312], [-99.155, 19.308],
				[-99.178, 19.315], [-99.192, 19.332], [-99.192, 19.355],
				[-99.182, 19.372], [-99.175, 19.375]
			]
		},
		{
			nombre: 'Xochimilco', slug: 'xochimilco',
			lat: 19.2558, lng: -99.0997,
			poligono: [
				[-99.148, 19.295], [-99.128, 19.298], [-99.108, 19.292],
				[-99.090, 19.278], [-99.078, 19.258], [-99.080, 19.238],
				[-99.095, 19.222], [-99.118, 19.218], [-99.140, 19.225],
				[-99.158, 19.242], [-99.162, 19.265], [-99.155, 19.282],
				[-99.148, 19.295]
			]
		},
		{
			nombre: 'Tlalpan', slug: 'tlalpan',
			lat: 19.2599, lng: -99.1733,
			poligono: [
				[-99.220, 19.320], [-99.192, 19.332], [-99.178, 19.315],
				[-99.155, 19.308], [-99.148, 19.295], [-99.155, 19.282],
				[-99.162, 19.265], [-99.158, 19.242], [-99.162, 19.215],
				[-99.178, 19.195], [-99.200, 19.188], [-99.222, 19.195],
				[-99.238, 19.215], [-99.242, 19.240], [-99.235, 19.268],
				[-99.222, 19.295], [-99.220, 19.320]
			]
		},
		{
			nombre: 'Álvaro Obregón', slug: 'alvaro-obregon',
			lat: 19.3593, lng: -99.1934,
			poligono: [
				[-99.238, 19.408], [-99.228, 19.390], [-99.210, 19.382],
				[-99.192, 19.375], [-99.192, 19.355], [-99.192, 19.332],
				[-99.220, 19.320], [-99.238, 19.338], [-99.255, 19.358],
				[-99.258, 19.380], [-99.248, 19.398], [-99.238, 19.408]
			]
		},
		{
			nombre: 'Iztapalapa', slug: 'iztapalapa',
			lat: 19.3634, lng: -99.0723,
			poligono: [
				[-99.118, 19.408], [-99.100, 19.415], [-99.078, 19.412],
				[-99.058, 19.400], [-99.045, 19.382], [-99.045, 19.358],
				[-99.055, 19.338], [-99.072, 19.322], [-99.092, 19.315],
				[-99.112, 19.318], [-99.128, 19.332], [-99.132, 19.352],
				[-99.125, 19.375], [-99.118, 19.395], [-99.118, 19.408]
			]
		},
		{
			nombre: 'Iztacalco', slug: 'iztacalco',
			lat: 19.3985, lng: -99.1035,
			poligono: [
				[-99.128, 19.425], [-99.118, 19.428], [-99.105, 19.425],
				[-99.095, 19.415], [-99.095, 19.400], [-99.102, 19.388],
				[-99.118, 19.382], [-99.132, 19.385], [-99.138, 19.398],
				[-99.135, 19.412], [-99.128, 19.425]
			]
		},
		{
			nombre: 'Gustavo A. Madero', slug: 'gustavo-a-madero',
			lat: 19.4867, lng: -99.1143,
			poligono: [
				[-99.148, 19.530], [-99.120, 19.532], [-99.095, 19.522],
				[-99.078, 19.505], [-99.075, 19.482], [-99.082, 19.462],
				[-99.100, 19.450], [-99.120, 19.446], [-99.140, 19.450],
				[-99.155, 19.462], [-99.158, 19.482], [-99.152, 19.505],
				[-99.148, 19.530]
			]
		},
		{
			nombre: 'Azcapotzalco', slug: 'azcapotzalco',
			lat: 19.4861, lng: -99.1857,
			poligono: [
				[-99.218, 19.515], [-99.198, 19.522], [-99.178, 19.520],
				[-99.162, 19.510], [-99.155, 19.495], [-99.158, 19.478],
				[-99.168, 19.462], [-99.185, 19.455], [-99.202, 19.455],
				[-99.218, 19.462], [-99.228, 19.478], [-99.225, 19.498],
				[-99.218, 19.515]
			]
		},
		{
			nombre: 'Venustiano Carranza', slug: 'venustiano-carranza',
			lat: 19.4354, lng: -99.0883,
			poligono: [
				[-99.120, 19.462], [-99.100, 19.468], [-99.078, 19.462],
				[-99.062, 19.450], [-99.058, 19.432], [-99.065, 19.415],
				[-99.080, 19.405], [-99.098, 19.402], [-99.115, 19.408],
				[-99.125, 19.422], [-99.122, 19.442], [-99.120, 19.462]
			]
		},
		{
			nombre: 'La Magdalena Contreras', slug: 'la-magdalena-contreras',
			lat: 19.3178, lng: -99.2425,
			poligono: [
				[-99.258, 19.380], [-99.238, 19.380], [-99.220, 19.370],
				[-99.210, 19.355], [-99.212, 19.335], [-99.225, 19.318],
				[-99.245, 19.312], [-99.265, 19.318], [-99.278, 19.335],
				[-99.278, 19.358], [-99.268, 19.375], [-99.258, 19.380]
			]
		},
		{
			nombre: 'Cuajimalpa', slug: 'cuajimalpa',
			lat: 19.3614, lng: -99.2951,
			poligono: [
				[-99.278, 19.412], [-99.258, 19.418], [-99.242, 19.412],
				[-99.238, 19.395], [-99.248, 19.378], [-99.265, 19.370],
				[-99.282, 19.372], [-99.295, 19.382], [-99.298, 19.398],
				[-99.288, 19.410], [-99.278, 19.412]
			]
		},
		{
			nombre: 'Tláhuac', slug: 'tlahuac',
			lat: 19.2917, lng: -99.0063,
			poligono: [
				[-99.045, 19.330], [-99.025, 19.335], [-99.005, 19.328],
				[-98.990, 19.312], [-98.988, 19.290], [-98.998, 19.272],
				[-99.018, 19.262], [-99.040, 19.265], [-99.058, 19.280],
				[-99.062, 19.302], [-99.052, 19.320], [-99.045, 19.330]
			]
		},
		{
			nombre: 'Milpa Alta', slug: 'milpa-alta',
			lat: 19.1995, lng: -99.0218,
			poligono: [
				[-99.080, 19.240], [-99.055, 19.248], [-99.030, 19.242],
				[-99.010, 19.225], [-99.000, 19.200], [-99.005, 19.175],
				[-99.022, 19.158], [-99.048, 19.152], [-99.075, 19.160],
				[-99.092, 19.180], [-99.095, 19.205], [-99.085, 19.225],
				[-99.080, 19.240]
			]
		}
	];

	// Upsert alcaldías
	const alcaldias: Record<string, string> = {};
	for (const a of alcaldiaData) {
		const record = await prisma.alcaldia.upsert({
			where: { slug: a.slug },
			update: { nombre: a.nombre, lat: a.lat, lng: a.lng, poligono: a.poligono },
			create: { nombre: a.nombre, slug: a.slug, lat: a.lat, lng: a.lng, poligono: a.poligono }
		});
		alcaldias[a.slug] = record.id;
	}
	console.log(`✓ ${alcaldiaData.length} alcaldías`);

	// ── Categorías ───────────────────────────────────────────────────────────
	const categoriaData = [
		{ nombre: 'Gastronomía', slug: 'gastronomia', icono: '🍽️' },
		{ nombre: 'Cultura',     slug: 'cultura',     icono: '🏛️' },
		{ nombre: 'Tours',       slug: 'tours',       icono: '🗺️' },
		{ nombre: 'Arte',        slug: 'arte',        icono: '🎨' },
		{ nombre: 'Eventos',     slug: 'eventos',     icono: '🎪' },
		{ nombre: 'Actividades', slug: 'actividades', icono: '⚡' }
	];

	const categorias: Record<string, string> = {};
	for (const c of categoriaData) {
		const record = await prisma.categoria.upsert({
			where: { slug: c.slug },
			update: { nombre: c.nombre, icono: c.icono },
			create: { nombre: c.nombre, slug: c.slug, icono: c.icono }
		});
		categorias[c.slug] = record.id;
	}
	console.log(`✓ ${categoriaData.length} categorías`);

	// Tipo → categoría slug
	const tipoToCategoria: Record<string, string> = {
		RESTAURANTE: 'gastronomia',
		MUSEO:       'cultura',
		TOUR:        'tours',
		EVENTO:      'eventos',
		ACTIVIDAD:   'actividades'
	};

	// ── Experiencias ─────────────────────────────────────────────────────────
	const experienciaData = [
		{
			titulo: 'Cena en el Corazón de Coyoacán',
			descripcion: 'Una experiencia gastronómica única en el centro histórico de Coyoacán con sabores de la cocina mexicana tradicional.',
			lugar: 'Jardín Centenario', alcaldiaSlug: 'coyoacan', duracion: 120, precio: 1450,
			imagen: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
			rating: 4.9, numResenas: 84, tipo: 'RESTAURANTE', destacada: true
		},
		{
			titulo: 'Tour Nocturno: Arquitectura de Reforma',
			descripcion: 'Recorre el Paseo de la Reforma de noche y descubre la historia detrás de sus monumentos y edificios emblemáticos.',
			lugar: 'Paseo de la Reforma', alcaldiaSlug: 'cuauhtemoc', duracion: 180, precio: 850,
			imagen: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=600&q=80',
			rating: 4.7, numResenas: 56, tipo: 'TOUR', destacada: true
		},
		{
			titulo: 'Secretos de Chapultepec al Amanecer',
			descripcion: 'Visita guiada al Bosque de Chapultepec antes de que abra al público, con acceso especial al Castillo.',
			lugar: 'Bosque de Chapultepec', alcaldiaSlug: 'miguel-hidalgo', duracion: 240, precio: 1300,
			imagen: 'https://images.unsplash.com/photo-1578521073781-1e5fae90f679?w=600&q=80',
			rating: 4.8, numResenas: 102, tipo: 'TOUR', destacada: true
		},
		{
			titulo: 'Taller de Cocina Oaxaqueña en Roma Norte',
			descripcion: 'Aprende a preparar mole negro y tlayudas con una chef oaxaqueña en su cocina de Roma Norte.',
			lugar: 'Cocina La Condesa', alcaldiaSlug: 'cuauhtemoc', duracion: 150, precio: 980,
			imagen: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
			rating: 4.6, numResenas: 41, tipo: 'ACTIVIDAD', destacada: false
		},
		{
			titulo: 'Trajinera al Atardecer por Xochimilco',
			descripcion: 'Navega los canales de Xochimilco en trajinera privada con música en vivo y botanas tradicionales.',
			lugar: 'Embarcadero Nativitas', alcaldiaSlug: 'xochimilco', duracion: 180, precio: 1200,
			imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
			rating: 4.9, numResenas: 138, tipo: 'ACTIVIDAD', destacada: false
		},
		{
			titulo: 'Visita Privada: Murales de Diego Rivera',
			descripcion: 'Recorre el Palacio de Bellas Artes y el Museo Mural Diego Rivera con guía especializado en arte mexicano.',
			lugar: 'Bellas Artes', alcaldiaSlug: 'cuauhtemoc', duracion: 120, precio: 650,
			imagen: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80',
			rating: 4.8, numResenas: 73, tipo: 'MUSEO', destacada: false
		},
		{
			titulo: 'Mercado de Artesanías de Coyoacán',
			descripcion: 'Recorre el mercado de artesanías junto a un artista local, aprende sobre técnicas prehispánicas y crea tu propia pieza.',
			lugar: 'Mercado de Coyoacán', alcaldiaSlug: 'coyoacan', duracion: 150, precio: 760,
			imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
			rating: 4.6, numResenas: 52, tipo: 'ACTIVIDAD', destacada: false
		},
		{
			titulo: 'Casa Azul: Tour Privado Frida Kahlo',
			descripcion: 'Acceso exclusivo fuera de horario al museo Casa Azul con curador especializado en la vida y obra de Frida Kahlo.',
			lugar: 'Museo Frida Kahlo', alcaldiaSlug: 'coyoacan', duracion: 90, precio: 1100,
			imagen: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=600&q=80',
			rating: 4.9, numResenas: 211, tipo: 'MUSEO', destacada: true
		},
		{
			titulo: 'Brunch de Domingo en Coyoacán',
			descripcion: 'Desayuno-brunch en terraza con vista al Jardín Centenario, menú de temporada y cata de café de especialidad.',
			lugar: 'El Parnaso Café', alcaldiaSlug: 'coyoacan', duracion: 120, precio: 590,
			imagen: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80',
			rating: 4.5, numResenas: 37, tipo: 'RESTAURANTE', destacada: false
		},
		{
			titulo: 'Galería Nocturna: Arte Contemporáneo Roma',
			descripcion: 'Visita privada nocturna a cuatro galerías de arte contemporáneo en la colonia Roma con el curador como guía.',
			lugar: 'Colonia Roma Norte', alcaldiaSlug: 'cuauhtemoc', duracion: 180, precio: 870,
			imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
			rating: 4.7, numResenas: 29, tipo: 'MUSEO', destacada: false
		},
		{
			titulo: 'Ciclo Tour Gastronómico Roma-Condesa',
			descripcion: 'Recorre en bicicleta los mejores tacos, tortas y jugos de Roma Norte y La Condesa con paradas en 6 puestos icónicos.',
			lugar: 'Parque México', alcaldiaSlug: 'cuauhtemoc', duracion: 210, precio: 720,
			imagen: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80',
			rating: 4.8, numResenas: 64, tipo: 'TOUR', destacada: true
		},
		{
			titulo: 'Cóckteles de Autor con Mixólogo Profesional',
			descripcion: 'Taller íntimo de coctelería con mixólogo premiado: aprende 4 cócteles de temporada con destilados mexicanos.',
			lugar: 'Bar Licorería Limantour', alcaldiaSlug: 'cuauhtemoc', duracion: 120, precio: 950,
			imagen: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80',
			rating: 4.9, numResenas: 88, tipo: 'ACTIVIDAD', destacada: false
		},
		{
			titulo: 'Templo Mayor: Arqueología a Fondo',
			descripcion: 'Tour especializado del Templo Mayor con arqueólogo activo del INAH, incluyendo zonas no abiertas al público general.',
			lugar: 'Templo Mayor', alcaldiaSlug: 'cuauhtemoc', duracion: 150, precio: 1350,
			imagen: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&q=80',
			rating: 5.0, numResenas: 47, tipo: 'MUSEO', destacada: true
		},
		{
			titulo: 'Cena Menú Degustación: Alta Cocina Mexicana',
			descripcion: 'Menú de 8 tiempos con maridaje de mezcales artesanales en uno de los restaurantes más premiados del Centro Histórico.',
			lugar: 'Centro Histórico', alcaldiaSlug: 'cuauhtemoc', duracion: 210, precio: 2800,
			imagen: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
			rating: 4.9, numResenas: 93, tipo: 'RESTAURANTE', destacada: false
		},
		{
			titulo: 'Festival de Jazz en la Alameda',
			descripcion: 'Noche de jazz en vivo en los jardines de la Alameda Central con food trucks de comida gourmet y bar al aire libre.',
			lugar: 'Alameda Central', alcaldiaSlug: 'cuauhtemoc', duracion: 240, precio: 480,
			imagen: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
			rating: 4.6, numResenas: 115, tipo: 'EVENTO', destacada: false
		},
		{
			titulo: 'Chinampa Orgánica: Agricultura Ancestral',
			descripcion: 'Visita una chinampa activa, aprende técnicas de cultivo prehispánico y llévate una canasta con productos de temporada.',
			lugar: 'Chinampas de Xochimilco', alcaldiaSlug: 'xochimilco', duracion: 180, precio: 680,
			imagen: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
			rating: 4.8, numResenas: 56, tipo: 'ACTIVIDAD', destacada: false
		},
		{
			titulo: 'Avistamiento de Ajolotes al Amanecer',
			descripcion: 'Expedición científica con biólogo del UNAM para avistar ajolotes en su hábitat natural en los canales de Xochimilco.',
			lugar: 'Canales de Xochimilco', alcaldiaSlug: 'xochimilco', duracion: 150, precio: 920,
			imagen: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
			rating: 4.9, numResenas: 31, tipo: 'TOUR', destacada: true
		},
		{
			titulo: 'Senderismo en el Ajusco con Guía Experto',
			descripcion: 'Caminata guiada por el Parque Nacional Cumbres del Ajusco con desayuno campestre incluido al llegar a la cima.',
			lugar: 'Parque Nacional Ajusco', alcaldiaSlug: 'tlalpan', duracion: 300, precio: 750,
			imagen: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
			rating: 4.8, numResenas: 74, tipo: 'ACTIVIDAD', destacada: true
		},
		{
			titulo: 'Pueblo Mágico: Recorrido por el Centro de Tlalpan',
			descripcion: 'Tour a pie por el centro histórico de Tlalpan, sus conventos coloniales y mercado de antojitos tradicionales.',
			lugar: 'Plaza de la Constitución Tlalpan', alcaldiaSlug: 'tlalpan', duracion: 120, precio: 380,
			imagen: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80',
			rating: 4.5, numResenas: 42, tipo: 'TOUR', destacada: false
		},
		{
			titulo: 'Barbacoa de Hoyo: Madrugada en Tlalpan',
			descripcion: 'Despierta a las 5 AM para ver el proceso completo de la barbacoa artesanal de hoyo y degustarla recién sacada.',
			lugar: 'Mercado de Tlalpan', alcaldiaSlug: 'tlalpan', duracion: 180, precio: 550,
			imagen: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80',
			rating: 4.9, numResenas: 98, tipo: 'RESTAURANTE', destacada: false
		},
		{
			titulo: 'Arte Urbano: Murales del Barrio del Niño Jesús',
			descripcion: 'Tour a pie por los murales callejeros más destacados de la Del Valle y Narvarte con artista urbano local.',
			lugar: 'Colonia Del Valle', alcaldiaSlug: 'benito-juarez', duracion: 150, precio: 490,
			imagen: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&q=80',
			rating: 4.7, numResenas: 38, tipo: 'TOUR', destacada: false
		},
		{
			titulo: 'Cena Omakase Nikkei en Narvarte',
			descripcion: 'Menú omakase de fusión japonesa-peruana con 10 tiempos en restaurante íntimo de solo 8 comensales por noche.',
			lugar: 'Colonia Narvarte', alcaldiaSlug: 'benito-juarez', duracion: 180, precio: 2200,
			imagen: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80',
			rating: 4.9, numResenas: 61, tipo: 'RESTAURANTE', destacada: true
		},
		{
			titulo: 'Yoga Aéreo y Meditación en Del Valle',
			descripcion: 'Clase privada de yoga aéreo en estudio boutique seguida de sesión de meditación guiada y té de hierbas.',
			lugar: 'Colonia Del Valle', alcaldiaSlug: 'benito-juarez', duracion: 120, precio: 680,
			imagen: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
			rating: 4.6, numResenas: 27, tipo: 'ACTIVIDAD', destacada: false
		},
		{
			titulo: 'Polanco Gourmet: Cena en Restaurante de Autor',
			descripcion: 'Mesa especial en restaurante de alta cocina en Polanco con menú de temporada inspirado en ingredientes endémicos mexicanos.',
			lugar: 'Colonia Polanco', alcaldiaSlug: 'miguel-hidalgo', duracion: 180, precio: 3200,
			imagen: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80',
			rating: 4.8, numResenas: 44, tipo: 'RESTAURANTE', destacada: false
		},
		{
			titulo: 'Museo Soumaya: Visita Privada con Curador',
			descripcion: 'Recorrido exclusivo por las colecciones más importantes del Museo Soumaya con curador senior y acceso a áreas reservadas.',
			lugar: 'Museo Soumaya Plaza Carso', alcaldiaSlug: 'miguel-hidalgo', duracion: 120, precio: 1450,
			imagen: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80',
			rating: 4.9, numResenas: 87, tipo: 'MUSEO', destacada: true
		},
		{
			titulo: 'Feria de Diseño en Lomas de Chapultepec',
			descripcion: 'Acceso VIP a feria de diseño independiente mexicano con más de 60 marcas, talleres en vivo y coctelería artesanal.',
			lugar: 'Lomas de Chapultepec', alcaldiaSlug: 'miguel-hidalgo', duracion: 240, precio: 350,
			imagen: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80',
			rating: 4.5, numResenas: 120, tipo: 'EVENTO', destacada: false
		},
		{
			titulo: 'Ex Refinería: Arte e Historia Industrial',
			descripcion: 'Tour por el complejo cultural de la antigua refinería de Azcapotzalco, hoy centro de arte con instalaciones permanentes.',
			lugar: 'Centro Cultural Azcapotzalco', alcaldiaSlug: 'azcapotzalco', duracion: 150, precio: 420,
			imagen: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&q=80',
			rating: 4.6, numResenas: 19, tipo: 'MUSEO', destacada: false
		},
		{
			titulo: 'Taller de Orfebrería: Joyería en Plata',
			descripcion: 'Aprende técnicas básicas de joyería artesanal en plata con orfebre con 20 años de experiencia y llévate tu pieza creada.',
			lugar: 'Taller Joyero Azcapotzalco', alcaldiaSlug: 'azcapotzalco', duracion: 180, precio: 1100,
			imagen: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
			rating: 4.8, numResenas: 33, tipo: 'ACTIVIDAD', destacada: true
		},
		{
			titulo: 'Mercado de Trueque Vintage Azcapotzalco',
			descripcion: 'Evento mensual de intercambio de ropa, libros y objetos vintage en el parque principal de Azcapotzalco con música en vivo.',
			lugar: 'Parque Tezozomoc', alcaldiaSlug: 'azcapotzalco', duracion: 240, precio: 0,
			imagen: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80',
			rating: 4.4, numResenas: 55, tipo: 'EVENTO', destacada: false
		}
	];

	for (const e of experienciaData) {
		const alcaldiaId = alcaldias[e.alcaldiaSlug];
		const categoriaId = categorias[tipoToCategoria[e.tipo]];
		if (!alcaldiaId || !categoriaId) {
			console.warn(`Skipping "${e.titulo}": missing alcaldía (${e.alcaldiaSlug}) or categoría`);
			continue;
		}
		await prisma.experiencia.create({
			data: {
				titulo: e.titulo,
				descripcion: e.descripcion,
				lugar: e.lugar,
				duracion: e.duracion,
				precio: e.precio,
				imagen: e.imagen,
				rating: e.rating,
				numResenas: e.numResenas,
				tipo: e.tipo as 'RESTAURANTE' | 'MUSEO' | 'EVENTO' | 'TOUR' | 'ACTIVIDAD',
				destacada: e.destacada,
				alcaldiaId,
				categoriaId
			}
		});
	}
	console.log(`✓ ${experienciaData.length} experiencias`);
	console.log('Seed complete.');
}

main()
	.catch((e) => { console.error(e); process.exit(1); })
	.finally(() => prisma.$disconnect());
