export interface Supplier {
  id: string
  code: string
  name: string
  telephone: string
  email: string
  language: 'NL' | 'FR' | 'DE' | 'EN'
  published: boolean
}

export const DUMMY_SUPPLIERS: Supplier[] = [
  { id: '1', code: 'SUP001', name: 'Colruyt Group NV', telephone: '+32 2 363 55 45', email: 'info@colruytgroup.com', language: 'NL', published: true },
  { id: '2', code: 'SUP002', name: 'Delhaize Belgium', telephone: '+32 2 412 21 11', email: 'contact@delhaize.be', language: 'NL', published: true },
  { id: '3', code: 'SUP003', name: 'Metro Cash & Carry', telephone: '+32 2 412 81 11', email: 'info@metro.be', language: 'NL', published: true },
  { id: '4', code: 'SUP004', name: 'Makro Belgium', telephone: '+32 3 247 21 11', email: 'service@makro.be', language: 'NL', published: true },
  { id: '5', code: 'SUP005', name: 'Sligro Food Group', telephone: '+32 14 25 87 00', email: 'belgium@sligro.com', language: 'NL', published: false },
  { id: '6', code: 'SUP006', name: 'Carrefour Belgium', telephone: '+32 2 729 21 11', email: 'info@carrefour.be', language: 'FR', published: true },
  { id: '7', code: 'SUP007', name: 'Aldi Belgium', telephone: '+32 11 88 63 00', email: 'contact@aldi.be', language: 'NL', published: true },
  { id: '8', code: 'SUP008', name: 'Lidl Belgium', telephone: '+32 9 359 51 11', email: 'info@lidl.be', language: 'NL', published: true },
  { id: '9', code: 'SUP009', name: 'Java Foodservice', telephone: '+32 2 481 68 00', email: 'order@java.be', language: 'NL', published: true },
  { id: '10', code: 'SUP010', name: 'Bidfood Belgium', telephone: '+32 15 28 85 11', email: 'info@bidfood.be', language: 'NL', published: true },
  { id: '11', code: 'SUP011', name: 'Sysco Belgium', telephone: '+32 3 820 92 00', email: 'sales@sysco.be', language: 'EN', published: false },
  { id: '12', code: 'SUP012', name: 'Pomona Benelux', telephone: '+32 2 468 12 00', email: 'contact@pomona.be', language: 'FR', published: true },
  { id: '13', code: 'SUP013', name: 'Brake Belgium', telephone: '+32 2 334 56 00', email: 'service@brake.be', language: 'NL', published: true },
  { id: '14', code: 'SUP014', name: 'Lambrechts NV', telephone: '+32 3 449 22 11', email: 'info@lambrechts.be', language: 'NL', published: true },
  { id: '15', code: 'SUP015', name: 'Solucious', telephone: '+32 2 363 52 00', email: 'order@solucious.be', language: 'NL', published: true },
  { id: '16', code: 'SUP016', name: 'Davigel Belgium', telephone: '+32 56 77 42 00', email: 'info@davigel.be', language: 'FR', published: false },
  { id: '17', code: 'SUP017', name: 'Transgourmet Belgium', telephone: '+32 10 47 84 00', email: 'contact@transgourmet.be', language: 'FR', published: true },
  { id: '18', code: 'SUP018', name: 'Van Zon Fresh Food', telephone: '+32 14 72 08 00', email: 'sales@vanzon.be', language: 'NL', published: true },
  { id: '19', code: 'SUP019', name: 'Delifrance Belgium', telephone: '+32 2 478 91 00', email: 'order@delifrance.be', language: 'FR', published: true },
  { id: '20', code: 'SUP020', name: 'Hanos Belgium', telephone: '+32 11 26 93 00', email: 'info@hanos.be', language: 'NL', published: true },
]
