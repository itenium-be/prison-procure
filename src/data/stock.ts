export interface Warehouse {
  id: string
  code: string
  name: string
  prisonId: string
}

export interface StockMovement {
  id: string
  articleId: string
  articleCode: string
  articleName: string
  warehouseId: string
  date: string
  type: 'in' | 'out'
  quantity: number
  reference: string
  runningStock: number
}

export interface ArticleStock {
  articleId: string
  articleCode: string
  articleName: string
  unit: string
  currentStock: number
  minStock: number
  movements: StockMovement[]
}

// Warehouses per prison
export const DUMMY_WAREHOUSES: Warehouse[] = [
  // Antwerpen
  { id: 'wh-001', code: 'MAG-001', name: 'Hoofdmagazijn', prisonId: 'antwerpen' },
  { id: 'wh-002', code: 'MAG-002', name: 'Keukenvoorraad', prisonId: 'antwerpen' },
  { id: 'wh-003', code: 'MAG-003', name: 'Schoonmaakproducten', prisonId: 'antwerpen' },
  { id: 'wh-004', code: 'MAG-004', name: 'Koelcel', prisonId: 'antwerpen' },
  { id: 'wh-005', code: 'MAG-005', name: 'Diepvriescel', prisonId: 'antwerpen' },
  // Brugge
  { id: 'wh-006', code: 'MAG-001', name: 'Centraal Magazijn', prisonId: 'brugge' },
  { id: 'wh-007', code: 'MAG-002', name: 'Voedingsopslag', prisonId: 'brugge' },
  { id: 'wh-008', code: 'MAG-003', name: 'Hygiëne & Schoonmaak', prisonId: 'brugge' },
  // Gent
  { id: 'wh-009', code: 'MAG-001', name: 'Algemeen Magazijn', prisonId: 'gent' },
  { id: 'wh-010', code: 'MAG-002', name: 'Keukenopslag', prisonId: 'gent' },
  { id: 'wh-011', code: 'MAG-003', name: 'Koude Opslag', prisonId: 'gent' },
  { id: 'wh-012', code: 'MAG-004', name: 'Kantoorbenodigdheden', prisonId: 'gent' },
]

// Generate stock movements for demo
function generateMovements(articleId: string, articleCode: string, articleName: string, warehouseId: string): StockMovement[] {
  const movements: StockMovement[] = []
  let runningStock = 100 // Start with initial stock
  const startDate = new Date('2024-12-01')

  // Initial stock
  movements.push({
    id: `mov-${articleId}-0`,
    articleId,
    articleCode,
    articleName,
    warehouseId,
    date: '2024-12-01',
    type: 'in',
    quantity: 100,
    reference: 'Beginvoorraad',
    runningStock: 100,
  })

  // Generate random movements over December
  const refs = {
    in: ['Levering SUP001', 'Levering SUP002', 'Levering SUP003', 'Correctie +', 'Retour'],
    out: ['Keuken', 'Afdeling A', 'Afdeling B', 'Afdeling C', 'Correctie -', 'Afval'],
  }

  for (let day = 2; day <= 24; day++) {
    // Random chance of movement each day
    if (Math.random() > 0.4) {
      const isIn = Math.random() > 0.6
      const quantity = isIn ? Math.floor(Math.random() * 50) + 10 : Math.floor(Math.random() * 20) + 5

      if (isIn) {
        runningStock += quantity
      } else {
        runningStock = Math.max(0, runningStock - quantity)
      }

      const refList = isIn ? refs.in : refs.out
      movements.push({
        id: `mov-${articleId}-${day}`,
        articleId,
        articleCode,
        articleName,
        warehouseId,
        date: `2024-12-${day.toString().padStart(2, '0')}`,
        type: isIn ? 'in' : 'out',
        quantity,
        reference: refList[Math.floor(Math.random() * refList.length)],
        runningStock,
      })
    }
  }

  return movements.sort((a, b) => a.date.localeCompare(b.date))
}

export const DUMMY_ARTICLE_STOCKS: ArticleStock[] = [
  {
    articleId: '1',
    articleCode: 'ART-000001',
    articleName: 'Coca-Cola Classic',
    unit: 'st',
    currentStock: 48,
    minStock: 24,
    movements: generateMovements('1', 'ART-000001', 'Coca-Cola Classic', 'wh-001'),
  },
  {
    articleId: '3',
    articleCode: 'ART-000003',
    articleName: 'Wit Brood Gesneden',
    unit: 'st',
    currentStock: 12,
    minStock: 20,
    movements: generateMovements('3', 'ART-000003', 'Wit Brood Gesneden', 'wh-002'),
  },
  {
    articleId: '4',
    articleCode: 'ART-000004',
    articleName: 'Halfvolle Melk',
    unit: 'st',
    currentStock: 36,
    minStock: 24,
    movements: generateMovements('4', 'ART-000004', 'Halfvolle Melk', 'wh-004'),
  },
  {
    articleId: '5',
    articleCode: 'ART-000005',
    articleName: 'Kippenfilet Vers',
    unit: 'kg',
    currentStock: 8,
    minStock: 15,
    movements: generateMovements('5', 'ART-000005', 'Kippenfilet Vers', 'wh-004'),
  },
  {
    articleId: '8',
    articleCode: 'ART-000008',
    articleName: 'Diepvries Frietjes',
    unit: 'kg',
    currentStock: 45,
    minStock: 30,
    movements: generateMovements('8', 'ART-000008', 'Diepvries Frietjes', 'wh-005'),
  },
  {
    articleId: '13',
    articleCode: 'ART-000013',
    articleName: 'Toiletpapier 3-laags',
    unit: 'st',
    currentStock: 144,
    minStock: 96,
    movements: generateMovements('13', 'ART-000013', 'Toiletpapier 3-laags', 'wh-003'),
  },
  {
    articleId: '14',
    articleCode: 'ART-000014',
    articleName: 'Vaatwastabletten All-in-One',
    unit: 'st',
    currentStock: 25,
    minStock: 50,
    movements: generateMovements('14', 'ART-000014', 'Vaatwastabletten All-in-One', 'wh-003'),
  },
  {
    articleId: '17',
    articleCode: 'ART-000017',
    articleName: 'Kopieerpapier A4 80g',
    unit: 'st',
    currentStock: 15,
    minStock: 10,
    movements: generateMovements('17', 'ART-000017', 'Kopieerpapier A4 80g', 'wh-001'),
  },
]
