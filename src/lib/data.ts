export const NAV_LINKS = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'historia', label: 'História' },
  { id: 'numeros', label: 'Números' },
  { id: 'divisoes', label: 'Divisões' },
  { id: 'tecnologia', label: 'Tecnologia' },
  { id: 'contato', label: 'Contato' },
]

export const TIMELINE = [
  { year: '2014', title: 'Fundação', text: 'Nasce em São Paulo com 5 pessoas e uma ideia: unir dados, energia e pessoas.' },
  { year: '2016', title: 'Nexora AI', text: 'Lançamento da primeira plataforma de inteligência artificial para empresas.' },
  { year: '2018', title: 'Nexora Energy', text: 'Criação da divisão de energia solar e sistemas de armazenamento.' },
  { year: '2020', title: 'Nexora Cloud', text: 'Inauguração do primeiro data center próprio, com operação 100% renovável.' },
  { year: '2022', title: 'Expansão global', text: 'Chegada a Portugal e ao Chile, abrindo operações internacionais.' },
  { year: '2024', title: 'Nexora Cities', text: 'Lançamento da divisão e do primeiro projeto de cidade inteligente.' },
  { year: '2026', title: 'Escala', text: 'Mais de 1.200 colaboradores e presença em 8 países.' },
]

export const REVENUE = [2, 5, 9, 18, 30, 42, 65, 90, 130, 180, 240, 310, 400].map((v, i) => ({
  year: String(2014 + i),
  receita: v,
}))

export const HEADCOUNT = [5, 18, 42, 85, 140, 210, 320, 450, 610, 780, 950, 1080, 1200].map((v, i) => ({
  year: String(2014 + i),
  colaboradores: v,
}))

export const REVENUE_SHARE = [
  { name: 'Nexora AI', value: 35, color: '#3B7BEA' },
  { name: 'Nexora Cloud', value: 28, color: '#1F4E9C' },
  { name: 'Nexora Energy', value: 22, color: '#F5F7FA' },
  { name: 'Nexora Cities', value: 15, color: '#8A93A6' },
]

export const COUNTERS = [
  { value: 1200, suffix: '+', label: 'Colaboradores' },
  { value: 8, suffix: '', label: 'Países' },
  { value: 340, suffix: '+', label: 'Clientes' },
  { value: 12, suffix: '', label: 'Anos de história' },
]

export type DivisionKind = 'ai' | 'energy' | 'cloud' | 'cities'

export const DIVISIONS: { kind: DivisionKind; name: string; tag: string; text: string; points: string[] }[] = [
  {
    kind: 'ai',
    name: 'Nexora AI',
    tag: 'Inteligência Artificial',
    text: 'Plataformas de IA que transformam dados em decisões: modelos preditivos, visão computacional e agentes inteligentes para empresas.',
    points: ['Modelos sob medida', 'MLOps gerenciado', 'IA responsável'],
  },
  {
    kind: 'energy',
    name: 'Nexora Energy',
    tag: 'Energia limpa',
    text: 'Usinas solares, baterias de alta densidade e gestão energética inteligente para indústrias, comércio e comunidades.',
    points: ['Geração solar', 'Armazenamento', 'Gestão em tempo real'],
  },
  {
    kind: 'cloud',
    name: 'Nexora Cloud',
    tag: 'Infraestrutura digital',
    text: 'Data centers próprios movidos a energia renovável, nuvem híbrida e conectividade de baixa latência na América Latina e Europa.',
    points: ['Tier III+', 'Nuvem híbrida', 'Edge computing'],
  },
  {
    kind: 'cities',
    name: 'Nexora Cities',
    tag: 'Cidades inteligentes',
    text: 'Sensores, gêmeos digitais e plataformas urbanas para mobilidade, iluminação, segurança e serviços públicos mais eficientes.',
    points: ['Gêmeos digitais', 'Mobilidade urbana', 'IoT em escala'],
  },
]

export const TESTIMONIALS = [
  {
    quote:
      'A Nexora AI reduziu em 38% o tempo de resposta da nossa operação logística. Mais do que tecnologia, encontramos um parceiro que entende o negócio.',
    name: 'Marina Albuquerque',
    role: 'COO, Rotalog Transportes',
  },
  {
    quote:
      'Migramos toda a nossa infraestrutura para a Nexora Cloud em 90 dias, sem nenhuma interrupção. A equipe é impecável e a energia é 100% renovável.',
    name: 'Ricardo Méndez',
    role: 'CTO, Banco Austral (Chile)',
  },
  {
    quote:
      'Com a Nexora Cities, nossa cidade ganhou iluminação inteligente e um gêmeo digital do trânsito. A economia de energia passou de 45% no primeiro ano.',
    name: 'Helena Costa',
    role: 'Secretária de Inovação, Prefeitura de Vale Novo',
  },
]
