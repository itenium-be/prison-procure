export interface Article {
  id: string
  code: string
  description: string
  group: string
  subgroup: string
  packaging: string
  unit: 'st' | 'kg'
  brand: string
  eanCode: string
  intrastat: string
  blocked: boolean
}

export const ARTICLE_GROUPS = [
  { id: 'food', nameKey: 'articles.groups.food' },
  { id: 'beverages', nameKey: 'articles.groups.beverages' },
  { id: 'hygiene', nameKey: 'articles.groups.hygiene' },
  { id: 'cleaning', nameKey: 'articles.groups.cleaning' },
  { id: 'office', nameKey: 'articles.groups.office' },
]

export const ARTICLE_SUBGROUPS: Record<string, { id: string; nameKey: string }[]> = {
  food: [
    { id: 'bread', nameKey: 'articles.subgroups.bread' },
    { id: 'dairy', nameKey: 'articles.subgroups.dairy' },
    { id: 'meat', nameKey: 'articles.subgroups.meat' },
    { id: 'vegetables', nameKey: 'articles.subgroups.vegetables' },
    { id: 'canned', nameKey: 'articles.subgroups.canned' },
    { id: 'frozen', nameKey: 'articles.subgroups.frozen' },
  ],
  beverages: [
    { id: 'softdrinks', nameKey: 'articles.subgroups.softdrinks' },
    { id: 'water', nameKey: 'articles.subgroups.water' },
    { id: 'juice', nameKey: 'articles.subgroups.juice' },
    { id: 'coffee_tea', nameKey: 'articles.subgroups.coffee_tea' },
  ],
  hygiene: [
    { id: 'soap', nameKey: 'articles.subgroups.soap' },
    { id: 'dental', nameKey: 'articles.subgroups.dental' },
    { id: 'paper', nameKey: 'articles.subgroups.paper' },
  ],
  cleaning: [
    { id: 'detergent', nameKey: 'articles.subgroups.detergent' },
    { id: 'disinfectant', nameKey: 'articles.subgroups.disinfectant' },
    { id: 'tools', nameKey: 'articles.subgroups.tools' },
  ],
  office: [
    { id: 'paper_office', nameKey: 'articles.subgroups.paper_office' },
    { id: 'writing', nameKey: 'articles.subgroups.writing' },
  ],
}

export const DUMMY_ARTICLES: Article[] = [
  { id: '1', code: 'ART-000001', description: 'Coca-Cola Classic', group: 'beverages', subgroup: 'softdrinks', packaging: '6 x 33cl blikjes', unit: 'st', brand: 'Coca-Cola', eanCode: '5449000000996', intrastat: '22021010', blocked: false },
  { id: '2', code: 'ART-000002', description: 'Spa Reine Natuurlijk Mineraalwater', group: 'beverages', subgroup: 'water', packaging: '6 x 1.5L flessen', unit: 'st', brand: 'Spa', eanCode: '5410013100012', intrastat: '22011010', blocked: false },
  { id: '3', code: 'ART-000003', description: 'Wit Brood Gesneden', group: 'food', subgroup: 'bread', packaging: '800g brood', unit: 'st', brand: 'Boni', eanCode: '5400141234567', intrastat: '19059090', blocked: false },
  { id: '4', code: 'ART-000004', description: 'Halfvolle Melk', group: 'food', subgroup: 'dairy', packaging: '12 x 1L pakken', unit: 'st', brand: 'Inza', eanCode: '5410761001234', intrastat: '04012099', blocked: false },
  { id: '5', code: 'ART-000005', description: 'Kippenfilet Vers', group: 'food', subgroup: 'meat', packaging: '5kg doos', unit: 'kg', brand: 'Volys', eanCode: '5400141987654', intrastat: '02071410', blocked: false },
  { id: '6', code: 'ART-000006', description: 'Wortelen Geschild', group: 'food', subgroup: 'vegetables', packaging: '10kg zak', unit: 'kg', brand: 'Ardo', eanCode: '5410093112233', intrastat: '07061000', blocked: false },
  { id: '7', code: 'ART-000007', description: 'Tomatenpuree Geconcentreerd', group: 'food', subgroup: 'canned', packaging: '12 x 400g blikken', unit: 'st', brand: 'Mutti', eanCode: '8005110070013', intrastat: '20029019', blocked: false },
  { id: '8', code: 'ART-000008', description: 'Diepvries Frietjes', group: 'food', subgroup: 'frozen', packaging: '4 x 2.5kg zakken', unit: 'kg', brand: 'Lutosa', eanCode: '5410056001234', intrastat: '20041010', blocked: false },
  { id: '9', code: 'ART-000009', description: 'Sinaasappelsap 100%', group: 'beverages', subgroup: 'juice', packaging: '6 x 1L pakken', unit: 'st', brand: 'Tropicana', eanCode: '5410188001234', intrastat: '20091200', blocked: false },
  { id: '10', code: 'ART-000010', description: 'Oploskoffie', group: 'beverages', subgroup: 'coffee_tea', packaging: '6 x 200g potten', unit: 'st', brand: 'Douwe Egberts', eanCode: '8711000123456', intrastat: '21011100', blocked: false },
  { id: '11', code: 'ART-000011', description: 'Handzeep Antibacterieel', group: 'hygiene', subgroup: 'soap', packaging: '12 x 500ml pompen', unit: 'st', brand: 'Dettol', eanCode: '5410091234567', intrastat: '34011100', blocked: false },
  { id: '12', code: 'ART-000012', description: 'Tandpasta Whitening', group: 'hygiene', subgroup: 'dental', packaging: '24 x 75ml tubes', unit: 'st', brand: 'Colgate', eanCode: '8714789123456', intrastat: '33061010', blocked: false },
  { id: '13', code: 'ART-000013', description: 'Toiletpapier 3-laags', group: 'hygiene', subgroup: 'paper', packaging: '96 rollen (8x12)', unit: 'st', brand: 'Page', eanCode: '8710552123456', intrastat: '48181010', blocked: false },
  { id: '14', code: 'ART-000014', description: 'Vaatwastabletten All-in-One', group: 'cleaning', subgroup: 'detergent', packaging: '100 tabletten doos', unit: 'st', brand: 'Dreft', eanCode: '8001090123456', intrastat: '34022090', blocked: false },
  { id: '15', code: 'ART-000015', description: 'Desinfectiemiddel Oppervlakken', group: 'cleaning', subgroup: 'disinfectant', packaging: '6 x 1L flessen', unit: 'st', brand: 'Dettol', eanCode: '5410091234890', intrastat: '38089490', blocked: false },
  { id: '16', code: 'ART-000016', description: 'Dweilmop Microvezel', group: 'cleaning', subgroup: 'tools', packaging: '1 stuk', unit: 'st', brand: 'Vileda', eanCode: '4023103123456', intrastat: '96039091', blocked: false },
  { id: '17', code: 'ART-000017', description: 'Kopieerpapier A4 80g', group: 'office', subgroup: 'paper_office', packaging: '5 x 500 vel pakken', unit: 'st', brand: 'Navigator', eanCode: '5602024123456', intrastat: '48025690', blocked: false },
  { id: '18', code: 'ART-000018', description: 'Balpen Blauw', group: 'office', subgroup: 'writing', packaging: '50 stuks doos', unit: 'st', brand: 'Bic', eanCode: '3086123456789', intrastat: '96081010', blocked: false },
  { id: '19', code: 'ART-000019', description: 'Boter Ongezouten', group: 'food', subgroup: 'dairy', packaging: '10 x 250g pakken', unit: 'st', brand: 'Président', eanCode: '3228020123456', intrastat: '04051019', blocked: true },
  { id: '20', code: 'ART-000020', description: 'Fanta Orange', group: 'beverages', subgroup: 'softdrinks', packaging: '24 x 33cl blikjes', unit: 'st', brand: 'Fanta', eanCode: '5449000011527', intrastat: '22021010', blocked: false },
  { id: '21', code: 'ART-000021', description: 'Gehakt Rund-Varken', group: 'food', subgroup: 'meat', packaging: '5kg verpakking', unit: 'kg', brand: 'Bonfait', eanCode: '5400141555666', intrastat: '02012090', blocked: false },
  { id: '22', code: 'ART-000022', description: 'Rijst Langgraan', group: 'food', subgroup: 'canned', packaging: '4 x 5kg zakken', unit: 'kg', brand: 'Uncle Bens', eanCode: '5410673001234', intrastat: '10063096', blocked: false },
  { id: '23', code: 'ART-000023', description: 'Diepvries Groentenmix', group: 'food', subgroup: 'frozen', packaging: '4 x 2.5kg zakken', unit: 'kg', brand: 'Bonduelle', eanCode: '3083680123456', intrastat: '07102900', blocked: false },
  { id: '24', code: 'ART-000024', description: 'Wasmiddel Vloeibaar', group: 'cleaning', subgroup: 'detergent', packaging: '4 x 3L flessen', unit: 'st', brand: 'Persil', eanCode: '5410091777888', intrastat: '34022010', blocked: false },
  { id: '25', code: 'ART-000025', description: 'Yoghurt Natuur', group: 'food', subgroup: 'dairy', packaging: '12 x 500g potten', unit: 'st', brand: 'Danone', eanCode: '5410188999000', intrastat: '04031039', blocked: false },
]
