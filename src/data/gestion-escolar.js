// Hipótesis propuestas para el caso; no representan investigación realizada.
export const schoolCase = {
  flowTitle: 'Consultar y dar seguimiento',
  flow: [
    { label: 'Buscar alumno', detail: 'Localizar el registro' },
    { label: 'Consultar situación', detail: 'Revisar indicadores' },
    { label: 'Revisar pagos', detail: 'Distinguir pendientes' },
    { label: 'Dar seguimiento', detail: 'Conservar el contexto' },
  ],
  problemLabel: 'Hipótesis de problema por validar',
  leadCaption: 'Diseñé una visión general para conectar indicadores y actividad.',
  processTitle: 'Alcance y organización del MVP.',
  paletteImage: '/assets/images/projects/gestion-escolar/paleta.png',
  fontName: 'DM Sans',
  fontToken: '--font-sans',
  challenge: 'Revisar un pago sin cruzar registros dispersos.',
  scenario: 'Cruzar hojas de cálculo y mensajes para revisar un pago retrasa la operación escolar.',
  hypothesis: 'La propuesta conecta personas, pagos y permisos en una misma plataforma.',
  opportunities: [
    {
      title: 'Conectar información',
      need: 'Consultar al alumno junto con su familia y sus pagos.',
      text: 'Organicé perfiles e indicadores alrededor de las tareas administrativas.',
    },
    {
      title: 'Reconocer pendientes',
      need: 'Distinguir lo que requiere seguimiento administrativo.',
      text: 'Hice visibles adeudos y estados para orientar el seguimiento.',
    },
    {
      title: 'Definir responsabilidades',
      need: 'Dar acceso según la tarea de cada perfil.',
      text: 'Separé consulta y edición para expresar el alcance de cada rol.',
    },
  ],
  steps: [
    { title: 'Definir', text: 'Partir de la dispersión de registros como hipótesis.' },
    { title: 'Priorizar', text: 'Resolver primero las tareas del administrador.' },
    { title: 'Organizar', text: 'Compartir navegación y reglas entre módulos.' },
    { title: 'Validar', text: 'Comprobar tareas y permisos con usuarios. Pendiente.' },
  ],
  personas: [
    { name: 'Administración', job: 'Identificar pendientes y encontrar el registro correcto.' },
    { name: 'Caja · Perfil previsto', job: 'Distinguir lo cobrado, lo pendiente y los egresos.' },
  ],
  research: [
    { title: 'Entrevistar', text: 'Identificar qué información se pide entre áreas.' },
    { title: 'Observar', text: 'Seguir un registro de alumno y la revisión de un pago.' },
    { title: 'Probar', text: 'Encontrar un pendiente y asignar acceso de consulta.' },
  ],
  conclusion:
    'Siguiente paso: medir éxito de tareas, tiempo de búsqueda y errores al asignar permisos. Validación pendiente.',
  palette: [
    { label: 'Base', value: '#27374D', token: '--school-base' },
    { label: 'Apoyo', value: '#526D82', token: '--school-support' },
    { label: 'Contraste', value: '#9DB2BF', token: '--school-soft' },
    { label: 'Superficie', value: '#F1F6F9', token: '--school-surface' },
    { label: 'Separadores', value: '#DDE6ED', token: '--school-border' },
  ],
}
