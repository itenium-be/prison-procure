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

// Generate stock movements for demo with deterministic data
// Uses a seeded approach based on articleId for consistent results
function generateMovements(
  articleId: string,
  articleCode: string,
  articleName: string,
  warehouseId: string,
  targetCurrentStock: number
): StockMovement[] {
  // Use articleId as seed for deterministic "random" values
  const seed = parseInt(articleId) || 1
  const seededRandom = (offset: number) => {
    const x = Math.sin(seed * 1000 + offset * 100) * 10000
    return x - Math.floor(x)
  }

  // Reference strings
  const refs = {
    in: ['Levering SUP001', 'Levering SUP002', 'Levering SUP003', 'Correctie +', 'Retour'],
    out: ['Keuken', 'Afdeling A', 'Afdeling B', 'Afdeling C', 'Correctie -', 'Afval'],
  }

  // First, plan all movements to calculate required starting stock
  const plannedMovements: { day: number; type: 'in' | 'out'; quantity: number; ref: string }[] = []

  for (let day = 2; day <= 24; day++) {
    if (seededRandom(day) > 0.4) {
      const isIn = seededRandom(day + 100) > 0.6
      const baseQty = isIn
        ? Math.floor(seededRandom(day + 200) * 40) + 10
        : Math.floor(seededRandom(day + 200) * 15) + 5
      const refList = isIn ? refs.in : refs.out
      plannedMovements.push({
        day,
        type: isIn ? 'in' : 'out',
        quantity: baseQty,
        ref: refList[Math.floor(seededRandom(day + 300) * refList.length)],
      })
    }
  }

  // Calculate net change from all planned movements
  let netChange = 0
  plannedMovements.forEach(m => {
    if (m.type === 'in') netChange += m.quantity
    else netChange -= m.quantity
  })

  // Calculate starting stock needed to end at targetCurrentStock
  const startingStock = Math.max(50, targetCurrentStock - netChange)

  // Now generate the actual movements
  const movements: StockMovement[] = []
  let runningStock = startingStock

  // Initial stock
  movements.push({
    id: `mov-${articleId}-0`,
    articleId,
    articleCode,
    articleName,
    warehouseId,
    date: '2024-12-01',
    type: 'in',
    quantity: startingStock,
    reference: 'Beginvoorraad',
    runningStock: startingStock,
  })

  // Apply all planned movements
  plannedMovements.forEach((m) => {
    if (m.type === 'in') {
      runningStock += m.quantity
    } else {
      runningStock = Math.max(0, runningStock - m.quantity)
    }

    movements.push({
      id: `mov-${articleId}-${m.day}`,
      articleId,
      articleCode,
      articleName,
      warehouseId,
      date: `2024-12-${m.day.toString().padStart(2, '0')}`,
      type: m.type,
      quantity: m.quantity,
      reference: m.ref,
      runningStock,
    })
  })

  // Final adjustment to ensure we hit the target exactly
  if (runningStock !== targetCurrentStock) {
    const diff = targetCurrentStock - runningStock
    if (diff > 0) {
      runningStock = targetCurrentStock
      movements.push({
        id: `mov-${articleId}-24-adj`,
        articleId,
        articleCode,
        articleName,
        warehouseId,
        date: '2024-12-24',
        type: 'in',
        quantity: diff,
        reference: 'Levering SUP001',
        runningStock,
      })
    } else if (diff < 0) {
      const outQty = Math.min(-diff, runningStock)
      runningStock -= outQty
      movements.push({
        id: `mov-${articleId}-24-adj`,
        articleId,
        articleCode,
        articleName,
        warehouseId,
        date: '2024-12-24',
        type: 'out',
        quantity: outQty,
        reference: 'Afdeling A',
        runningStock,
      })
    }
  }

  return movements.sort((a, b) => a.date.localeCompare(b.date))
}

// Helper to create article stock with synchronized data
function createArticleStock(
  articleId: string,
  articleCode: string,
  articleName: string,
  unit: string,
  currentStock: number,
  minStock: number,
  warehouseId: string
): ArticleStock {
  return {
    articleId,
    articleCode,
    articleName,
    unit,
    currentStock,
    minStock,
    movements: generateMovements(articleId, articleCode, articleName, warehouseId, currentStock),
  }
}

export const DUMMY_ARTICLE_STOCKS: ArticleStock[] = [
  createArticleStock('1', 'ART-000001', 'Coca-Cola Classic', 'st', 48, 24, 'wh-001'),
  createArticleStock('3', 'ART-000003', 'Wit Brood Gesneden', 'st', 12, 20, 'wh-002'),
  createArticleStock('4', 'ART-000004', 'Halfvolle Melk', 'st', 36, 24, 'wh-004'),
  createArticleStock('5', 'ART-000005', 'Kippenfilet Vers', 'kg', 8, 15, 'wh-004'),
  createArticleStock('8', 'ART-000008', 'Diepvries Frietjes', 'kg', 45, 30, 'wh-005'),
  createArticleStock('13', 'ART-000013', 'Toiletpapier 3-laags', 'st', 144, 96, 'wh-003'),
  createArticleStock('14', 'ART-000014', 'Vaatwastabletten All-in-One', 'st', 25, 50, 'wh-003'),
  createArticleStock('17', 'ART-000017', 'Kopieerpapier A4 80g', 'st', 15, 10, 'wh-001'),
]
