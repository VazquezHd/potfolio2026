// Perfil actualizado con información proporcionada directamente por Jorge Iván.
export const profile = {
  name: 'Jorge Iván Vázquez Hernández',
  initials: 'JI',
  shortName: 'Jorge Iván',
  role: 'Lead UX/UI Designer',
  introduction:
    'Construyo sistemas de diseño en Figma y desarrollo interfaces con Vue.js, Nuxt 3 y Tailwind CSS. Entiendo las restricciones de APIs y bases de datos, y trabajo con ingeniería para resolverlas desde el diseño.',
  about:
    'Lidero el diseño UX/UI de plataformas para el sector público en una empresa de software. Transformo operaciones complejas en flujos claros y diseño desde la arquitectura de componentes hasta la interfaz funcional.',
  email: '',
  linkedin: 'https://www.linkedin.com/in/vazquezhd/',
  github: 'https://github.com/VazquezHd',
  resume: '/assets/documents/cv-jorge-ivan-2024.pdf',
  location: 'Hidalgo, México',
  skills: [
    'Arquitectura de producto',
    'Sistemas de diseño',
    'Diseño UX/UI',
    'Desarrollo frontend',
    'Liderazgo de producto',
  ],
  credentials: [
    {
      title: 'Oracle Next Education · Front-end',
      institution: 'Alura Latam',
      year: '2023',
    },
    {
      title: 'Fundamentos y aplicaciones de IA',
      institution: 'Netzun',
      year: '2024–2025',
    },
  ],
  hero: 'Conecto diseño y desarrollo para llevar productos al mercado con menos fricción.',
  value:
    'Acelero el time to market porque diseño y desarrollo comparten la misma lógica: componentes, estados y reglas claras. Puedo implementar las vistas en frontend, resolver dudas técnicas y reducir la distancia entre el prototipo y el producto.',
  background: 'Mi formación en diseño evolucionó hacia la arquitectura de producto y el código.',
  independent:
    'También lidero proyectos independientes de software: defino el MVP, estructuro la propuesta web y la identidad del producto, y coordino la ejecución con ingenieros de software.',
  stack: [
    {
      title: 'Sistemas de diseño',
      tools: 'Figma · Variables · Design tokens · Auto Layout avanzado',
      description:
        'Sistemas completos con componentes reutilizables y reglas que conectan diseño e implementación.',
    },
    {
      title: 'Interfaces en producción',
      tools: 'Vue.js · Nuxt 3 · Tailwind CSS',
      description:
        'Construcción de vistas con una arquitectura de componentes preparada para crecer con el producto.',
    },
    {
      title: 'Ejecución con ingeniería',
      tools: 'Git · VS Code · macOS',
      description:
        'Un mismo lenguaje técnico para definir el MVP, coordinar la ejecución y acelerar la entrega.',
    },
  ],
}
export const projects = [
  {
    slug: 'chuchito',
    number: '01',
    name: 'Chuchito',
    subtitle: 'Un menú digital de sushi.',
    category: 'Diseño UX/UI',
    image: '/assets/images/projects/chuchito.png',
    imageAlt: 'Diseño de interfaz de Chuchito presentado en el portafolio de Jorge Iván',
    color: 'purple',
    tags: ['Figma', 'App móvil', 'Alimentos'],
    description:
      'Diseño de interfaz móvil con catálogo de sushi, categorías, promociones y una pantalla de detalle con ingredientes y acción de compra.',
    problem:
      'Diseño de interfaz móvil con catálogo de sushi, categorías, promociones y una pantalla de detalle con ingredientes y acción de compra.',
    approach:
      'La presentación original documenta la maquetación en Figma. Estos son los elementos visibles en la interfaz; la investigación, las restricciones y el proceso de decisión quedan por documentar.',
    decisions: [
      'Catálogo organizado por categorías',
      'Promoción del día visible en el inicio',
      'Detalle con ingredientes y precio',
    ],
    outcome:
      'La pieza publicada permite revisar la propuesta visual. El portafolio original no detalla pruebas de usabilidad ni métricas de impacto para este proyecto.',
    source: 'https://vazquez-hd.vercel.app/#projects',
  },
  {
    slug: 'blooms',
    number: '02',
    name: 'Blooms',
    subtitle: 'Del catálogo al carrito.',
    category: 'Diseño UX/UI',
    image: '/assets/images/projects/blooms.png',
    imageAlt: 'Diseño de interfaz de Blooms presentado en el portafolio de Jorge Iván',
    color: 'green',
    tags: ['Figma', 'Comercio digital', 'App móvil'],
    description:
      'Diseño de interfaz móvil para explorar plantas y macetas. La presentación incluye catálogo, detalle de producto y carrito de compra.',
    problem:
      'Diseño de interfaz móvil para explorar plantas y macetas. La presentación incluye catálogo, detalle de producto y carrito de compra.',
    approach:
      'La presentación original documenta la maquetación en Figma. Estos son los elementos visibles en la interfaz; la investigación, las restricciones y el proceso de decisión quedan por documentar.',
    decisions: [
      'Categorías para explorar el catálogo',
      'Detalle con información de producto',
      'Carrito con cantidades y desglose del total',
    ],
    outcome:
      'La pieza publicada permite revisar la propuesta visual. El portafolio original no detalla pruebas de usabilidad ni métricas de impacto para este proyecto.',
    source: 'https://vazquez-hd.vercel.app/#projects',
  },
  {
    slug: 'm8-club-salud',
    number: '03',
    name: 'M8 Club Salud',
    subtitle: 'Una puerta de entrada a la salud.',
    category: 'Experiencia web',
    image: '/assets/images/projects/m8-club-salud.png',
    imageAlt: 'Diseño de interfaz de M8 Club Salud presentado en el portafolio de Jorge Iván',
    color: 'blue',
    tags: ['Figma', 'Diseño web', 'Salud'],
    description:
      'Maquetación de una página de inicio para M8 Club Salud, con navegación hacia beneficios y medicamentos, y accesos de registro e ingreso.',
    problem:
      'Maquetación de una página de inicio para M8 Club Salud, con navegación hacia beneficios y medicamentos, y accesos de registro e ingreso.',
    approach:
      'La presentación original documenta la maquetación en Figma. Estos son los elementos visibles en la interfaz; la investigación, las restricciones y el proceso de decisión quedan por documentar.',
    decisions: [
      'Propuesta principal en la primera pantalla',
      'Accesos de registro e ingreso',
      'Navegación por áreas del servicio',
    ],
    outcome:
      'La pieza publicada permite revisar la propuesta visual. El portafolio original no detalla pruebas de usabilidad ni métricas de impacto para este proyecto.',
    source: 'https://vazquez-hd.vercel.app/#projects',
  },
  {
    slug: 'uaeh',
    number: '04',
    name: 'UAEH',
    subtitle: 'Las actividades, en un solo lugar.',
    category: 'Experiencia web',
    image: '/assets/images/projects/uaeh.png',
    imageAlt: 'Diseño de interfaz de UAEH presentado en el portafolio de Jorge Iván',
    color: 'purple',
    tags: ['Figma', 'Educación', 'Plataforma web'],
    description:
      'Interfaz académica para la Escuela Superior de Actopan: navegación por parciales, actividades completadas y un indicador del tiempo restante.',
    problem:
      'Interfaz académica para la Escuela Superior de Actopan: navegación por parciales, actividades completadas y un indicador del tiempo restante.',
    approach:
      'La presentación original documenta la maquetación en Figma. Estos son los elementos visibles en la interfaz; la investigación, las restricciones y el proceso de decisión quedan por documentar.',
    decisions: [
      'Navegación por periodos académicos',
      'Actividades completadas a la vista',
      'Indicador temporal junto al contenido principal',
    ],
    outcome:
      'La pieza publicada permite revisar la propuesta visual. El portafolio original no detalla pruebas de usabilidad ni métricas de impacto para este proyecto.',
    source: 'https://vazquez-hd.vercel.app/#projects',
  },
  {
    slug: 'go-more',
    number: '05',
    name: 'GO MORE',
    subtitle: 'Servicios de limpieza en la web.',
    category: 'Experiencia web',
    image: '/assets/images/projects/go-more.jpg',
    imageAlt: 'Diseño de interfaz de GO MORE presentado en el portafolio de Jorge Iván',
    color: 'blue',
    tags: ['Figma', 'Diseño web', 'Servicios'],
    description:
      'Maquetación web para GO MORE Cleaning Services. La vista presenta el servicio, navegación a información del equipo y accesos para cotizar o reservar.',
    problem:
      'Maquetación web para GO MORE Cleaning Services. La vista presenta el servicio, navegación a información del equipo y accesos para cotizar o reservar.',
    approach:
      'La presentación original documenta la maquetación en Figma. Estos son los elementos visibles en la interfaz; la investigación, las restricciones y el proceso de decisión quedan por documentar.',
    decisions: [
      'Presentación del servicio en la portada',
      'Accesos a cotización y reserva',
      'Navegación a servicios y equipo',
    ],
    outcome:
      'La pieza publicada permite revisar la propuesta visual. El portafolio original no detalla pruebas de usabilidad ni métricas de impacto para este proyecto.',
    source: 'https://vazquez-hd.vercel.app/#projects',
  },
  {
    slug: 'pre-academy',
    number: '06',
    name: 'Pre Academy',
    subtitle: 'El perfil académico, de un vistazo.',
    category: 'Experiencia web',
    image: '/assets/images/projects/pre-academy.png',
    imageAlt: 'Diseño de interfaz de Pre Academy presentado en el portafolio de Jorge Iván',
    color: 'green',
    tags: ['Figma', 'Educación', 'Plataforma web'],
    description:
      'Diseño de una interfaz de perfil estudiantil para Pre Academy, con navegación lateral, puntaje, posición en el ranking y registro académico.',
    problem:
      'Diseño de una interfaz de perfil estudiantil para Pre Academy, con navegación lateral, puntaje, posición en el ranking y registro académico.',
    approach:
      'La presentación original documenta la maquetación en Figma. Estos son los elementos visibles en la interfaz; la investigación, las restricciones y el proceso de decisión quedan por documentar.',
    decisions: [
      'Navegación lateral por áreas académicas',
      'Resumen de puntaje y ranking',
      'Perfil y registro académico en una misma vista',
    ],
    outcome:
      'La pieza publicada permite revisar la propuesta visual. El portafolio original no detalla pruebas de usabilidad ni métricas de impacto para este proyecto.',
    source: 'https://vazquez-hd.vercel.app/#projects',
  },
]

export const process = [
  {
    number: '01',
    title: 'Definir',
    text: 'Convierto la complejidad operativa en flujos y un MVP con alcance claro.',
    tags: 'Producto · Flujos · MVP',
  },
  {
    number: '02',
    title: 'Sistematizar',
    text: 'Estructuro componentes, variables y tokens para que la experiencia pueda escalar.',
    tags: 'Figma · COMPONENTES · TOKENS',
  },
  {
    number: '03',
    title: 'Construir',
    text: 'Desarrollo las vistas en frontend con las restricciones de APIs y datos en mente.',
    tags: 'Vue · Nuxt · Tailwind',
  },
  {
    number: '04',
    title: 'Entregar',
    text: 'Coordino la ejecución con ingeniería para reducir fricción y acelerar la salida al mercado.',
    tags: 'Ingeniería · Entrega',
  },
]
