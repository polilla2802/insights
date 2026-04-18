export const alcaldias = [
	{ id: '1', nombre: 'Coyoacán', slug: 'coyoacan', numExperiencias: 12 },
	{ id: '2', nombre: 'Roma Norte', slug: 'roma-norte', numExperiencias: 18 },
	{ id: '3', nombre: 'Cuauhtémoc', slug: 'cuauhtemoc', numExperiencias: 24 },
	{ id: '4', nombre: 'Xochimilco', slug: 'xochimilco', numExperiencias: 9 },
	{ id: '5', nombre: 'Tlalpan', slug: 'tlalpan', numExperiencias: 7 },
	{ id: '6', nombre: 'Benito Juárez', slug: 'benito-juarez', numExperiencias: 15 },
	{ id: '7', nombre: 'Miguel Hidalgo', slug: 'miguel-hidalgo', numExperiencias: 11 },
	{ id: '8', nombre: 'Azcapotzalco', slug: 'azcapotzalco', numExperiencias: 5 }
];

export const categorias = [
	{ id: '1', nombre: 'Gastronomía', slug: 'gastronomia', icono: '🍽️' },
	{ id: '2', nombre: 'Cultura', slug: 'cultura', icono: '🏛️' },
	{ id: '3', nombre: 'Tours', slug: 'tours', icono: '🗺️' },
	{ id: '4', nombre: 'Arte', slug: 'arte', icono: '🎨' },
	{ id: '5', nombre: 'Eventos', slug: 'eventos', icono: '🎪' },
	{ id: '6', nombre: 'Actividades', slug: 'actividades', icono: '⚡' }
];

export const experiencias = [
	{
		id: '1',
		titulo: 'Cena en el Corazón de Coyoacán',
		descripcion: 'Una experiencia gastronómica única en el centro histórico de Coyoacán con sabores de la cocina mexicana tradicional.',
		lugar: 'Jardín Centenario',
		alcaldia: 'Coyoacán',
		alcaldiaSlug: 'coyoacan',
		duracion: 120,
		precio: 1450,
		imagen: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
		rating: 4.9,
		numResenas: 84,
		tipo: 'RESTAURANTE',
		destacada: true
	},
	{
		id: '2',
		titulo: 'Tour Nocturno: Arquitectura de Reforma',
		descripcion: 'Recorre el Paseo de la Reforma de noche y descubre la historia detrás de sus monumentos y edificios emblemáticos.',
		lugar: 'Paseo de la Reforma',
		alcaldia: 'Cuauhtémoc',
		alcaldiaSlug: 'cuauhtemoc',
		duracion: 180,
		precio: 850,
		imagen: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=600&q=80',
		rating: 4.7,
		numResenas: 56,
		tipo: 'TOUR',
		destacada: true
	},
	{
		id: '3',
		titulo: 'Secretos de Chapultepec al Amanecer',
		descripcion: 'Visita guiada al Bosque de Chapultepec antes de que abra al público, con acceso especial al Castillo.',
		lugar: 'Bosque de Chapultepec',
		alcaldia: 'Miguel Hidalgo',
		alcaldiaSlug: 'miguel-hidalgo',
		duracion: 240,
		precio: 1300,
		imagen: 'https://images.unsplash.com/photo-1578521073781-1e5fae90f679?w=600&q=80',
		rating: 4.8,
		numResenas: 102,
		tipo: 'TOUR',
		destacada: true
	},
	{
		id: '4',
		titulo: 'Taller de Cocina Oaxaqueña en Roma Norte',
		descripcion: 'Aprende a preparar mole negro y tlayudas con una chef oaxaqueña en su cocina de Roma Norte.',
		lugar: 'Cocina La Condesa',
		alcaldia: 'Roma Norte',
		alcaldiaSlug: 'roma-norte',
		duracion: 150,
		precio: 980,
		imagen: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
		rating: 4.6,
		numResenas: 41,
		tipo: 'ACTIVIDAD',
		destacada: false
	},
	{
		id: '5',
		titulo: 'Trajinera al Atardecer por Xochimilco',
		descripcion: 'Navega los canales de Xochimilco en trajinera privada con música en vivo y botanas tradicionales.',
		lugar: 'Embarcadero Nativitas',
		alcaldia: 'Xochimilco',
		alcaldiaSlug: 'xochimilco',
		duracion: 180,
		precio: 1200,
		imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
		rating: 4.9,
		numResenas: 138,
		tipo: 'ACTIVIDAD',
		destacada: false
	},
	{
		id: '6',
		titulo: 'Visita Privada: Murales de Diego Rivera',
		descripcion: 'Recorre el Palacio de Bellas Artes y el Museo Mural Diego Rivera con guía especializado en arte mexicano.',
		lugar: 'Bellas Artes',
		alcaldia: 'Cuauhtémoc',
		alcaldiaSlug: 'cuauhtemoc',
		duracion: 120,
		precio: 650,
		imagen: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80',
		rating: 4.8,
		numResenas: 73,
		tipo: 'MUSEO',
		destacada: false
	}
];
