// La narrativa propuesta se distingue del alcance confirmado y de la evidencia de Figma.
export const schoolCase = {
  framing: 'Planteamiento de producto · Hipótesis por validar',
  challenge:
    'Cuando cada área tiene su propio registro, una pregunta sencilla se vuelve una tarea larga.',
  scenario:
    '¿Quién tiene un pago pendiente? ¿A qué alumno corresponde? ¿Quién puede actualizarlo? Si las respuestas viven en hojas de cálculo, mensajes y registros separados, el equipo tiene que reconstruir el contexto antes de actuar.',
  hypothesis:
    'Reunir personas, movimientos y permisos en una misma plataforma puede reducir consultas entre áreas y evitar duplicar información. Este es el problema propuesto para explicar el producto; todavía necesita validación con escuelas.',
  opportunities: [
    {
      title: 'Información conectada',
      text: 'Relacionar alumnos, familias y personal para consultar el contexto desde un mismo lugar.',
    },
    {
      title: 'Control financiero',
      text: 'Distinguir ingresos, egresos y pendientes sin mezclar conceptos ni perder la visión general.',
    },
    {
      title: 'Responsabilidades claras',
      text: 'Separar consultar de editar para que cada perfil tenga un alcance reconocible.',
    },
  ],
  research: {
    label: 'Research propuesto · No realizado',
    question: '¿Dónde se rompe la continuidad de una tarea administrativa?',
    description:
      'La descripción del producto y las pantallas disponibles permiten plantear hipótesis. El siguiente paso sería contrastarlas con tareas reales, antes de asumir que centralizar todo es suficiente.',
    methods: [
      {
        title: 'Entrevistas de contexto',
        text: 'Propuesta: conversar con administración, caja y coordinación académica. Reconstruir una tarea reciente, sus documentos y los traspasos entre áreas.',
      },
      {
        title: 'Observación de tareas',
        text: 'Seguir el registro de un alumno y la revisión de un pago. Identificar duplicación de datos, consultas externas y puntos de espera.',
      },
      {
        title: 'Prueba del prototipo',
        text: 'Pedir que localicen un pendiente y configuren un acceso de consulta. Observar errores y dudas sin explicar la interfaz.',
      },
    ],
    questions: [
      '¿Qué dato necesitas pedir a otra área para terminar?',
      '¿Cómo sabes cuál registro está actualizado?',
      '¿Qué sucede si alguien modifica información por error?',
    ],
  },
  personas: [
    {
      name: 'Coordinación administrativa',
      type: 'Usuario principal del MVP',
      job: 'Necesito entender qué requiere atención y encontrar el registro correcto sin consultar a tres personas.',
      goal: 'Mantener una visión de la operación y resolver pendientes.',
      friction: 'Información repartida, interrupciones y cambios sin un responsable claro.',
      response: 'Resumen operativo, módulos reconocibles y permisos explícitos.',
    },
    {
      name: 'Responsable de caja',
      type: 'Perfil previsto · Fuera del rol construido',
      job: 'Necesito distinguir lo cobrado, lo pendiente y los egresos para revisar el movimiento correcto.',
      goal: 'Consultar y registrar movimientos con contexto.',
      friction: 'Conceptos mezclados y conciliación manual entre registros.',
      response: 'Separación financiera y acceso limitado a su responsabilidad.',
    },
  ],
  prioritization: [
    {
      title: 'Ahora · Administración',
      text: 'Personas, visión general, pagos y configuración de permisos. Un primer alcance que reúne las operaciones centrales.',
    },
    {
      title: 'Después · Otros perfiles',
      text: 'Experiencias específicas para profesores, familias y alumnos. Evitar ampliar roles antes de validar las tareas del administrador.',
    },
  ],
  steps: [
    {
      title: 'Enmarcar el problema',
      text: 'Definir la tarea que cuesta resolver y el contexto que se pierde entre áreas.',
      output: 'Hipótesis de problema',
    },
    {
      title: 'Delimitar el MVP',
      text: 'Concentrar el primer alcance en administración y separar los roles futuros.',
      output: 'Prioridades y límites',
    },
    {
      title: 'Organizar el producto',
      text: 'Agrupar personas, pagos y configuración bajo una navegación compartida.',
      output: 'Arquitectura visible en Figma',
    },
    {
      title: 'Diseñar y validar',
      text: 'Relacionar cada pantalla con una tarea y proponer pruebas antes de medir impacto.',
      output: 'Diseño disponible · Validación pendiente',
    },
  ],
  flow: [
    'Consultar el resumen',
    'Entrar al módulo',
    'Localizar el registro',
    'Actuar según permisos',
  ],
  handoff: [
    {
      title: 'Permisos en interfaz y API',
      text: 'Ocultar una acción no sustituye la autorización del servidor. Consulta y edición deben compartir reglas con ingeniería.',
    },
    {
      title: 'Estados antes de implementar',
      text: 'Definir carga, vacío, error y confirmación por tarea. Son requisitos propuestos para cerrar la experiencia, no pantallas documentadas en este caso.',
    },
    {
      title: 'Componentes que mantienen reglas',
      text: 'La navegación, formularios y controles de acceso necesitan contratos consistentes para añadir módulos sin rediseñar cada vista.',
    },
  ],
  validation: [
    {
      task: 'Encontrar una colegiatura pendiente',
      measure: 'Tiempo, éxito de la tarea y consultas fuera de la plataforma.',
    },
    {
      task: 'Interpretar ingresos y egresos',
      measure: 'Comprensión del balance y errores al identificar un concepto.',
    },
    {
      task: 'Asignar acceso de consulta',
      measure: 'Errores al elegir permisos y comprensión de sus consecuencias.',
    },
  ],
  conclusion:
    'El valor de esta propuesta está en conectar información, tareas y responsabilidades. El rol administrador ya tiene un alcance construido; la mejora operativa debe comprobarse con usuarios y una línea base, no inferirse de la apariencia de las pantallas.',
  palette: [
    { label: 'Base', value: '#27374D', token: '--school-base' },
    { label: 'Apoyo', value: '#526D82', token: '--school-support' },
    { label: 'Contraste suave', value: '#9DB2BF', token: '--school-soft' },
    { label: 'Superficie', value: '#F1F6F9', token: '--school-surface' },
    { label: 'Separadores', value: '#DDE6ED', token: '--school-border' },
  ],
}
