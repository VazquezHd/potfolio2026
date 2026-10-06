const base = '/assets/images/projects/wallet-ciudadana/'
const mobile = (file, title, description, skill, height = 1864, extra = {}) => ({
  title,
  description,
  skill,
  image: `${base}${file}.png`,
  alt: `${title}. Diseño móvil de NIDO con documentos de demostración.`,
  width: 860,
  height,
  layout: 'mobile',
  ...extra,
})
const desktop = (file, title, description, skill) => ({
  title,
  description,
  skill,
  image: `${base}${file}.png`,
  alt: `${title}. Diseño de NIDO con identidad y datos ficticios.`,
  width: 2880,
  height: 2048,
})
export const walletProject = {
  slug: 'wallet-ciudadana',
  number: '04',
  name: 'Wallet ciudadana',
  subtitle: 'Tus documentos disponibles cuando un trámite los necesita.',
  category: 'Diseño de producto',
  domain: 'Documentos y trámites',
  context: 'Ciudadanos · Familias · Documentos',
  status: 'Diseño del sistema · Web y móvil',
  image: `${base}dashboard.png`,
  imageAlt: 'Inicio de NIDO con documentos de muestra, carpetas, archivos compartidos y avisos.',
  imageWidth: 2880,
  imageHeight: 2048,
  color: 'green',
  presentation: 'interface',
  tags: ['Requerimientos', 'Organización', 'UX/UI'],
  description:
    'Wallet para guardar documentos digitales y tenerlos disponibles al realizar un trámite. El alcance contempla compartirlos con el área correspondiente y organizar los de hijos o dependientes como padre, madre o tutor.',
  presentationNote:
    'NIDO es una identidad ficticia para el portafolio. Paleta adaptada, documentos y datos de demostración; sin marcas ni afiliación institucional.',
  gallery: [
    desktop(
      'carpetas',
      'Encontrar el documento en su contexto',
      'Las categorías separan documentos personales, de salud, vivienda, educación y trabajo.',
      'Arquitectura de información',
    ),
    desktop(
      'familia',
      'Preparar la organización familiar',
      'La estructura admite carpetas y subcarpetas. Esta vista usa datos de ejemplo para organizar archivos de un dependiente.',
      'Organización por persona',
    ),
    mobile(
      'carpetas-movil',
      'Llevar la organización al teléfono',
      'Mantengo las categorías y la búsqueda en el punto de acceso móvil a los documentos.',
      'Experiencia entre dispositivos',
      1876,
      { focusLabel: 'Carpetas por contexto', focus: { x: 40, y: 400, width: 780, height: 1000 } },
    ),
    mobile(
      'documentos-movil',
      'Consultar documentos desde un mismo lugar',
      'La consulta reúne los documentos y el acceso a agregar otro, con búsqueda y filtros a la vista.',
      'Jerarquía de información',
      2012,
      {
        width: 876,
        focusLabel: 'Agregar un documento',
        focus: { x: 40, y: 1400, width: 780, height: 460 },
      },
    ),

    mobile(
      'detalle-documento',
      'Revisar qué archivo se va a usar',
      'La vista reúne documento, estado, carpeta y acceso para conservar su contexto antes de editarlo o compartirlo.',
      'Diseño de consulta',
      2242,
      {
        focusLabel: 'Estado, acceso y acciones',
        focus: { x: 20, y: 1580, width: 820, height: 610 },
      },
    ),
    mobile(
      'compartir',
      'Dar salida al documento',
      'El diseño ofrece descarga y vínculo como opciones de salida. La selección de área destinataria forma parte del alcance descrito.',
      'Diseño de interacción',
      1864,
      { focusLabel: 'Opciones de salida', focus: { x: 0, y: 1140, width: 860, height: 724 } },
    ),
    mobile(
      'catalogo',
      'Conectar documentos y trámites',
      'El catálogo permite buscar el trámite o servicio al que se quiere dar inicio.',
      'Continuidad de la tarea',
      1864,
      { focusLabel: 'Elegir el servicio', focus: { x: 24, y: 338, width: 810, height: 420 } },
    ),
    mobile(
      'iniciar-tramite',
      'Entender el siguiente paso',
      'Antes del formulario, la vista explica qué ocurrirá al iniciar el trámite.',
      'Claridad del recorrido',
      1864,
      { focusLabel: 'Qué sucede al continuar', focus: { x: 40, y: 610, width: 780, height: 440 } },
    ),
  ],
  caseStudy: {
    challenge: 'Un documento olvidado puede detener todo el trámite.',
    scenario:
      'Buscar archivos entre correos, fotos y carpetas vuelve difícil saber qué documento está disponible y actualizado.',
    hypothesis:
      'La propuesta reúne consulta, organización y salida de documentos en un recorrido compartido entre web y móvil.',
    problemLabel: 'Necesidades y alcance documentados en Figma y confirmados por Jorge Iván',
    leadCaption: 'Documentos, carpetas y avisos reunidos antes de entrar a una tarea.',
    processTitle: 'De los requerimientos a un recorrido de uso.',
    processCaption:
      'Síntesis de objetivos, requerimientos y perfiles del archivo. Validación con usuarios pendiente.',
    researchCaption:
      'Perfiles e hipótesis documentados en el diseño. No se aportan resultados de entrevistas ni pruebas.',
    flowTitle: 'Preparar documentos para un trámite',
    flow: [
      { label: 'Encontrar', detail: 'Localizar el archivo o la carpeta' },
      { label: 'Revisar', detail: 'Consultar estado y acceso' },
      { label: 'Compartir', detail: 'Dar salida a la documentación' },
      { label: 'Continuar', detail: 'Pasar al trámite o servicio' },
    ],
    opportunities: [
      {
        title: 'Disponibilidad',
        need: 'Tener documentos a mano al realizar un trámite.',
        text: 'Reuní consulta, búsqueda y organización en una wallet.',
      },
      {
        title: 'Contexto',
        need: 'Reconocer vigencia, estado y acceso del archivo.',
        text: 'Hice visibles las etiquetas y mantuve el detalle junto al documento.',
      },
      {
        title: 'Gestión familiar',
        need: 'Organizar también la documentación de hijos o dependientes.',
        text: 'La estructura de carpetas permite separar archivos por persona y contexto.',
      },
    ],
    steps: [
      {
        title: 'Enmarcar',
        text: 'Documentar el objetivo, las tareas frecuentes y las restricciones del recorrido.',
      },
      { title: 'Organizar', text: 'Separar documentos, carpetas, estados y acciones.' },
      {
        title: 'Diseñar',
        text: 'Conectar consulta, detalle, salida del archivo e inicio de trámite.',
      },
      {
        title: 'Validar',
        text: 'Probar recuperación y preparación de documentos. Propuesta pendiente.',
      },
    ],
    personas: [
      {
        name: 'Ciudadano con trámites frecuentes',
        job: 'Encontrar documentos y revisar su estado antes de usarlos.',
      },
      {
        name: 'Padre, madre o tutor',
        job: 'Separar documentación propia y de dependientes para preparar un trámite.',
      },
    ],
    research: [
      {
        title: 'Necesidades documentadas',
        text: 'Acceso rápido, organización y claridad sobre el estado de los documentos.',
      },
      {
        title: 'Criterios del archivo',
        text: 'Enfoque móvil, jerarquía clara, textos simples y atención a errores.',
      },
      {
        title: 'Validación propuesta',
        text: 'Localizar un archivo, revisar su estado y preparar la documentación de un dependiente.',
      },
    ],
    conclusion:
      'La propuesta busca reducir interrupciones por documentos olvidados o desactualizados. Siguiente validación: recuperación de archivos, comprensión del acceso y preparación de documentos familiares. Sin resultados medidos atribuidos.',
    paletteLabel: 'Paleta adaptada para NIDO',
    paletteLinkLabel: 'Ver paleta adaptada ↗',
    paletteImage: `${base}paleta.svg`,
    fontName: 'Montserrat',
    fontToken: '--font-montserrat',
    palette: [
      { label: 'Base', value: '#4B3E67', token: '--wallet-base' },
      { label: 'Principal', value: '#6F5E98', token: '--wallet-primary' },
      { label: 'Acento', value: '#BDB6E7', token: '--wallet-accent' },
      { label: 'Superficie', value: '#F0F1FA', token: '--wallet-surface' },
      { label: 'Documento', value: '#FFFFFF', token: '--color-white' },
    ],
  },
}
