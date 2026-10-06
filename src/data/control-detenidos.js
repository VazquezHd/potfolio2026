const base = '/assets/images/projects/control-detenidos/'
const screen = (file, title, description, skill, height, extra = {}) => ({
  title,
  description,
  skill,
  image: `${base}${file.includes('.') ? file : `${file}.png`}`,
  alt: `${title}. Vista del diseño con contenido de demostración.`,
  width: 2880,
  height,
  ...extra,
})

export const detentionProject = {
  slug: 'control-detenidos',
  number: '02',
  name: 'Control de detenidos',
  subtitle: 'Seguir pertenencias y movimientos sin perder el contexto.',
  category: 'Diseño de producto',
  domain: 'Operación entre áreas',
  context: 'Personas · Pertenencias · Dependencias',
  status: 'Diseño del sistema · Varios perfiles',
  image: `${base}dashboard.png`,
  imageAlt: 'Panel principal con registro de detenciones, indicadores y alertas del diseño.',
  imageWidth: 2880,
  imageHeight: 2048,
  color: 'blue',
  presentation: 'interface',
  tags: ['Arquitectura', 'Flujos', 'UX/UI'],
  description:
    'Sistema para relacionar expedientes y pertenencias, registrar sus movimientos y coordinar solicitudes con MP, SEMEFO y otras áreas.',
  source: 'https://www.figma.com/design/2LKWtCgnYCQHz8bGTJ4MXi/Control-de-detenidos?node-id=1-3',
  sourceLabel: 'Ver diseño en Figma',
  gallery: [
    screen(
      'expedientes',
      'Encontrar el expediente correcto',
      'Organicé búsqueda, prioridad, estado y documentos para orientar la consulta de cada caso.',
      'Arquitectura de información',
      2314,
    ),
    screen(
      'inventario',
      'Relacionar cada pertenencia con su expediente',
      'Reuní identificación, cantidad, situación y etiquetas para mantener el vínculo con la persona.',
      'Diseño de trazabilidad',
      2232,
    ),
    screen(
      'custodia',
      'Reconstruir cada movimiento',
      'La línea de tiempo conecta eventos, responsables, ubicación, observaciones y estado de firma.',
      'Diseño de flujos',
      4316,
      { problem: 'Saber dónde está algo exige entender cómo llegó ahí.' },
    ),
    screen(
      'oficios.jpg',
      'Mantener la conversación dentro del caso',
      'Mensajes, adjuntos y respuestas comparten contexto con el oficio y su línea de tiempo.',
      'Coordinación entre áreas',
      4482,
      { problem: 'Una respuesta pierde utilidad si se separa de su solicitud.' },
    ),
    screen(
      'comunicacion.jpg',
      'Coordinar solicitudes entre dependencias',
      'Separé destinos y estados para seguir lo enviado, lo recibido y lo que sigue en proceso.',
      'Visibilidad del estado',
      2952,
    ),
    screen(
      'respuesta.jpg',
      'Dar continuidad a una solicitud',
      'Los comentarios y estados hacen visible qué necesita revisión y qué acción puede seguir.',
      'Diseño de seguimiento',
      2266,
    ),
    screen(
      'auditoria',
      'Pasar del caso a la visión de la operación',
      'Agrupé actividad, solicitudes, alertas y tiempos por área en una vista de auditoría.',
      'Jerarquía de información',
      2928,
    ),
    screen(
      'historial',
      'Consultar registros anteriores',
      'La búsqueda y los filtros mantienen el contexto del expediente durante la consulta histórica.',
      'Recuperación de información',
      2314,
    ),
    screen(
      'permisos-modulo',
      'Ajustar el acceso a cada responsabilidad',
      'Los permisos específicos distinguen los módulos disponibles para cada perfil.',
      'Diseño de permisos',
      500,
      { width: 1856, layout: 'wide' },
    ),
  ],
  caseStudy: {
    flowTitle: 'Seguir una pertenencia dentro del caso',
    flow: [
      { label: 'Abrir expediente', detail: 'Ubicar el caso' },
      { label: 'Vincular pertenencias', detail: 'Relacionar el inventario' },
      { label: 'Registrar movimiento', detail: 'Conservar responsable y estado' },
      { label: 'Consultar historial', detail: 'Reconstruir el recorrido' },
    ],
    challenge: 'La trazabilidad se pierde cuando el contexto se fragmenta.',
    scenario:
      'Personas, pertenencias, movimientos y mensajes necesitan conservar su relación durante todo el seguimiento.',
    hypothesis:
      'Diseñé una estructura que conecta el expediente con su inventario, su historial y la comunicación entre áreas.',
    problemLabel: 'Problema de producto · Alcance descrito por Jorge Iván',
    leadCaption: 'Concentré el registro, los indicadores y las alertas en el punto de entrada.',
    processTitle: 'Un sistema conectado, con responsabilidades distintas.',
    opportunities: [
      {
        title: 'Conservar el contexto',
        need: 'Saber a qué expediente pertenece cada objeto.',
        text: 'Relacioné expedientes, pertenencias y movimientos dentro de una navegación compartida.',
      },
      {
        title: 'Dar continuidad',
        need: 'Consultar una respuesta junto con su solicitud.',
        text: 'Vinculé solicitudes, mensajes y respuestas con su estado e historial.',
      },
      {
        title: 'Hacer visible la operación',
        need: 'Reconstruir movimientos y sus responsables.',
        text: 'Separé la consulta de casos, la auditoría y los permisos por perfil.',
      },
    ],
    steps: [
      {
        title: 'Enmarcar',
        text: 'Relacionar personas, objetos y eventos como partes de un mismo sistema.',
      },
      {
        title: 'Organizar',
        text: 'Dar a cada módulo una función y conservar el contexto entre vistas.',
      },
      {
        title: 'Conectar',
        text: 'Integrar responsables, estados, mensajes e historial en los flujos.',
      },
      { title: 'Validar', text: 'Probar el seguimiento completo de un caso. Propuesta pendiente.' },
    ],
    personas: [
      {
        name: 'Operación y custodia',
        job: 'Registrar movimientos y consultar ubicación, pertenencias y responsables.',
      },
      {
        name: 'Coordinación y revisión',
        job: 'Seguir solicitudes entre áreas y revisar el estado de la operación.',
      },
    ],
    research: [
      {
        title: 'Entrevistar',
        text: 'Identificar dónde se pierde contexto al cambiar de área o de responsable.',
      },
      {
        title: 'Observar',
        text: 'Seguir un movimiento y una solicitud desde su registro hasta la respuesta.',
      },
      { title: 'Probar', text: 'Reconstruir un caso y localizar lo pendiente sin ayuda.' },
    ],
    conclusion:
      'Siguiente validación propuesta: reconstrucción de movimientos, localización de pendientes y comprensión de permisos. Las cifras del diseño son contenido de demostración.',
    paletteImage: `${base}paleta.png`,
    typeImage: `${base}tipografia.png`,
    fontName: 'Montserrat',
    fontToken: '--font-montserrat',
    palette: [
      { label: 'Base', value: '#112833', token: '--detention-base' },
      { label: 'Principal', value: '#08394A', token: '--detention-primary' },
      { label: 'Texto de apoyo', value: '#707272', token: '--detention-neutral' },
      { label: 'Neutro', value: '#98989A', token: '--detention-muted' },
      { label: 'Superficie', value: '#FFFFFF', token: '--color-white' },
    ],
  },
}
