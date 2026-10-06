import { domainProject } from './extincion-dominio'
import { detentionProject } from './control-detenidos'
import { schoolCase } from './gestion-escolar'
// Perfil actualizado con información proporcionada directamente por Jorge Iván.
export const profile = {
  name: 'Jorge Iván Vázquez Hernández',
  initials: 'JI',
  shortName: 'Jorge Iván',
  role: 'Product Designer',
  introduction:
    'Diseño la experiencia desde la arquitectura de información hasta los componentes, estados e interfaces en Figma. Trabajo con ingeniería desde el inicio y puedo implementar las vistas en Vue.js, Nuxt 3 y Tailwind CSS.',
  about:
    'Soy Product Designer y actualmente trabajo como Lead UX/UI Designer. Levanto necesidades y requerimientos, entiendo la operación y traduzco sus reglas en un alcance de producto y flujos de usuario claros.',
  email: '',
  linkedin: 'https://www.linkedin.com/in/vazquezhd/',
  github: 'https://github.com/VazquezHd',
  resume: '/assets/documents/cv-jorge-ivan-2024.pdf',
  location: 'Hidalgo, México',
  skills: [
    'Levantamiento de requerimientos',
    'Definición de MVP',
    'Flujos de usuario',
    'Arquitectura de información',
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
  hero: 'Levanto necesidades y requerimientos. Los convierto en flujos claros e interfaces que resuelven tareas concretas.',
  value:
    'Acelero el time to market porque diseño y desarrollo comparten la misma lógica: componentes, estados y reglas claras. Puedo implementar las vistas en frontend, resolver dudas técnicas y reducir la distancia entre el prototipo y el producto.',
  background: 'Mi formación en diseño evolucionó hacia la arquitectura de producto y el código.',
  independent:
    'También lidero proyectos independientes de software: defino el MVP, estructuro la propuesta web y la identidad del producto, y coordino la ejecución con ingenieros de software.',
  stack: [
    {
      title: 'Necesidades y requerimientos',
      tools: 'Levantamiento · Reglas de negocio · Alcance del MVP',
      description:
        'Entiendo quién necesita hacer qué, identifico restricciones y convierto la operación en requerimientos claros.',
    },
    {
      title: 'Flujos y experiencia',
      tools: 'Arquitectura de información · Perfiles · Estados',
      description:
        'Organizo información, acciones y recorridos para que cada persona pueda completar su tarea con contexto.',
    },
    {
      title: 'UI y desarrollo',
      tools: 'Figma · Sistemas de diseño · Vue · Nuxt · Tailwind',
      description:
        'Llevo los flujos a interfaces consistentes y componentes que diseño y desarrollo pueden compartir.',
    },
  ],
}
export const projects = [
  {
    slug: 'gestion-escolar',
    number: '01',
    name: 'Gestión escolar',
    domain: 'Educación',
    context: 'Medio superior y superior',
    imageWidth: 2880,
    imageHeight: 2554,
    subtitle: 'Consultar alumnos, pagos y pendientes con el mismo contexto.',
    category: 'Diseño de producto',
    image: '/assets/images/projects/gestion-escolar/dashboard.png',
    imageAlt: 'Dashboard del rol administrador con resumen escolar, ingresos y actividad reciente.',
    color: 'blue',
    presentation: 'interface',
    status: 'Rol administrador',
    tags: ['Definición de MVP', 'Flujos', 'UX/UI'],
    description:
      'Plataforma para gestionar la comunidad escolar y los movimientos de efectivo. Primer alcance construido: administración.',
    problemTitle: 'Una escuela, muchas tareas.',
    problem:
      'El administrador necesita trabajar con información de distintas áreas: comunidad escolar, entradas y salidas de efectivo y seguimiento de la operación. La propuesta reúne estas tareas en una misma aplicación, con módulos identificables y una navegación compartida.',
    approachTitle: 'Una estructura que se mantiene entre módulos.',
    approach:
      'El diseño mantiene la navegación lateral y la búsqueda en las distintas vistas. El inicio ofrece un resumen de la operación; los módulos permiten pasar a tareas concretas. La administración de permisos distingue entre consultar, editar y no tener acceso.',
    decisions: [
      'Un dashboard para revisar indicadores y actividad antes de entrar a cada módulo.',
      'La gestión de usuarios separa alumnos, padres de familia y personal.',
      'Los permisos se organizan por módulo con tres niveles: sin acceso, ver y editar.',
      'El acceso contempla varios roles; el alcance actual se concentra en administración.',
    ],
    outcomeTitle: 'El primer alcance: administración.',
    outcome:
      'El rol administrador es el punto de partida construido. Los demás roles forman parte del alcance previsto de la aplicación. Este caso presenta ese primer conjunto de pantallas y la estructura sobre la que puede continuar el producto.',
    source: 'https://www.figma.com/design/WlDP4Mn1OTyMdoKxLg02GL/secretaria?node-id=200-4474',
    sourceLabel: 'Ver diseño en Figma',
    caseStudy: schoolCase,
    gallery: [
      {
        title: 'Encontrar al alumno y entender su situación',
        problem: 'Un registro necesita más contexto que un nombre.',
        description:
          'Reuní adeudo, promedio, faltas y período; la alerta destaca lo que requiere atención.',
        skill: 'Arquitectura de información',
        image: '/assets/images/projects/gestion-escolar/alumnos.png',
        alt: 'Gestión de alumnos con búsqueda, indicadores por registro y alerta de adeudo; datos de demostración.',
        width: 2880,
        height: 2954,
      },
      {
        title: 'Dar seguimiento a las familias',
        problem: 'La relación con cada familia también necesita seguimiento.',
        description:
          'Organicé hijos vinculados, asistencia a juntas y firma de boletas en una misma ficha.',
        skill: 'Diseño de seguimiento',
        image: '/assets/images/projects/gestion-escolar/familias.png',
        alt: 'Gestión de familias con hijos vinculados, asistencia y firma de boletas; datos de demostración.',
        width: 2880,
        height: 2954,
      },
      {
        title: 'Leer la operación financiera',
        problem: 'Una cifra aislada no explica la operación.',
        description:
          'Separé ingresos, egresos, balance y colegiaturas por cobrar en un resumen compartido.',
        skill: 'Jerarquía de información',
        image: '/assets/images/projects/gestion-escolar/finanzas.png',
        alt: 'Resumen de ingresos, egresos, balance y colegiaturas pendientes.',
        width: 2305,
        height: 466,
        layout: 'wide',
      },
      {
        title: 'Reconocer lo que sigue pendiente',
        description:
          'El seguimiento de colegiaturas distingue lo recibido de lo pendiente por período.',
        skill: 'Visibilidad del estado',
        image: '/assets/images/projects/gestion-escolar/colegiaturas.png',
        alt: 'Seguimiento de colegiaturas con montos recibidos y pendientes.',
        width: 2260,
        height: 1732,
      },
      {
        title: 'Definir quién puede hacer qué',
        description:
          'Cada módulo separa sin acceso, consulta y edición para expresar responsabilidades.',
        skill: 'Diseño de permisos',
        image: '/assets/images/projects/gestion-escolar/permisos.png',
        alt: 'Panel de permisos con opciones Sin acceso, Ver y Editar.',
        width: 1696,
        height: 1508,
      },
      {
        title: 'Pasar del total al concepto',
        description: 'Agrupé los ingresos extra por concepto y mantuve su total a la vista.',
        skill: 'Organización financiera',
        image: '/assets/images/projects/gestion-escolar/ingresos.png',
        alt: 'Detalle de ingresos extra y resumen de importes.',
        width: 1110,
        height: 1514,
      },
      {
        title: 'Revisar un ingreso sin perder contexto',
        problem: 'El importe necesita una explicación.',
        description:
          'El detalle reúne concepto, fecha, método de pago y pagos asociados, con salidas a PDF e impresión.',
        skill: 'Diseño de flujos',
        image: '/assets/images/projects/gestion-escolar/detalle-ingreso.png',
        alt: 'Detalle de ingreso con concepto, fecha, método de pago y pagos de demostración.',
        width: 1792,
        height: 2714,
      },
      {
        title: 'Adaptarse a distintas escuelas',
        description: 'Logo y acento personalizables sobre una estructura de uso compartida.',
        skill: 'Diseño para escalar',
        image: '/assets/images/projects/gestion-escolar/personalizacion.png',
        alt: 'Configuración institucional de logo y color con vista previa.',
        width: 2880,
        height: 2048,
      },
      {
        title: 'Compartir el punto de entrada',
        description: 'Un acceso común contempla los distintos perfiles previstos del producto.',
        skill: 'Consistencia de experiencia',
        image: '/assets/images/projects/gestion-escolar/acceso.png',
        alt: 'Inicio de sesión y accesos de demostración por rol.',
        width: 2880,
        height: 2048,
      },
    ],
  },
  detentionProject,
  domainProject,
]

export const process = [
  {
    number: '01',
    title: 'Entender',
    summary: 'Necesidades y requerimientos.',
    text: 'Levanto necesidades y requerimientos: personas, tareas, reglas y restricciones.',
    tags: 'Necesidades · Requerimientos',
  },
  {
    number: '02',
    title: 'Definir',
    summary: 'Alcance, información y flujos.',
    text: 'Priorizo el MVP y organizo la información, los perfiles y sus flujos.',
    tags: 'Alcance · Arquitectura · Flujos',
  },
  {
    number: '03',
    title: 'Diseñar',
    summary: 'UX, UI y componentes.',
    text: 'Convierto los recorridos en interfaces con jerarquía, componentes y estados claros.',
    tags: 'UX · UI · Sistemas de diseño',
  },
  {
    number: '04',
    title: 'Construir',
    summary: 'Frontend y entrega con ingeniería.',
    text: 'Alineo decisiones con ingeniería y puedo implementar las vistas en frontend.',
    tags: 'Componentes · Frontend · Entrega',
  },
]
