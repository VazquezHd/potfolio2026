const base = '/assets/images/projects/extincion-dominio/'
const screen = (file, title, description, skill, extra = {}) => ({
  title,
  description,
  skill,
  image: `${base}${file}.png`,
  alt: `${title}. Interfaz anonimizada con identidad y datos de demostración.`,
  width: 2896,
  height: 2048,
  ...extra,
})

export const domainProject = {
  slug: 'extincion-dominio',
  number: '03',
  name: 'Extinción de dominio',
  subtitle: 'Del registro del bien al seguimiento de su proceso.',
  category: 'Diseño de producto',
  domain: 'Gestión de bienes',
  context: 'Bienes · Expedientes · Seguimiento',
  status: 'Diseño del sistema · Varios perfiles',
  image: `${base}dashboard.png`,
  imageAlt: 'Resumen de expedientes, faltantes y próximos vencimientos con datos de demostración.',
  imageWidth: 2880,
  imageHeight: 2784,
  color: 'blue',
  presentation: 'interface',
  tags: ['Requerimientos', 'Flujos', 'UX/UI'],
  description:
    'Aplicación para dar seguimiento a bienes incautados: recopilar información en la fase preparatoria y conservar su contexto durante la fase procesal.',
  presentationNote:
    'Versión anonimizada para el portafolio. TRAZA es una identidad ficticia; nombres, ubicaciones y folios son de demostración. Sin identificación del cliente ni afiliación institucional.',
  gallery: [
    screen(
      'expedientes',
      'Encontrar lo que necesita atención',
      'La búsqueda, los filtros y las vistas guardadas separan los expedientes por vencer de los que tienen documentos faltantes.',
      'Priorización de tareas',
      { problem: 'Los pendientes compiten por atención.' },
    ),
    screen(
      'registro-bien',
      'Integrar el bien, paso a paso',
      'Dividí la captura por etapas y mantuve el progreso visible para ordenar una tarea extensa.',
      'Diseño de flujos',
      { problem: 'Una captura larga necesita una ruta clara.' },
    ),
    screen(
      'investigacion',
      'Conectar la información con su origen',
      'El registro reúne documento, fecha, emisor y responsable para conservar el contexto de la información recabada.',
      'Información estructurada',
    ),
    screen(
      'asignacion',
      'Definir quién continúa el proceso',
      'La asignación reúne responsable, juzgado y unidad; el expediente pasa a la siguiente fase con contexto.',
      'Transición entre perfiles',
    ),
    screen(
      'resumen',
      'Consultar sin volver a capturar',
      'La fase procesal puede revisar la información del bien reunida durante la preparación.',
      'Continuidad del expediente',
      { problem: 'Cambiar de fase no debería obligar a empezar de nuevo.' },
    ),
    screen(
      'procesal',
      'Ver en qué etapa está cada expediente',
      'Organicé el seguimiento por audiencias, pruebas, resolución y recursos, con fechas y responsables a la vista.',
      'Visibilidad del estado',
      { problem: 'Una lista general no explica el avance.' },
    ),
    screen(
      'demanda',
      'Mantener documentos y plazos conectados',
      'Reuní avance, control documental y próximos vencimientos alrededor de la actuación en curso.',
      'Jerarquía de información',
      { height: 2084 },
    ),
    screen(
      'audiencia',
      'Registrar una actuación con contexto',
      'Fecha, resultado, observaciones e historial comparten una vista para dar continuidad al expediente.',
      'Diseño de seguimiento',
      { width: 2904 },
    ),
    screen(
      'transferencia',
      'Cerrar el recorrido del bien',
      'El cierre relaciona el bien con fecha de entrega, responsable, receptor y acta, manteniendo el historial accesible.',
      'Cierre del flujo',
      { width: 2904 },
    ),
  ],
  caseStudy: {
    flowTitle: 'Pasar de la preparación al proceso',
    flow: [
      { label: 'Registrar bien', detail: 'Identificar el objeto' },
      { label: 'Integrar información', detail: 'Reunir datos y documentos' },
      { label: 'Asignar responsable', detail: 'Definir quién continúa' },
      { label: 'Continuar proceso', detail: 'Consultar antecedentes y avanzar' },
    ],
    challenge: 'Cambiar de fase sin perder la información del bien.',
    scenario:
      'La preparación reúne información del bien; el proceso necesita consultarla, actuar sobre ella y mantener visibles sus pendientes.',
    hypothesis:
      'Diseñé un recorrido por etapas con información compartida, responsables y seguimiento documental.',
    problemLabel: 'Problema de producto · Alcance descrito por Jorge Iván',
    leadCaption: 'Pendientes, faltantes y vencimientos antes de entrar al detalle.',
    processTitle: 'Continuidad entre fases y perfiles.',
    opportunities: [
      {
        title: 'Guiar la preparación',
        need: 'Recopilar información sin perder el avance.',
        text: 'Separé la recopilación en pasos con una secuencia visible.',
      },
      {
        title: 'Conservar el contexto',
        need: 'Continuar el expediente desde otro perfil.',
        text: 'Conecté la consulta de lo preparado con las tareas de la siguiente fase.',
      },
      {
        title: 'Hacer visibles los pendientes',
        need: 'Reconocer documentos y actuaciones pendientes.',
        text: 'Organicé estados, documentos y vencimientos alrededor del expediente.',
      },
    ],
    steps: [
      { title: 'Enmarcar', text: 'Separar recopilación de información y seguimiento procesal.' },
      { title: 'Estructurar', text: 'Ordenar datos del bien, documentos y responsabilidades.' },
      { title: 'Conectar', text: 'Mantener la consulta y el avance entre fases y perfiles.' },
      {
        title: 'Validar',
        text: 'Probar captura, traspaso y recuperación de pendientes. Propuesta pendiente.',
      },
    ],
    personas: [
      {
        name: 'Preparación del expediente',
        job: 'Reunir información, asociar documentos y dejar un expediente consultable.',
      },
      {
        name: 'Seguimiento procesal',
        job: 'Consultar antecedentes, registrar actuaciones y revisar documentos y fechas.',
      },
    ],
    research: [
      {
        title: 'Observar',
        text: 'Seguir cómo se integra y se entrega un expediente entre perfiles.',
      },
      { title: 'Entrevistar', text: 'Identificar qué información falta al cambiar de fase.' },
      {
        title: 'Probar',
        text: 'Completar una captura y localizar el siguiente pendiente sin ayuda.',
      },
    ],
    conclusion:
      'Siguiente validación propuesta: completar la captura, encontrar un documento y retomar el expediente desde otro perfil. Sin métricas de impacto ni resultados de pruebas atribuidos.',
    paletteImage: `${base}paleta.png`,
    typeImage: `${base}tipografia.png`,
    paletteLabel: 'Paleta del sistema',
    fontName: 'Montserrat',
    fontToken: '--font-montserrat',
    palette: [
      { label: 'Base', value: '#112833', token: '--domain-base' },
      { label: 'Principal', value: '#08394A', token: '--domain-primary' },
      { label: 'Acento', value: '#B38E5D', token: '--domain-accent' },
      { label: 'Apoyo', value: '#D4C19C', token: '--domain-support' },
      { label: 'Superficie', value: '#FFFFFF', token: '--color-white' },
    ],
  },
}
