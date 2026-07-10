pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const loadedDynamicFonts = new Set();
const videoPosterCache = new Map();

function buildExtendaVariants() {
  const scales = [
    { code: '10', name: 'Pica' },
    { code: '15', name: 'Nano' },
    { code: '20', name: 'Micro' },
    { code: '30', name: 'Deca' },
    { code: '40', name: 'Hecto' },
    { code: '50', name: 'Mega' },
    { code: '60', name: 'Giga' },
    { code: '70', name: 'Tera' },
    { code: '80', name: 'Peta' },
    { code: '90', name: 'Exa' },
    { code: '100', name: 'Yotta' },
  ];
  const styles = [
    { suffix: '', label: 'Regular' },
    { suffix: '-Italic', label: 'Italic', fontStyle: 'italic' },
    { suffix: '-Backslant', label: 'Backslant', fontStyle: 'oblique' },
  ];
  const prefixes = [
    { code: '', label: '' },
    { code: 'XS-', label: 'XS ' },
  ];

  const variants = [
    { label: 'Variable', family: 'Extenda Variable' },
    { label: 'Extendable', family: 'Extenda Dynamic Extendable', source: 'assets/fonts/extenda/Extendable-TRIAL.ttf' },
  ];

  scales.forEach((scale) => {
    styles.forEach((style) => {
      prefixes.forEach((prefix) => {
        const familyToken = `${prefix.code}${scale.code}-${scale.name}${style.suffix}`;
        variants.push({
          label: `${prefix.label}${scale.name} ${style.label}`.trim(),
          family: `Extenda Dynamic ${familyToken}`,
          source: `assets/fonts/extenda/Extenda-${familyToken}-TRIAL.ttf`,
          fontStyle: style.fontStyle || 'normal',
        });
      });
    });
  });

  return variants;
}
/* ════════════════════════════════════════════════════
   DATOS — Editá aquí para agregar o cambiar proyectos
   ════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 'p1',
    number: '02',
    title: 'Identidad Visual Perro Caliente',
    subject: 'Taller Gráfico I',
    icon: '🗄️',
    archived: true,
    year: '2026',
    parte: 'Etapa 1: Investigación · Etapa 2: Construcción de marca',
    tags: ['investigación', 'identidad de marca', 'branding', 'perro caliente'],
    description: 'Investigación histórica, cultural y visual sobre el perro caliente como objeto de diseño. Incluye antecedentes históricos de la salchicha, análisis de variedades latinoamericanas, estudio de referentes gráficos, estado del arte de marcas existentes y propuesta de diseño.\n\nDocentes:\nAndrea Torres, Ignacia Santillán\nTaller Gráfico I\nMarzo de 2026.',
    cover: 'assets/proyectos/rebalse/img/perritoschao-1.jpg',

    text: `
## Sobre el proyecto

Esta investigación aborda el **perro caliente como objeto de diseño de identidad de marca**, explorando su historia, sus variaciones culturales en Latinoamérica y el panorama visual de marcas existentes.

El trabajo está dividido en tres secciones principales que conforman la lámina.

    `,

    timeline: [
      { title: 'Investigación histórica', desc: 'Rastreo del origen de la salchicha desde la Antigua Grecia hasta su llegada a América. Fuentes documentales y académicas.' },
      { title: 'Análisis de variantes latinoamericanas', desc: 'Estudio comparativo del perro caliente en Venezuela, Chile, Argentina/Uruguay y Colombia.' },
      { title: 'Selección de base cultural', desc: 'Decisión de centrar la identidad en el perro caliente latinoamericano por su riqueza narrativa y filosfía "con todo".' },
      { title: 'Estado del arte — Norteamérica', desc: 'Análisis visual de marcas: Nathan\'s Famous, Oscar Mayer, Ball Park, Pink\'s Hot Dogs.' },
      { title: 'Estado del arte — Latinoamérica', desc: 'Análisis de Chori (AR), Perritos Chao (CL), Rulo (VE) y referentes gráficos de food branding contemporáneo.' },
      { title: 'Diagramación de lámina en Illustrator', desc: 'Síntesis visual de toda la investigación en 3 láminas A3.' },
    ],

    gallery: [
      { src: 'assets/proyectos/rebalse/img/img-sabro.png', caption: 'Sabro brand identity — sistema gráfico con color oscuro de fondo (Pixel Picasso Studio, 2025)' },
      { src: 'assets/proyectos/rebalse/img/img-pizzino.png', caption: 'Pizzino — letras como personajes, stickers como sistema' },
      { src: 'assets/proyectos/rebalse/img/img-bigchill.png', caption: 'Big Chill — referencia visual' },
      { src: 'assets/proyectos/rebalse/img/barrio-italia.jpg', caption: 'Barrio Italia — Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/barrio-italia-1.jpg', caption: 'Barrio Italia — Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/barrio-italia-2.jpg', caption: 'Barrio Italia — Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/barrio-italia-4.jpg', caption: 'Barrio Italia — Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/barrio-italia-3.jpg', caption: 'Barrio Italia — Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/barrio-italia-5.jpg', caption: 'Barrio Italia — Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/mut-1.jpg', caption: 'Mercado Urbano Tobalaba - Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/mut-4.jpg', caption: 'Mercado Urbano Tobalaba - Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/mut-5.jpg', caption: 'Mercado Urbano Tobalaba - Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/mut-6.jpg', caption: 'Mercado Urbano Tobalaba - Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/mut-8.jpg', caption: 'Mercado Urbano Tobalaba - Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/mut-13.jpg', caption: 'Mercado Urbano Tobalaba - Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/mut-14.jpg', caption: 'Mercado Urbano Tobalaba - Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/mut-19.jpeg', caption: 'Mercado Urbano Tobalaba - Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/mut-20.jpeg', caption: 'Mercado Urbano Tobalaba - Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/mut-21.jpeg', caption: 'Mercado Urbano Tobalaba - Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/mut-22.jpeg', caption: 'Mercado Urbano Tobalaba - Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/mut-23.jpeg', caption: 'Mercado Urbano Tobalaba - Autoría propia, 2026' },
      { src: 'assets/proyectos/rebalse/img/mut-24.jpeg', caption: 'Mercado Urbano Tobalaba - Autoría propia, 2026' },
    ],

    videos: [],

    pdfs: [
      {
        src: 'assets/proyectos/rebalse/pdf/c1-lamina-investigacion-taller-grafico-i-antonia-cajigal-copy.pdf',
        label: 'Lámina Investigación Identidad de Marca · Perro Caliente',
        description: '3 láminas A3 · Illustrator · Taller Gráfico I'
      },
    ],

    downloads: [
      { name: 'Lámina investigación', desc: 'PDF · 3 láminas A3', url: 'assets/proyectos/rebalse/pdf/c1-lamina-investigacion-taller-grafico-i-antonia-cajigal-copy.pdf', ext: 'PDF', size: '' },
      { name: 'Etapa 2 · Investigación completa actualizada', desc: 'PDF · investigación completa actualizada', url: 'assets/proyectos/rebalse/pdf/L1-INVESTIGACION_CAJIGAL_ANTONIA.pdf', ext: 'PDF', size: '' },
      { name: 'Etapa 2 · Investigación compactada + construcción de marca', desc: 'PDF · lámina vertical', url: 'assets/proyectos/rebalse/pdf/L2-3-INVESTIGACION_CAJIGAL_ANTONIA.pdf', ext: 'PDF', size: '' },
      { name: 'Etapa 2 · Bocetos y apuntes', desc: 'PDF · proceso y exploraciones', url: 'assets/proyectos/rebalse/pdf/bocetos y apuntes.pdf', ext: 'PDF', size: '' },
    ],

    notes: `
**Herramientas:** Adobe Illustrator CC 2025

**Formato de entrega:** PDF · 3 láminas doble carta (420 × 297 mm)

**Metodología:** La investigación combina fuentes historiográficas, gastronómicas, periodísticas y referencias de diseño contemporáneo. El análisis del estado del arte se realizó sobre marcas activas durante 2024–2025 en Behance, Instagram y sitios oficiales.

    `,

    stage1: {
      title: 'Etapa 1: Investigación',
      description: 'Levantamiento histórico, cultural y visual del perro caliente para definir fundamentos conceptuales, referentes de marca y criterios estratégicos de diseño.'
    },

    stage2: {
      title: 'Etapa 2: Construcción de marca',
      description: `
En esta etapa se desarrolló la **formalización técnica de la investigación** y la **construcción inicial del sistema de identidad**, trabajando en **Affinity Studio** (Publisher + Designer).

Se estructuraron **dos láminas doble carta en formato vertical** para ordenar jerarquías de información, narrativa visual y criterios de síntesis gráfica.

### Procesos técnicos aplicados

- Definición de conceptos e ideación
- Lluvia de ideas y selección de naming
- Construcción de paleta CMYK
- Selección tipográfica display + sans serif
- Sistema de formas y geometría
- Integración fotografía e ilustración
- Sistema de stickers y elementos gráficos
- Copywriting y brand voice
      `,
      pdfs: [
        {
          src: 'assets/proyectos/rebalse/pdf/L1-INVESTIGACION_CAJIGAL_ANTONIA.pdf',
          label: 'Lámina de investigación completa actualizada',
          description: 'PDF de investigación completa actualizada · Affinity Studio'
        },
        {
          src: 'assets/proyectos/rebalse/pdf/L2-3-INVESTIGACION_CAJIGAL_ANTONIA.pdf',
          label: 'Lámina de investigación compactada y construcción de marca',
          description: 'PDF de lámina vertical compacta · Affinity Studio'
        },
        {
          src: 'assets/proyectos/rebalse/pdf/bocetos y apuntes.pdf',
          label: 'Bocetos y apuntes',
          description: 'PDF de proceso, bocetos y notas de desarrollo'
        },
      ],
    },

    typography: {
      title: 'Visualizador de tipografías',
      sample: 'REBALSE',
      fonts: [
        {
          name: 'Extenda',
          family: 'Extenda Trial',
          source: 'Zetafonts',
          style: '68 variantes',
          license: 'Free for personal use',
          usage: 'Títulos, logotipo y acentos de marca',
          variants: buildExtendaVariants(),
        },
        {
          name: 'Poppins',
          family: 'Poppins',
          source: 'Google Fonts',
          style: '18 variantes',
          license: 'Open source license',
          usage: 'Textos corridos, subtítulos y UI',
          variants: [
            { label: 'Thin 100', family: 'Poppins', weight: 100 },
            { label: 'ExtraLight 200', family: 'Poppins', weight: 200 },
            { label: 'Light 300', family: 'Poppins', weight: 300 },
            { label: 'Regular 400', family: 'Poppins', weight: 400 },
            { label: 'Medium 500', family: 'Poppins', weight: 500 },
            { label: 'SemiBold 600', family: 'Poppins', weight: 600 },
            { label: 'Bold 700', family: 'Poppins', weight: 700 },
            { label: 'ExtraBold 800', family: 'Poppins', weight: 800 },
            { label: 'Black 900', family: 'Poppins', weight: 900 },
            { label: 'Thin 100 Italic', family: 'Poppins', weight: 100, fontStyle: 'italic' },
            { label: 'ExtraLight 200 Italic', family: 'Poppins', weight: 200, fontStyle: 'italic' },
            { label: 'Light 300 Italic', family: 'Poppins', weight: 300, fontStyle: 'italic' },
            { label: 'Regular 400 Italic', family: 'Poppins', weight: 400, fontStyle: 'italic' },
            { label: 'Medium 500 Italic', family: 'Poppins', weight: 500, fontStyle: 'italic' },
            { label: 'SemiBold 600 Italic', family: 'Poppins', weight: 600, fontStyle: 'italic' },
            { label: 'Bold 700 Italic', family: 'Poppins', weight: 700, fontStyle: 'italic' },
            { label: 'ExtraBold 800 Italic', family: 'Poppins', weight: 800, fontStyle: 'italic' },
            { label: 'Black 900 Italic', family: 'Poppins', weight: 900, fontStyle: 'italic' },
          ],
        },
      ],
    },

    references: [
      { text: 'Apitz, C. (2024). Filippo Costa, un ícono de la Cultura Urbana de Caracas.', url: 'https://carlosapitz.com/filippo-costa/' },
      { text: 'BBC Mundo. (2019). El sorprendente origen del hot dog.', url: 'https://www.bbc.com/mundo/vert-tra-49067202' },
      { text: 'Behance / Pixel Picasso Studio. (2025). Sabro brand identity.', url: 'https://www.behance.net/gallery/238949703/Sabro-Brand-Identity-Food-Branding' },
      { text: 'Behance / Taqwah. (2025). Chompo visual identity.', url: 'https://www.behance.net/gallery/239242725/Chompo-Visual-Identity-Business-Solution' },
      { text: 'Behance / Yassine. (2025). GRUB retro inspired restaurant branding.', url: 'https://www.behance.net/gallery/229056079/GRUB-Retro-Inspired-Restaurant-Branding' },
      { text: 'Castro, J. (2007). Puesto callejero de asquerositos [Fotografía].', url: 'https://www.flickr.com/photos/cibergaita/2058298398/in/photostream/' },
      { text: 'Chile Travel. (2023). Completo o "hotdog" chileno: uno de los platos más queridos en el país.', url: 'https://www.chile.travel/diario-de-viajes/completo-hotdog-chileno-uno-de-los-platos-mas-queridos-de-chile/' },
      { text: 'Chori. (2020). Chori brand identity [Facebook].', url: 'https://web.facebook.com/chorithames/' },
      { text: 'ComaBeba. (s.f.). Chori Buenos Aires.', url: 'https://comabeba.com/argentina/es/chori-buenos-aires/' },
      { text: 'El Colombiano. (s.f.). Perros calientes en Medellín: sin salchicha, con chorizo, mariscos y solomo.', url: 'https://www.elcolombiano.com/tendencias/perros-calientes-en-medellin-sin-salchica-con-chorizo-mariscos-y-solomo-KC24370138' },
      { text: 'El Tiempo. (2022). El maravilloso encanto del perro caliente colombiano.', url: 'https://www.eltiempo.com/cultura/gastronomia/hot-dogs-el-maravilloso-encanto-de-los-perros-calientes-colombianos-706278' },
      { text: 'Food Republic. (2023). 40 ways the world makes awesome hot dogs (ilustraciones de M. Houston).', url: 'https://www.foodrepublic.com/2015/05/19/40-ways-the-world-makes-awesome-hot-dogs/' },
      { text: 'FSIS / USDA. (2020). Sausage operations [PDF].', url: 'https://www.fsis.usda.gov/sites/default/files/media_file/2021-03/FPLIC_4a_Sausage_Operations.pdf' },
      { text: 'Gastronoming. (s.f.). Asquerositos: la versión venezolana de unos perritos calientes al completo.', url: 'https://www.gastronoming.com/asquerositos-la-version-venezolana-de-unos-perritos-calientes-al-completo/' },
      { text: 'Gibbs, A. (s.f.). El perro caliente y su historia en un viaje de siete sabores.', url: 'https://adrianagibbs.com/300-2/' },
      { text: 'Goldbelly. (s.f.). Pink\'s hot dogs chili cheese hot dog kit.', url: 'https://www.goldbelly.com/restaurants/pinks-hot-dogs/chili-cheese-hot-dog-kit-12-pack' },
      { text: 'History Cooperative. (2022). Why are hot dogs called hot dogs?', url: 'https://historycooperative.org/origin-of-hot-dogs/' },
      { text: 'Hola. (2021). Recetas de perrito caliente: día mundial del hot dog.', url: 'https://www.hola.com/cocina/noticias/20210423188256/recetas-perrito-caliente-hot-dog-dia-mundial/' },
      { text: 'HuffPost UK. (s.f.). Running a hot dog stand in New York.', url: 'https://www.huffingtonpost.co.uk/entry/running-a-hot-dog-stand-in-new-york-can-cost-you-as-much-as-r4-million-per-year_uk_5c7ea092e4b06e0d4c251463' },
      { text: 'Kurz-Gut. (s.f.). Historia de las salchichas alemanas: un símbolo de la gastronomía germana.', url: 'https://www.kurz-gut.com/historia-de-las-salchichas-alemanas-un-simbolo-de-la-gastronomia-germana' },
      { text: 'La Guía de Caracas. (2020). Filippo Saglimbeni: el primer perrocalentero de Caracas.', url: 'http://laguiadecaracas.net/18521/filippo-saglimbeni-el-primer-perrocalentero-de-caracas/' },
      { text: 'Lemoine, E. (2023). Venezuelan street-style hot dogs: perros calientes recipe.', url: 'https://enrilemoine.com/en/2023/07/04/venezuelan-street-style-hot-dogs-recipe-perros-calientes/' },
      { text: 'Museum of the City of New York. (s.f.). The hot dog [Historia].', url: 'https://www.mcny.org/story/hot-dog' },
      { text: 'MyPanna. (s.f.). Hot dogs en Venezuela: adaptación criolla de un clásico americano.', url: 'https://mypanna.com/gastronomia-internacional/hot-dogs-en-venezuela-adaptacion-criolla-de-un-clasico-americano/' },
      { text: 'Municipality of Providencia. (2024). Barrio Italia [Fotografías].', url: 'https://providencia.cl/provi/explora/noticias/hub-providencia/la-novena-semana-de-la-cocina-italiana-lleno-de-sabor-y-tradicion-a' },
      { text: 'Oscar Mayer. (s.f.). Oscar Mayer sausages [Imagen].', url: 'https://www.oscarmayer.com' },
      { text: 'Panes Venezolanos. (2025). Pan de perro caliente venezolano.', url: 'https://panesvenezolanos.com/panes-venezolanos/pan-de-perro-caliente/' },
      { text: 'SA Expeditions. (s.f.). Panchos, completos and cachorros-quentes: Latin America\'s giant hot dogs.', url: 'https://www.saexpeditions.com/blog/post/panchos-completos-cachorros-quentes-latams-giant-hotdogs' },
      { text: 'Smithfield Foods. (2024). Nathan\'s Famous introduces talking hot dog.', url: 'https://www.smithfieldfoods.com/press-room/nathan-s-famous-introduces-talking-hot-dog-to-promote-new-brand-platform/' },
      { text: 'The Conversation. (2016). How sausages conquered the globe.', url: 'https://theconversation.com/how-sausages-conquered-the-globe-67405' },
      { text: 'Wikimedia Commons. (s.f.). Puesto callejero de completos [Fotografía].', url: 'https://commons.wikimedia.org/wiki/File:Puesto_callejero_de_Completos_%28%22hot_dogs%29.JPG' },
      { text: 'Real Academia Española. (s.f.). Atrever. Diccionario de la lengua española. Recuperado el 15 de marzo de 2026.', url: 'https://dle.rae.es/atrever' },
      { text: 'Real Academia Española. (s.f.). Mezcla. Diccionario de la lengua española. Recuperado el 15 de marzo de 2026.', url: 'https://dle.rae.es/mezcla' },
      { text: 'Real Academia Española. (s.f.). Abundancia. Diccionario de la lengua española. Recuperado el 15 de marzo de 2026.', url: 'https://dle.rae.es/abundancia' },
      { text: 'National Hot Dog and Sausage Council. (s.f.). Hot dog etiquette.', url: 'https://www.hot-dog.org/culture/hot-dog-etiquette' },
      { text: 'Mukherjee, T. (2014, 27 de enero). Hot dogs: how do you eat yours? The Guardian.', url: 'https://www.theguardian.com/lifeandstyle/wordofmouth/2014/jan/27/hotdogs-beef-pork-mustard-beer' },
    ],
  },
  {
    id: 'p2',
    number: '01',
    title: 'Examen Taller Gráfico I',
    subject: 'Taller Gráfico I',
    icon: '⛰️',
    year: '2026',
    parte: 'Examen',
    tags: ['Examen', 'Taller Gráfico I', 'Aconcagua', 'Naturaleza como fuerza superior'],
    description: 'Fondo general del proyecto con todos los archivos actualizados del examen: galerías de imágenes, visores PDF, visor 3D y videos.',
    cover: 'assets/proyectos/examen-tg1/imgs/final/cover.JPG',

    gallery: [
      { src: 'assets/proyectos/examen-tg1/imgs/13_-Latina-Producciones_-LOS-JAIVAS-GRUPO-MUSICAL-_-CONTRATACIONES_-CANTANTES-PARA-EVENTOS_-SHOW-MUSICAL_-SHOW-ON-LINE_-PRESENTACIONES-PRIVADAS_-CONTRATACIONES-CHILE_-scaled.jpg', caption: '13_-Latina-Producciones' },
      { src: 'assets/proyectos/examen-tg1/imgs/15648606-07060507666f1dfeecfc0666f1dfeecfc11718558206666f1dfeecfc4.webp', caption: '15648606-07060507666f1dfeecfc0666f1dfeecfc11718558206666f1dfeecfc4' },
      { src: 'assets/proyectos/examen-tg1/imgs/5044243.jpg', caption: '5044243' },
      { src: 'assets/proyectos/examen-tg1/imgs/8552049.jpg', caption: '8552049' },
      { src: 'assets/proyectos/examen-tg1/imgs/Los-Jaivas-La-Ventana.jpeg', caption: 'Los-Jaivas-La-Ventana' },
      { src: 'assets/proyectos/examen-tg1/imgs/Los-Jaivas-musica-chilena.jpg', caption: 'Los-Jaivas-musica-chilena' },
      { src: 'assets/proyectos/examen-tg1/imgs/Los_Jaivas_1972.jpg', caption: 'Los_Jaivas_1972' },
      { src: 'assets/proyectos/examen-tg1/imgs/Los_Jaivas_2017_(cropped).jpg', caption: 'Los_Jaivas_2017_(cropped)' },
      { src: 'assets/proyectos/examen-tg1/imgs/Los_Jaivas_en_Machu_Picchu.jpg', caption: 'Los_Jaivas_en_Machu_Picchu' },
      { src: 'assets/proyectos/examen-tg1/imgs/Los_jaivas.jpg', caption: 'Los_jaivas' },
      { src: 'assets/proyectos/examen-tg1/imgs/images.jpeg', caption: 'images' },
      { src: 'assets/proyectos/examen-tg1/imgs/los-jaivas-el-volantin.jpg', caption: 'los-jaivas-el-volantin' },
      { src: 'assets/proyectos/examen-tg1/imgs/los_jaivas_aconcagua.jpg', caption: 'los_jaivas_aconcagua' },
      { src: 'assets/proyectos/examen-tg1/imgs/los_jaivas_alturas_machu_picchu.jpg', caption: 'los_jaivas_alturas_machu_picchu' },
      { src: 'assets/proyectos/examen-tg1/imgs/los_jaivas_musica_chilena.jpg', caption: 'los_jaivas_musica_chilena' },
      { src: 'assets/proyectos/examen-tg1/imgs/los_jaivas_zona_1.jpg', caption: 'los_jaivas_zona_1' },
      { src: 'assets/proyectos/examen-tg1/imgs/los_jaivas_zona_2.jpg', caption: 'los_jaivas_zona_2' },
      { src: 'assets/proyectos/examen-tg1/imgs/los_jaivas_zona_3.jpg', caption: 'los_jaivas_zona_3' },
    ],

    referentes: [
      { src: 'assets/proyectos/examen-tg1/referentes/referente-1.jpg', caption: 'referente-1' },
      { src: 'assets/proyectos/examen-tg1/referentes/referente-2.jpeg', caption: 'referente-2' },
      { src: 'assets/proyectos/examen-tg1/referentes/referente-3.jpeg', caption: 'referente-3' },
      { src: 'assets/proyectos/examen-tg1/referentes/referente-4.jpeg', caption: 'referente-4' },
      { src: 'assets/proyectos/examen-tg1/referentes/referente-5.jpg', caption: 'referente-5' },
      { src: 'assets/proyectos/examen-tg1/referentes/referente-6.jpg', caption: 'referente-6' },
      { src: 'assets/proyectos/examen-tg1/referentes/referente-7.jpg', caption: 'referente-7' },
    ],

    aconcaguaImages: [
      { src: 'assets/proyectos/examen-tg1/imgs/aconcagua/aconcagua-1.jpg', caption: 'aconcagua-1' },
      { src: 'assets/proyectos/examen-tg1/imgs/aconcagua/aconcagua-2.jpg', caption: 'aconcagua-2' },
      { src: 'assets/proyectos/examen-tg1/imgs/aconcagua/aconcagua-3.jpg', caption: 'aconcagua-3' },
      { src: 'assets/proyectos/examen-tg1/imgs/aconcagua/aconcagua-4.jpg', caption: 'aconcagua-4' },
      { src: 'assets/proyectos/examen-tg1/imgs/aconcagua/aconcagua-5.jpg', caption: 'aconcagua-5' },
    ],

    mainVideo: {
      title: 'video-examen',
      src: 'assets/proyectos/examen-tg1/videos/video-examen.mp4',
      type: 'video/mp4',
    },

    videos: [
      { title: 'video-pieza-editorial', src: 'assets/proyectos/examen-tg1/videos/video-pieza-editorial.MP4', type: 'video/mp4' },
    ],

    finalImages: [
      { src: 'assets/proyectos/examen-tg1/imgs/final/imgfinal-1.JPG', caption: 'imgfinal-1' },
      { src: 'assets/proyectos/examen-tg1/imgs/final/imgfinal-2.JPG', caption: 'imgfinal-2' },
      { src: 'assets/proyectos/examen-tg1/imgs/final/imgfinal-3.JPG', caption: 'imgfinal-3' },
      { src: 'assets/proyectos/examen-tg1/imgs/final/imgfinal-4.jpg', caption: 'imgfinal-4' },
      { src: 'assets/proyectos/examen-tg1/imgs/final/imgfinal-5.jpg', caption: 'imgfinal-5' },
      { src: 'assets/proyectos/examen-tg1/imgs/final/imgfinal-6.jpg', caption: 'imgfinal-6' },
      { src: 'assets/proyectos/examen-tg1/imgs/final/imgfinal-7.jpg', caption: 'imgfinal-7' },
    ],

    pdfSections: [
      {
        title: 'Documentos del Proyecto y Pieza Editorial',
        scope: 'laminas-unificadas',
        pdfs: [
          {
            src: 'assets/proyectos/examen-tg1/pdfs/lamina-investigacion.pdf',
            label: 'lamina-investigacion.pdf'
          },
          {
            src: 'assets/proyectos/examen-tg1/pdfs/lamina-final.pdf',
            label: 'lamina-final.pdf'
          },
          {
            src: 'assets/proyectos/examen-tg1/pdfs/planimetr%C3%ADa%20versi%C3%B3n%201.pdf',
            label: 'planimetría versión 1.pdf'
          },
          {
            src: 'assets/proyectos/examen-tg1/pdfs/pieza-editorial.pdf',
            label: 'pieza-editorial.pdf'
          }
        ]
      }
    ],

    model3d: {
      title: 'Modelo 3D del Aconcagua',
      src: 'assets/proyectos/examen-tg1/otros/aconcagua.stl',
    },
stage1: {
      title: 'Aspectos generales proyecto',
      description: 'Repositorio del proyecto Fluxkit, desarrollado para Taller Gráfico I. Basado en el concepto de la naturaleza como fuerza superior mediante un contenedor editorial que integra una representación tridimensional del Aconcagua, poesía y diseño gráfico.'
    },
    // Nueva propiedad para la información institucional
    infoAdicional: {
      docentes: 'Andrea Torres, Ignacia Santillán',
      anoAcademico: '2026',
      institucion: 'Universidad del Desarrollo'
    },
    references: [
      { text: 'Consult Packaging. (2024). The Roachambeau Club - Presentation Boxes.', url: 'https://www.behance.net/gallery/212331937/The-Roachambeau-Club-Presentation-Boxes' },
      { text: 'Hill, J. (s. f.). Mt. Everest 3D Print.', url: 'https://www.joshuahillportfolio.com/portfolio-collections/my-portfolio/mt-everest-3d-print' },
      { text: 'Mallarme, S. (s. f.). Un coup de des jamais n\'abolira le hasard.', url: 'https://fr.wikisource.org/wiki/Un_coup_de_d%C3%A9s_jamais_n%E2%80%99abolira_le_hasard' },
      { text: 'Mistral, G. (1938). Cordillera. En Tala.', url: 'https://www.poemas-del-alma.com/gabriela-mistral-cordillera.htm' },
      { text: 'Mistral, G. (1967). Monte Aconcagua. En Poema de Chile.', url: 'https://www.poemas-del-alma.com/gabriela-mistral-monte-aconcagua.htm' },
      { text: 'Mistral, G. (s. f.). Montanas mias.', url: 'https://www.poemas-del-alma.com/gabriela-mistral-montanas-mias.htm' },
      { text: 'Studio GAGA. (2020). Bridge Making Exhibition.', url: 'https://www.behance.net/gallery/105851653/Bridge-Making-Exhibition' },
    ],
  },
  /* ─── Acá agregar más proyectos ─── */
];
// Filtra el proyecto para que permanezca en los datos locales pero no se renderice en la web
const ACTIVE_PROJECTS = PROJECTS.filter((project) => !project.archived && project.id !== 'p1');
const ARCHIVED_PROJECTS = [];
/* ════════════════════════════════════════════════════
   FIN DE DATOS
   ════════════════════════════════════════════════════ */

let currentView = 'home', lbImages = [], lbIdx = 0;
const isFileProtocol = window.location.protocol === 'file:';
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('overlay');
const hamburger = document.getElementById('hamburger');
const sidebarClose = document.getElementById('sidebar-close');
const viewRoot  = document.getElementById('view-root');
const sidebarNav = document.getElementById('sidebar-nav');
const topbarName = document.getElementById('topbar-name');
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbCounter = document.getElementById('lb-counter');
const scrollFab = document.getElementById('scroll-fab');
const scrollFabIcon = document.getElementById('scroll-fab-icon');

const openSidebar  = () => { sidebar.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow='hidden'; };
const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow=''; };
hamburger.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

function buildNav() {
  sidebarNav.innerHTML = `
    <div class="sb-group">
      <span class="sb-group-label">General</span>
      <button class="sb-item ${currentView==='home'?'active':''}" data-view="home">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Inicio
      </button>
    </div>
    <div class="sb-sep"></div>
    <div class="sb-group">
      <span class="sb-group-label">Proyectos</span>
      ${ACTIVE_PROJECTS.map(p=>`
        <button class="sb-item ${currentView===p.id?'active':''}" data-view="${p.id}">
          <span class="sb-project-icon" aria-hidden="true">${p.icon || '•'}</span>
          ${p.number} — ${p.title}
        </button>`).join('')}
    </div>`;

  if (ARCHIVED_PROJECTS.length) {
    sidebarNav.innerHTML += `
      <div class="sb-sep"></div>
      <div class="sb-group">
        <span class="sb-group-label">Archivados</span>
        ${ARCHIVED_PROJECTS.map(p=>`
          <button class="sb-item ${currentView===p.id?'active':''}" data-view="${p.id}">
            <span class="sb-project-icon" aria-hidden="true">${p.icon || '🗃️'}</span>
            ${p.number} — ${p.title}
          </button>`).join('')}
      </div>`;
  }

  sidebarNav.querySelectorAll('.sb-item').forEach(btn => {
    btn.addEventListener('click', () => { navigate(btn.dataset.view); if(window.innerWidth<=768) closeSidebar(); });
  });
}

function navigate(id) { currentView=id; buildNav(); renderView(); window.scrollTo({top:0}); }

function updateScrollFab() {
  if (!scrollFab || !scrollFabIcon) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;

  if (maxScroll < 260) {
    scrollFab.classList.add('hidden');
    return;
  }

  // boton scroll top bottom
  scrollFab.classList.remove('hidden');
  const goTop = scrollTop > maxScroll * 0.45;
  scrollFab.dataset.direction = goTop ? 'up' : 'down';
  scrollFabIcon.textContent = goTop ? '↑' : '↓';
  const label = goTop ? 'Ir arriba' : 'Ir abajo';
  scrollFab.setAttribute('aria-label', label);
  scrollFab.title = label;
}

function renderView() {
  if (currentView==='home') { renderHome(); topbarName.textContent='Inicio'; }
  else { const p=PROJECTS.find(x=>x.id===currentView); if(p){ renderProject(p); topbarName.textContent=p.title; } }
}

function renderHome() {
  const cards = ACTIVE_PROJECTS.map((p, index)=>`
    <div class="project-card" data-view="${p.id}" tabindex="0" role="button" style="--card-index:${index}">
      <img class="project-card-img" src="${p.cover}" alt="${p.title}" loading="lazy"/>
      <div class="project-card-body">
        <div class="project-card-num">${p.number} · ${p.subject} · ${p.parte||p.year}</div>
        <div class="project-card-title">${p.title}</div>
        <div class="project-card-sub">${p.year}</div>
        <div class="project-card-tags">${p.tags.map(t=>`<span class="badge">${t}</span>`).join('')}</div>
      </div>
    </div>`).join('');

  viewRoot.innerHTML = `
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">Archivo Anto Marino</h1>
        <p class="page-desc">Repositorio de proyectos académicos de diseño · 2025–2026</p>
      </div>
      <div class="section">
        <div class="projects-grid">${cards}</div>
      </div>
    </div>
    ${footerHTML()}`;

  viewRoot.querySelectorAll('.project-card').forEach(card=>{
    const go=()=>navigate(card.dataset.view);
    card.addEventListener('click',go);
    card.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' ')go(); });
  });
}

function renderProject(p) {
  const projectDesc = esc(p.description || '').replace(/\n/g, '<br>');
  const galleryThumbHTML = (img) => `<div class="gallery-thumb" data-gallery-src="${esc(img.src)}" data-gallery-caption="${esc(img.caption || '')}" tabindex="0" role="button"><img src="${esc(img.src)}" alt="${esc(img.caption || '')}" loading="lazy" decoding="async" fetchpriority="low"/><div class="gallery-thumb-overlay"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></div></div>`;
  const renderImageSection = (title, images) => {
    if (!images?.length) return '';
    return `<div class="section"><div class="section-label">${esc(title)} - ${images.length} archivos</div><div class="gallery-grid">${images.map((img) => galleryThumbHTML(img)).join('')}</div></div>`;
  };
  let html = `<div class="project-page">
    <button class="back-btn" id="back-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
      Volver a proyectos
    </button>
    <div class="project-header-card">
      <img class="project-cover" src="${p.cover}" alt="${p.title}"/>
      <div class="project-header-body">
        <div class="project-kicker">${p.subject} · ${p.year}${p.parte?' · '+p.parte:''}</div>
        <h2 class="project-title">${p.title}</h2>
        <p class="project-desc">${projectDesc}</p>
        <div class="project-meta-row">${p.tags.map(t=>`<span class="badge badge-secondary">${t}</span>`).join('')}</div>
      </div>
    </div>`;

  if (p.callout) {
    html += `<div class="callout">${p.callout.icon ? `<span class="callout-icon">${p.callout.icon}</span>` : ''}<div class="callout-body">${p.callout.text}</div></div>`;
  }

  if (p.infoAdicional) {
    html += `
    <div class="section">
      <div class="section-label">Información Institucional</div>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-family: var(--font); font-size: 14px;">
        <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);">
          <td style="padding: 10px 0; font-weight: 600; color: #111; width: 30%;">Año Académico:</td>
          <td style="padding: 10px 0; color: #444;">${esc(p.infoAdicional.anoAcademico || '')}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);">
          <td style="padding: 10px 0; font-weight: 600; color: #111;">Docentes Guías:</td>
          <td style="padding: 10px 0; color: #444;">${esc(p.infoAdicional.docentes || '')}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);">
          <td style="padding: 10px 0; font-weight: 600; color: #111;">Institución:</td>
          <td style="padding: 10px 0; color: #444;">${esc(p.infoAdicional.institucion || '')}</td>
        </tr>
      </table>
    </div>`;
  }

  if (p.pdfs?.length) {
    html += renderPdfSection(p.id, 'Láminas PDF', p.pdfs, 'primary');
  }

  html += `<div class="section"><div class="section-label">${esc(p.stage1?.title || 'Etapa 1: Investigación')}</div>${p.stage1?.description ? `<div class="prose"><p>${esc(p.stage1.description)}</p></div>` : ''}</div>`;

  if (p.pdfs?.length) {
    html += renderPdfSection(p.id, 'Láminas PDF', p.pdfs, 'primary');
  }

  if (p.pdfSections?.length) {
    p.pdfSections.forEach((section, index) => {
      if (section?.pdfs?.length) {
        html += renderPdfSection(p.id, section.title || `PDF ${index + 1}`, section.pdfs, section.scope || `custom-${index}`);
      }
    });
  }

  if (p.text?.trim()) html+=`<div class="section"><div class="section-label">Contenido de la investigación</div><div class="prose">${marked.parse(p.text)}</div></div>`;

  if (p.textMedia?.length) {
    html += `<div class="section"><div class="section-label">Fotos de apoyo</div><div class="support-grid">${p.textMedia.map((item, idx) => `<figure class="support-card support-card-${(idx % 3) + 1}"><img src="${esc(item.src)}" alt="${esc(item.caption || '')}" loading="lazy" decoding="async"/><figcaption>${esc(item.caption || '')}</figcaption></figure>`).join('')}</div></div>`;
  }

  if (p.svgViewer?.src) {
    html += `<div class="section"><div class="section-label">${esc(p.svgViewer.title || 'Visualizador SVG')}</div><figure class="svg-viewer"><img src="${esc(p.svgViewer.src)}" alt="${esc(p.svgViewer.caption || p.svgViewer.title || 'SVG')}" loading="lazy" decoding="async"/></figure></div>`;
  }

  const videoGallery = [
    ...(p.videos || []).map((video) => ({ ...video, vertical: false })),
    ...(p.verticalVideos || []).map((video) => ({ ...video, vertical: true })),
  ];

  if (p.mainVideo?.src) {
    html += `<div class="section"><div class="section-label">Video principal</div><article class="video-main"><div class="video-frame"><video controls playsinline preload="metadata" data-video-thumb data-video-src="${esc(p.mainVideo.src)}"><source src="${esc(p.mainVideo.src)}" type="${esc(p.mainVideo.type || 'video/mp4')}"></video></div><div class="media-caption"><span>${esc(p.mainVideo.title || 'Video principal')}</span></div></article></div>`;
  }

  if (videoGallery.length) {
    html += `<div class="section"><div class="section-label">Galería de video</div><div class="video-grid">${videoGallery.map((video, idx) => {
      const hasSrc = !!video.src;
      const videoClass = video.vertical ? ' video-card-vertical' : '';
      const frameClass = video.vertical ? ' video-frame-vertical' : '';
      return `<article class="video-card${videoClass}${hasSrc ? '' : ' is-placeholder'}"><div class="video-frame${frameClass}${hasSrc ? '' : ' video-frame-placeholder'}">${hasSrc ? `<video controls playsinline preload="metadata" data-video-thumb data-video-src="${esc(video.src)}"><source src="${esc(video.src)}" type="${esc(video.type || 'video/mp4')}"></video>` : `<div class="video-empty"><strong>${esc(video.title || 'Video')}</strong><span>${esc(video.description || 'Sube aqui tu video para previsualizarlo.')}</span></div>`}</div><div class="media-caption"><span>${esc(video.title || `Video ${idx + 1}`)}</span><p>${esc(video.description || '')}</p></div></article>`;
    }).join('')}</div></div>`;
  }

  html += renderImageSection('Galería', p.gallery);
  html += renderImageSection('Referentes', p.referentes);
  html += renderImageSection('Fotos Aconcagua', p.aconcaguaImages);
  html += renderImageSection('Fotos finales', p.finalImages);

  if (p.model3d) {
    const modelStageId = `model-stage-${p.id}`;
    const modelSrc = p.model3d.src || '';
    html += `<div class="section"><div class="model-viewer model-viewer-full"><div class="model-scene${modelSrc ? ' model-scene-stl' : ''}"${modelSrc ? ` id="${modelStageId}" data-stl-viewer="${p.id}" data-stl-src="${esc(modelSrc)}"` : ''} aria-label="${esc(p.model3d.title || 'Visualizador 3D')}">${modelSrc ? `<div class="model-loading" aria-hidden="true"><div class="model-loading-text">El visor 3D se activa solo cuando pulses “Ver modelo 3D”.</div><button class="btn btn-outline btn-sm" type="button" data-stl-open="${p.id}">Ver modelo 3D</button></div>` : `<div class="model-cube"><div class="cube-face cube-front"></div><div class="cube-face cube-back"></div><div class="cube-face cube-right"></div><div class="cube-face cube-left"></div><div class="cube-face cube-top"></div><div class="cube-face cube-bottom"></div></div>`}</div></div></div>`;
  }

  if (p.timeline?.length) {
    html+=`<div class="section"><div class="section-label">Proceso de trabajo</div><div class="timeline">${
      p.timeline.map(t=>`<div class="tl-item"><div class="tl-line"><div class="tl-dot"></div><div class="tl-connector"></div></div><div class="tl-content"><div class="tl-title">${t.title}</div><div class="tl-subtitle">${t.desc}</div></div></div>`).join('')
    }</div></div>`;
  }

  if (p.downloads?.length) {
    html+=`<div class="section"><div class="section-label">Descargables</div><div class="downloads-list">${
      p.downloads.map(d=>`<a class="dl-row" href="${esc(d.url)}" download target="_blank" rel="noopener">
        <div class="dl-ext ${d.ext.toLowerCase()}">${esc(d.ext)}</div>
        <div class="dl-info"><span class="dl-name">${esc(d.name)}</span><span class="dl-desc">${esc(d.desc)}</span></div>
        <span class="dl-size">${esc(d.size)}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--muted-foreground);flex-shrink:0"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      </a>`).join('')
    }</div></div>`;
  }

  if (p.stage2) {
    html += `<div class="section"><div class="section-label">${esc(p.stage2.title)}</div>${p.stage2.description?.trim() ? `<div class="prose">${marked.parse(p.stage2.description)}</div>` : ''}</div>`;

    if (p.stage2.pdfs?.length) {
      html += renderPdfSection(p.id, 'Láminas PDF', p.stage2.pdfs, 'stage2');
    }
  }

  if (p.typography?.fonts?.length) {
    const typeInputId = `type-preview-input-${p.id}`;
    const defaultSample = esc(p.typography.sample || 'REBALSE');
    html += `<div class="section">
      <div class="section-label">${esc(p.typography.title || 'Visualizador de tipografías')}</div>
      <div class="type-viewer-controls">
        <label for="${typeInputId}" class="type-viewer-label">Texto de prueba</label>
        <input id="${typeInputId}" class="type-viewer-input" type="text" value="${defaultSample}" maxlength="90"/>
      </div>
      <div class="type-viewer-grid">
        ${p.typography.fonts.map((font) => {
          const variants = font.variants?.length ? font.variants : [{ label: font.style || 'Default', family: font.family }];
          const first = variants[0];
          const family = first.family || font.family;
          const weight = first.weight ? `font-weight:${first.weight};` : '';
          const fstyle = first.fontStyle ? `font-style:${first.fontStyle};` : '';
          return `<article class="type-card">
            <div class="type-card-head">
              <div>
                <div class="type-card-name">${esc(font.name)}</div>
                <div class="type-card-meta">${esc(font.source || '')}</div>
              </div>
              <div class="type-card-meta type-card-meta-right">${esc(font.style || '')}</div>
            </div>
            <div class="type-sample" style="font-family:${esc(family)};${weight}${fstyle}" data-type-preview="${p.id}">${defaultSample}</div>
            <div class="type-card-info">
              <span>${esc(font.license || '')}</span>
              <span>${esc(font.usage || '')}</span>
            </div>
            <div class="type-variant-list">
              ${variants.map((variant) => `<button class="type-variant-select" type="button" data-type-preview="${p.id}" data-family="${esc(variant.family || font.family)}" data-weight="${esc(variant.weight || '')}" data-font-style="${esc(variant.fontStyle || '')}">${esc(variant.label || variant.family || font.family)}</button>`).join('')}
            </div>
          </article>`;
        }).join('')}
      </div>
    </div>`;
  }

  if (p.references?.length) {
    html += `<div class="section"><div class="section-label">Bibliografía APA 7</div><div class="ref-list">${p.references.map((ref, idx) => `<div class="ref-item"><span class="ref-index">${idx + 1}.</span> <span class="ref-text">${esc(ref.text)}</span> <a href="${esc(ref.url)}" target="_blank" rel="noopener">${esc(ref.url)}</a></div>`).join('')}</div></div>`;
  }

  viewRoot.innerHTML = html + footerHTML();

  // Asignar la función de regresar al inicio al presionar el botón
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      navigate('home');
    });
  }

  setupGalleryInteractions();
  setupTypographyViewer(p.id);
  setupPdfInteractions();
  setupStlLauncher(p.id);
  setupVideoThumbnails(p.id);

  if (p.pdfs?.length) p.pdfs.forEach((pdf, i) => { if (pdf.src) renderPDF(pdf.src, `pdfcanvas-${p.id}-primary-${i}`); });
  if (p.pdfSections?.length) {
    p.pdfSections.forEach((section, sectionIndex) => {
      const scope = section.scope || `custom-${sectionIndex}`;
      section.pdfs?.forEach((pdf, idx) => {
        if (pdf.src) renderPDF(pdf.src, `pdfcanvas-${p.id}-${scope}-${idx}`);
      });
    });
  }
  if (p.stage2?.pdfs?.length) p.stage2.pdfs.forEach((pdf, i) => { if (pdf.src) renderPDF(pdf.src, `pdfcanvas-${p.id}-stage2-${i}`); });
}

function setupStlLauncher(projectId) {
  const trigger = viewRoot.querySelector(`[data-stl-open="${projectId}"]`);
  if (!trigger) return;

  trigger.addEventListener('click', () => {
    setupStlViewer(projectId);
  });
}

function setupGalleryInteractions() {
  const thumbs = Array.from(viewRoot.querySelectorAll('.gallery-thumb[data-gallery-src]'));
  lbImages = thumbs.map((thumb) => ({
    src: thumb.getAttribute('data-gallery-src') || '',
    caption: thumb.getAttribute('data-gallery-caption') || '',
  })).filter((img) => img.src);

  thumbs.forEach((thumb, idx) => {
    const open = () => {
      if (!lbImages.length) return;
      openLightbox(idx);
    };
    thumb.addEventListener('click', open);
    thumb.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });
}

function renderPdfSection(projectId, title, pdfs, scope) {
  const sectionId = `pdf-section-${projectId}-${scope}`;
  const gridId = `pdf-grid-${projectId}-${scope}`;
  return `<div class="section pdf-section" id="${sectionId}" data-pdf-section>
    <div class="pdf-section-head">
      <div class="section-label">${esc(title)}</div>
      <button class="pdf-toggle-btn" type="button" data-pdf-toggle data-target="${gridId}" aria-expanded="true">Ocultar PDFs / láminas</button>
    </div>
    <div class="pdf-grid" id="${gridId}">
      ${pdfs.map((pdf, idx) => {
        const cid = `pdfcanvas-${projectId}-${scope}-${idx}`;
        return `<article class="pdf-card" tabindex="0" role="button" data-pdf-card data-target="${cid}" aria-expanded="false">
          <div class="pdf-card-preview">
            <div class="pdf-pages pdf-pages--compact" id="${cid}"><div class="pdf-loading">Cargando lámina…</div></div>
          </div>
          <div class="pdf-card-meta">
            <div class="pdf-card-title">${esc(pdf.label)}</div>
            <div class="pdf-card-desc">${esc(pdf.description || '')}</div>
            <div class="pdf-card-actions">
              <span class="pdf-card-hint">Click para agrandar</span>
              <a href="${esc(pdf.src)}" target="_blank" rel="noopener" class="btn btn-outline btn-sm pdf-open-link">Abrir PDF</a>
            </div>
          </div>
        </article>`;
      }).join('')}
    </div>
  </div>`;
}

function setupPdfInteractions() {
  const sections = viewRoot.querySelectorAll('[data-pdf-section]');
  if (!sections.length) return;

  sections.forEach((section) => {
    const toggleBtn = section.querySelector('[data-pdf-toggle]');
    const grid = section.querySelector('.pdf-grid');
    if (toggleBtn && grid) {
      toggleBtn.addEventListener('click', () => {
        const hidden = grid.classList.toggle('is-hidden');
        toggleBtn.setAttribute('aria-expanded', String(!hidden));
        toggleBtn.textContent = hidden ? 'Mostrar PDFs / láminas' : 'Ocultar PDFs / láminas';
      });
    }

    section.querySelectorAll('[data-pdf-card]').forEach((card) => {
      const toggleCard = () => {
        const expanded = card.classList.toggle('is-expanded');
        card.setAttribute('aria-expanded', String(expanded));
      };

      card.addEventListener('click', (event) => {
        if (event.target.closest('a, button')) return;
        toggleCard();
      });
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleCard();
        }
      });
    });
  });
}

function setupStlViewer(projectId) {
  const stage = viewRoot.querySelector(`[data-stl-viewer="${projectId}"]`);
  if (!stage || !stage.dataset.stlSrc || stage.dataset.stlReady === 'true') return;
  const src = stage.dataset.stlSrc;
  stage.dataset.stlReady = 'true';
  stage.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvas.className = 'model-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  stage.appendChild(canvas);

  const overlay = document.createElement('div');
  overlay.className = 'model-overlay';
  overlay.innerHTML = '<div class="model-loading"><div class="model-loading-dot"></div><div class="model-loading-text">Cargando STL...</div></div>';
  stage.appendChild(overlay);

  const context = canvas.getContext('2d');
  if (!context) {
    stage.innerHTML = '<div class="model-loading">No se pudo inicializar el visor 3D.</div>';
    return;
  }

  const state = {
    yaw: 0.7,
    pitch: -0.35,
    zoom: 1,
    dragging: false,
    lastX: 0,
    lastY: 0,
    autoRotate: true,
  };

  const lightDirection = normalizeVector({ x: 0.35, y: 0.7, z: 0.6 });

  const resize = () => {
    const width = Math.max(1, stage.clientWidth || 320);
    const height = Math.max(1, stage.clientHeight || 420);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const observer = new ResizeObserver(resize);
  observer.observe(stage);

  const draw = (triangles, bounds) => {
    const width = stage.clientWidth || 320;
    const height = stage.clientHeight || 420;
    context.clearRect(0, 0, width, height);

    const bg = context.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, '#fcfcfd');
    bg.addColorStop(1, '#f2f2ef');
    context.fillStyle = bg;
    context.fillRect(0, 0, width, height);

    const size = Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY, bounds.maxZ - bounds.minZ) || 1;
    const scale = Math.min(width, height) * 0.34 / size;
    const cameraDistance = Math.max(280, size * 2.4);

    const projected = triangles
      .map((triangle) => {
        const p1 = projectStlVertex(triangle[0], state.yaw, state.pitch, width, height, scale, cameraDistance, state.zoom);
        const p2 = projectStlVertex(triangle[1], state.yaw, state.pitch, width, height, scale, cameraDistance, state.zoom);
        const p3 = projectStlVertex(triangle[2], state.yaw, state.pitch, width, height, scale, cameraDistance, state.zoom);
        const faceNormal = normalizeVector(crossVector(subtractVector(p2.rotated, p1.rotated), subtractVector(p3.rotated, p1.rotated)));
        const depth = (p1.z + p2.z + p3.z) / 3;
        const lighting = Math.max(0.15, 0.25 + dotVector(faceNormal, lightDirection) * 0.75);
        return { points: [p1, p2, p3], depth, lighting };
      })
      .sort((a, b) => a.depth - b.depth);

    projected.forEach((triangle) => {
      context.beginPath();
      context.moveTo(triangle.points[0].x, triangle.points[0].y);
      context.lineTo(triangle.points[1].x, triangle.points[1].y);
      context.lineTo(triangle.points[2].x, triangle.points[2].y);
      context.closePath();
      const shade = Math.round(28 + triangle.lighting * 180);
      context.fillStyle = `rgb(${shade}, ${shade}, ${shade + 2})`;
      context.strokeStyle = 'rgba(15, 15, 16, 0.12)';
      context.lineWidth = 1;
      context.fill();
      context.stroke();
    });

    context.strokeStyle = 'rgba(17, 17, 19, 0.08)';
    context.lineWidth = 1;
    context.strokeRect(0.5, 0.5, width - 1, height - 1);
  };

  const renderState = (geometry) => {
    const triangles = geometry.triangles.map((triangle) => triangle.map((vertex) => ({
      x: vertex.x - geometry.center.x,
      y: vertex.y - geometry.center.y,
      z: vertex.z - geometry.center.z,
    })));

    const bounds = geometry.bounds;
    const animate = () => {
      if (state.autoRotate && !state.dragging) {
        state.yaw += 0.0025;
      }
      draw(triangles, bounds);
      requestAnimationFrame(animate);
    };

    resize();
    overlay.remove();
    animate();
  };

  const onPointerDown = (event) => {
    state.dragging = true;
    state.autoRotate = false;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    stage.classList.add('is-dragging');
    canvas.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!state.dragging) return;
    const deltaX = event.clientX - state.lastX;
    const deltaY = event.clientY - state.lastY;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    state.yaw += deltaX * 0.008;
    state.pitch = clampValue(state.pitch + deltaY * 0.008, -1.25, 1.25);
  };

  const onPointerUp = (event) => {
    state.dragging = false;
    stage.classList.remove('is-dragging');
    canvas.releasePointerCapture?.(event.pointerId);
  };

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);
  canvas.addEventListener('pointerleave', onPointerUp);
  canvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    const delta = Math.sign(event.deltaY) * 0.08;
    state.zoom = clampValue(state.zoom - delta, 0.55, 2.15);
    state.autoRotate = false;
  }, { passive: false });
  canvas.addEventListener('dblclick', () => {
    state.yaw = 0.7;
    state.pitch = -0.35;
    state.zoom = 1;
    state.autoRotate = true;
  });

  fetch(new URL(src, document.baseURI).href)
    .then((response) => {
      if (!response.ok) throw new Error('No se pudo leer el STL');
      return response.arrayBuffer();
    })
    .then((buffer) => parseBinaryStl(buffer))
    .then((geometry) => renderState(geometry))
    .catch(() => {
      observer.disconnect();
      stage.innerHTML = '<div class="model-loading">No se pudo cargar el STL.</div>';
    });
}

function parseBinaryStl(buffer) {
  const data = new DataView(buffer);
  const triangleCount = data.getUint32(80, true);
  const triangles = [];
  let offset = 84;
  const bounds = {
    minX: Infinity,
    minY: Infinity,
    minZ: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
    maxZ: -Infinity,
  };

  for (let index = 0; index < triangleCount; index += 1) {
    offset += 12;
    const triangle = [];

    for (let vertexIndex = 0; vertexIndex < 3; vertexIndex += 1) {
      const vertex = {
        x: data.getFloat32(offset, true),
        y: data.getFloat32(offset + 4, true),
        z: data.getFloat32(offset + 8, true),
      };
      triangle.push(vertex);
      bounds.minX = Math.min(bounds.minX, vertex.x);
      bounds.minY = Math.min(bounds.minY, vertex.y);
      bounds.minZ = Math.min(bounds.minZ, vertex.z);
      bounds.maxX = Math.max(bounds.maxX, vertex.x);
      bounds.maxY = Math.max(bounds.maxY, vertex.y);
      bounds.maxZ = Math.max(bounds.maxZ, vertex.z);
      offset += 12;
    }

    triangles.push(triangle);
    offset += 2;
  }

  const center = {
    x: (bounds.minX + bounds.maxX) / 2,
    y: (bounds.minY + bounds.maxY) / 2,
    z: (bounds.minZ + bounds.maxZ) / 2,
  };

  return { triangles, bounds, center };
}

function projectStlVertex(vertex, yaw, pitch, width, height, scale, cameraDistance, zoom) {
  const rotated = rotateVertex(vertex, yaw, pitch);
  const perspective = cameraDistance / (cameraDistance - rotated.z);
  return {
    x: width / 2 + rotated.x * scale * perspective * zoom,
    y: height / 2 - rotated.y * scale * perspective * zoom,
    z: rotated.z,
    rotated,
  };
}

function rotateVertex(vertex, yaw, pitch) {
  const cosYaw = Math.cos(yaw);
  const sinYaw = Math.sin(yaw);
  const cosPitch = Math.cos(pitch);
  const sinPitch = Math.sin(pitch);

  const x1 = vertex.x * cosYaw - vertex.z * sinYaw;
  const z1 = vertex.x * sinYaw + vertex.z * cosYaw;
  const y1 = vertex.y * cosPitch - z1 * sinPitch;
  const z2 = vertex.y * sinPitch + z1 * cosPitch;

  return { x: x1, y: y1, z: z2 };
}

function subtractVector(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function crossVector(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

function dotVector(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function normalizeVector(vector) {
  const length = Math.hypot(vector.x, vector.y, vector.z) || 1;
  return { x: vector.x / length, y: vector.y / length, z: vector.z / length };
}

function clampValue(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function setupVideoThumbnails(projectId) {
  const videos = viewRoot.querySelectorAll(`video[data-video-thumb][data-video-src]`);
  if (!videos.length) return;

  videos.forEach((videoEl) => {
    const src = videoEl.dataset.videoSrc;
    if (!src || videoPosterCache.has(src)) {
      const cached = videoPosterCache.get(src);
      if (cached) cached.then((poster) => { if (poster && videoEl.isConnected) videoEl.poster = poster; });
      return;
    }

    const posterPromise = captureVideoPoster(src)
      .then((poster) => {
        if (poster && videoEl.isConnected) videoEl.poster = poster;
        return poster;
      })
      .catch(() => null);

    videoPosterCache.set(src, posterPromise);
  });
}

async function captureVideoPoster(src) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.src = src;

    const cleanup = () => {
      video.removeAttribute('src');
      video.load();
    };

    const fail = () => {
      cleanup();
      reject(new Error('No se pudo generar la miniatura del video.'));
    };

    video.addEventListener('error', fail, { once: true });
    video.addEventListener('loadeddata', async () => {
      try {
        const seekTime = Math.min(0.3, Math.max(0.05, (video.duration || 1) * 0.05));
        video.currentTime = seekTime;
      } catch (error) {
        fail();
      }
    }, { once: true });

    video.addEventListener('seeked', () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Canvas no disponible');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const poster = canvas.toDataURL('image/jpeg', 0.82);
        cleanup();
        resolve(poster);
      } catch (error) {
        fail();
      }
    }, { once: true });

    video.load();
  });
}

function setupTypographyViewer(projectId) {
  const input = document.getElementById(`type-preview-input-${projectId}`);
  if (!input) return;

  const samples = viewRoot.querySelectorAll(`.type-sample[data-type-preview="${projectId}"]`);
  const variantSelects = viewRoot.querySelectorAll(`.type-variant-select[data-type-preview="${projectId}"]`);
  const updateSamples = () => {
    const text = input.value?.trim() || 'REBALSE';
    samples.forEach((sample) => {
      sample.textContent = text;
    });
  };

  input.addEventListener('input', updateSamples);

  variantSelects.forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.type-card');
      const sample = card?.querySelector('.type-sample');
      if (!sample) return;

      const family = button.dataset.family || 'Poppins';
      const weight = button.dataset.weight || '';
      const fontStyle = button.dataset.fontStyle || '';

      sample.style.fontFamily = `'${family}', var(--font)`;
      sample.style.fontWeight = weight || '400';
      sample.style.fontStyle = fontStyle || 'normal';
    });
  });
}

async function ensureDynamicFont(family, source) {
  if (!family || !source || loadedDynamicFonts.has(family)) return;

  try {
    const fontFace = new FontFace(family, `url('${source}')`);
    await fontFace.load();
    document.fonts.add(fontFace);
    loadedDynamicFonts.add(family);
  } catch (error) {
    console.warn('No se pudo cargar la variante tipografica:', source, error);
  }
}

function setupReferencesToggle() {
  const buttons = viewRoot.querySelectorAll('.ref-more-btn');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-ref-target');
      if (!targetId) return;

      const list = document.getElementById(targetId);
      if (!list) return;

      const hiddenItems = list.querySelectorAll('.ref-item.is-hidden');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const nextExpanded = !isExpanded;

      hiddenItems.forEach((item) => {
        item.style.display = nextExpanded ? 'block' : 'none';
      });

      btn.setAttribute('aria-expanded', String(nextExpanded));
      const label = btn.querySelector('.ref-more-label');
      if (label) label.textContent = nextExpanded ? 'Ver menos' : 'Ver más';
      btn.classList.toggle('expanded', nextExpanded);
    });
  });
}

async function renderPDF(src, cid) {
  const el=document.getElementById(cid); if(!el) return;

  // PDF.js suele fallar cuando el HTML se abre con file://. En ese caso mostramos fallback claro.
  if (isFileProtocol) {
    el.innerHTML = `<div class="pdf-loading">La previsualización de PDF puede fallar en modo local (<code>file://</code>). Abrí el proyecto con un servidor local para verlo aquí. Mientras tanto podés usar <a href="${esc(src)}" target="_blank" rel="noopener">este enlace directo al PDF</a>.</div>`;
    return;
  }

  try {
    const pdf=await pdfjsLib.getDocument(src).promise;
    el.innerHTML='';
    const page=await pdf.getPage(1);
    const vp=page.getViewport({scale:1.2});
    const canvas=document.createElement('canvas');
    canvas.width=vp.width; canvas.height=vp.height;
    await page.render({canvasContext:canvas.getContext('2d'),viewport:vp}).promise;
    el.appendChild(canvas);
  } catch(e){
    el.innerHTML=`<div class="pdf-loading">No se pudo cargar la lámina. Probá abrir el archivo en una pestaña nueva: <a href="${esc(src)}" target="_blank" rel="noopener">abrir PDF</a>.</div>`;
  }
}

function openLightbox(i){ lbIdx=i; updateLB(); lightbox.classList.add('open'); document.body.style.overflow='hidden'; }
function closeLightbox(){ lightbox.classList.remove('open'); document.body.style.overflow=''; }
function updateLB(){
  const img=lbImages[lbIdx];
  lbImg.src=img.src; lbImg.alt=img.caption||'';
  lbCaption.textContent=img.caption||'';
  lbCounter.textContent=`${lbIdx+1} / ${lbImages.length}`;
}
document.getElementById('lb-close').addEventListener('click',closeLightbox);
document.getElementById('lb-prev').addEventListener('click',()=>{ lbIdx=(lbIdx-1+lbImages.length)%lbImages.length; updateLB(); });
document.getElementById('lb-next').addEventListener('click',()=>{ lbIdx=(lbIdx+1)%lbImages.length; updateLB(); });
lightbox.addEventListener('click',e=>{ if(e.target===lightbox) closeLightbox(); });
document.addEventListener('keydown',e=>{
  if(!lightbox.classList.contains('open')) return;
  if(e.key==='Escape') closeLightbox();
  if(e.key==='ArrowLeft'){ lbIdx=(lbIdx-1+lbImages.length)%lbImages.length; updateLB(); }
  if(e.key==='ArrowRight'){ lbIdx=(lbIdx+1)%lbImages.length; updateLB(); }
});

if (scrollFab) {
  scrollFab.addEventListener('click', () => {
    const direction = scrollFab.dataset.direction === 'up' ? 'up' : 'down';
    const targetTop = direction === 'up' ? 0 : document.documentElement.scrollHeight;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
  window.addEventListener('scroll', updateScrollFab, { passive: true });
  window.addEventListener('resize', updateScrollFab);
}

function footerHTML(){
  return `<footer>
    <div class="footer-grid">
      <div class="footer-about">
        <h3 class="footer-h">Sobre este archivo</h3>
        <p class="footer-p">Repositorio personal de proyectos académicos de diseño.</p>
        <div class="footer-bullets">
          <div class="footer-bullet"><div class="footer-dot"></div><span>Uso personal</span></div>
          <div class="footer-bullet"><div class="footer-dot"></div><span>Sin recolección de datos</span></div>
          <div class="footer-bullet"><div class="footer-dot"></div><span>Procesamiento local</span></div>
        </div>
      </div>
      <div class="footer-contact">
        <h3 class="footer-h">Contacto</h3>
        <div class="footer-btns">
          <a href="https://github.com/antomarinooo/" target="_blank" rel="noopener" class="footer-social">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            GitHub
          </a>
          <a href="https://www.instagram.com/archivoantoo/" target="_blank" rel="noopener" class="footer-social">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Instagram
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">© ${new Date().getFullYear()} Anto Marino — Todos los derechos reservados</p>
      <div class="footer-tech">
        <span class="footer-tech-label">Hecho con</span>
        <span class="footer-tech-item">HTML</span>
        <span class="footer-tech-item">JS</span>
        <span class="footer-tech-item">CSS</span>
      </div>
    </div>
  </footer>`;
}

function esc(s){ if(!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

buildNav();
renderView();
updateScrollFab();
