export default {
  nav: {
    home: 'Inicio',
    stack: 'Tecnologías',
    projects: 'Proyectos',
    timeline: 'Trayectoria',
    publications: 'Publicaciones',
    about: 'Sobre mí',
    contact: 'Contacto',
  },
  projects: {
    title: 'Proyectos',
    subtitle: 'Cosas que construí',
    featured: 'PROYECTO DESTACADO',
    showMore: 'Ver más',
    showLess: 'Ver menos',
    entries: {
      serena: { description: 'Plataforma digital para coordinación de cuidados paliativos y hospice en Brasil, construida con su hermana para la tesis de residencia en geriatría. Gestiona evaluaciones clínicas, seguimiento de medicación, coordinación de equipo y decisiones clínicas asistidas por IA. Conformidad LGPD y ANVISA.' },
      nanoncore: { description: 'Plataforma de gestión de telecom e ISP. Gestión de fibra GPON, aprovisionamiento de equipos, monitoreo de red en tiempo real vía SNMP/SSH y dashboards de métricas.' },
      voz: { description: 'IA conversacional de voz auto-hospedada para portugués brasileño y español rioplatense. Pipeline de LLM + TTS con streaming para que el usuario escuche el audio antes de que el modelo termine de pensar. Corre enteramente en hardware local.' },
      clustering_utils: { description: 'Toolkit reutilizable de benchmark y visualización de clustering para Python.' },
      db_toolkit: { description: 'Toolkit Python liviano para PostgreSQL vía SSH con ejecución SQL paralela y pool de conexiones.' },
    },
  },
  hero: {
    tagline: `Construyendo plataformas de datos escalables, IA de voz y productos full-stack. 15 años entregando sistemas que funcionan en producción.`,
    available: 'Disponible para oportunidades',
    location: 'Madrid, España',
    viewWork: 'Ver Trabajos',
    download_cv: 'Descargar CV',
    stats: {
      experience: 'Años de Experiencia',
      papers: 'Artículos Publicados',
      products: 'Productos Activos',
      languages: 'Idiomas',
    },
    roles: {
      dataEngineer: 'Ingeniero de Datos',
      mlResearcher: 'Investigador de ML',
      fullStackBuilder: 'Desarrollador Full-Stack',
      openSourceAuthor: 'Autor Open Source',
    },
  },
  stack: {
    title: 'Tecnologías',
    subtitle: 'Herramientas y tecnologías que utilizo',
    production: 'Producción',
    knowledge: 'Conocimiento',
    categories: {
      'Cloud & Data Platforms': 'Cloud & Plataformas de Datos',
      'Data Engineering': 'Ingeniería de Datos',
      'Programming & Databases': 'Programación & Bases de Datos',
      'AI & Machine Learning': 'IA & Machine Learning',
      'Visualization & BI': 'Visualización & BI',
      'Backend & APIs': 'Backend & APIs',
      'Frontend': 'Frontend',
      'DevOps & Tools': 'DevOps & Herramientas',
    },
  },
  timeline: {
    title: 'Trayectoria',
    subtitle: 'Trabajo, formación y certificaciones',
    filtering: 'Filtrando',
    types: {
      work: 'Trabajo',
      project: 'Proyecto',
      education: 'Formación',
      certification: 'Certificación',
    },
    entries: {
      'accenture-2025': {
        title: 'Ingeniero de Datos',
        description: 'Diseño y soporte de plataformas de datos escalables en GCP para clientes corporativos. Pipelines CI/CD vía Terraform y Azure DevOps para activos BigQuery y Dataflow. Operacionalización de procesos ELT asegurando calidad, rendimiento y cumplimiento de gobernanza de datos.',
      },
      'nees-2024': {
        title: 'Científico de Datos',
        description: 'Análisis de 10M+ registros de estudiantes para patrones de retención e insights de políticas públicas. Construcción de dashboards geoespaciales abarcando 5.000+ escuelas brasileñas.',
      },
      'eattasty-2023': {
        title: 'Científico de Datos',
        description: 'Analytics avanzado en Dremio y MongoDB para decisiones de marketing y operaciones. Dashboards de BI en Metabase, Apache Superset, Looker y Power BI. Automatización de workflows de datos e integraciones de marketing usando n8n.',
      },
      'seedify-2022': {
        title: 'Project Manager',
        description: 'Liderazgo de workflows Agile para desarrollo de productos blockchain. Coordinación entre equipos internos y agencias externas. Elaboración de user stories técnicas y documentación de negocio.',
      },
      'avature-2022': {
        title: 'Consultor de Implementación',
        description: 'Implementación completa de SaaS corporativo para clientes de RRHH. Relevamiento de requisitos y entrega Agile/Waterfall.',
      },
      'farfetch-2021': {
        title: 'Ingeniero de Soporte',
        description: 'Soporte técnico gestionando actualizaciones de base de datos y endpoints de API para plataforma de e-commerce. Scripts de automatización en Python y SQL para mejora de eficiencia.',
      },
      'interlink-2018': {
        title: 'Project Manager',
        description: 'Liderazgo de equipos de desarrollo de software remotos y presenciales. Gestión de backlog, sprints y colaboración de UX. Investigación tecnológica para soluciones innovadoras.',
      },
      'professor-2010': {
        title: 'Profesor de Ciencias de la Computación',
        description: 'Enseñanza de POO, Sistemas Operativos, Arquitectura de Computadores y frameworks modernos de desarrollo. Elaboración de currículo cubriendo Agile, patrones de diseño y mejores prácticas de ingeniería de software.',
      },
      'serena-2026': {
        title: 'Serena',
        description: 'Plataforma digital para coordinación de cuidados paliativos y hospice en Brasil, construida con su hermana para la tesis de residencia en geriatría. Gestiona evaluaciones clínicas (ESAS-r, PPS, PAINAD), seguimiento de medicación, coordinación de equipo, portales familiares y decisiones clínicas asistidas por IA. Conformidad LGPD y ANVISA.',
      },
      'nanoncore-2025': {
        title: 'nanoncore',
        description: 'Plataforma de gestión de telecom e ISP. Gestión de fibra GPON, aprovisionamiento de equipos, monitoreo de red en tiempo real vía SNMP/SSH y dashboards de métricas.',
      },
      'voz-2026': {
        title: 'voz',
        description: 'IA conversacional de voz auto-hospedada para portugués brasileño y español rioplatense. Pipeline de LLM + TTS con streaming para que el usuario escuche el audio antes de que el modelo termine de pensar. Corre enteramente en hardware local. Open source.',
      },
      'clustering-utils': {
        title: 'clustering_utils',
        description: 'Toolkit reutilizable de benchmark y visualización de clustering.',
      },
      'db-toolkit': {
        title: 'db_toolkit',
        description: 'Toolkit Python liviano para PostgreSQL vía SSH con ejecución SQL paralela y pool de conexiones.',
      },
      'masters-2024': {
        title: 'Maestría en Tecnologías de la Información y Comunicación',
        description: 'Tesis: "Predicción de Deserción Estudiantil a través de Optimización de Machine Learning: Insights de Datos de Registro de Moodle"',
      },
      'bachelors-2010': {
        title: 'Licenciatura en Tecnologías de la Información y Comunicación',
        description: '',
      },
      'gcp-cert-2025': {
        title: 'Certificación Google Cloud Digital Leader',
        description: '',
      },
      'hec-cert-2019': {
        title: 'Creación y Desarrollo de una Startup de Tecnología',
        description: '',
      },
    },
  },
  publications: {
    title: 'Publicaciones',
    subtitle: 'Artículos académicos e investigación',
    readPaper: 'Leer Artículo',
    leadAuthor: 'Autor Principal',
    coAuthor: 'Coautor',
    inPress: 'En Prensa',
    entries: {
      'nature-2025': {
        title: 'Predicting Student Dropout through Machine Learning Optimization: Insights from Moodle Registration Data',
        description: 'Aplicación de técnicas avanzadas de ML (Random Forest, XGBoost) para optimizar la predicción de riesgo de deserción a partir de datos de registro de Moodle.',
      },
      'springer-2025': {
        title: 'Capítulo de Libro Springer',
        description: 'Capítulo de libro expandiendo enfoques de ML para análisis de datos educativos.',
      },
      'dgo-2025-1': {
        title: "Asegurando la Calidad de Datos en Bases Educativas Nacionales: Insights de la Base Centralizada de Datos de Estudiantes de Secundaria de Brasil",
        description: 'Calidad de datos y ML aplicados a bases de datos educativas nacionales para insights de políticas gubernamentales.',
      },
      'dgo-2025-2': {
        title: 'Aprovechando Algoritmos de Similitud de Cadenas para Validación de Datos Educativos: Un Enfoque Escalable para la Gobernanza Digital',
        description: 'Machine learning aplicado a bases de datos educativas nacionales, enfocado en la identificación temprana de estudiantes en riesgo.',
      },
    },
  },
  about: {
    title: 'Sobre mí',
    subtitle: 'Un poco sobre mí',
    education: 'Formación',
    degrees: {
      masters: 'Maestría en Tecnologías de la Información y Comunicación',
      bachelors: 'Licenciatura en Tecnologías de la Información y Comunicación',
    },
    bio: 'Ingeniero brasileño en Madrid. Construyendo en telecom, salud e IA de voz. 15 años entregando plataformas de datos, ahora entregando productos full-stack. Empecé en ingeniería de datos — pipelines, plataformas y equipos en educación, analytics y Web3. Todo es un problema de datos si hacés zoom out lo suficiente.',
    languages: 'Idiomas',
    currentlyBuilding: 'Construyendo actualmente',
    langList: {
      portuguese: 'Portugués',
      spanish: 'Español',
      english: 'Inglés',
      french: 'Francés',
    },
    levels: {
      native: 'Nativo',
      advanced: 'Avanzado',
      intermediate: 'Intermedio',
    },
    projects: {
      serena: 'plataforma de cuidados paliativos',
      nanoncore: 'gestión de telecom ISP',
      voz: 'IA de voz para portugués brasileño',
    },
  },
  contact: {
    line1: 'TRABAJEMOS',
    line2: 'JUNTOS',
    subtitle: 'Abierto a roles full-time, consultoría y problemas interesantes.',
    footer: 'Hecho con Vue 3 + Tailwind CSS',
  },
  common: {
    liveSite: 'Sitio',
    viewBadge: 'Ver Badge',
    viewCertificate: 'Ver Certificado',
    present: 'Presente',
    openSource: 'Open Source',
  },
  cv: {
    filename: 'Markson_Rebelo_Marcolino_CV_ES.pdf',
    title: 'Ingeniero de Datos',
    summary_label: 'Resumen',
    summary: 'Ingeniero de Datos con mas de 15 anos de experiencia construyendo plataformas de datos escalables, pipelines y productos full-stack en telecomunicaciones, salud y educacion. Experto en Python, GCP, BigQuery, FastAPI e infraestructura de datos en la nube.',
    experience: 'Experiencia',
    education: 'Educacion',
    publications: 'Publicaciones',
    skills: 'Habilidades Tecnicas',
    present: 'Presente',
    lead_author: 'Autor Principal',
    co_author: 'Coautor',
    in_press: 'En Prensa',
    location: 'Madrid, Espana',
  },
}
