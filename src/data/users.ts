export type AuthType = 'o365' | 'local'
export type SystemRole = 'central_admin' | 'local_admin' | 'user' | 'viewer'

export interface MenuRight {
  id: string
  key: string
  name: string
}

export interface UserRole {
  systemId: string
  systemName: string
  role: SystemRole
}

export interface User {
  id: string
  email: string
  name: string
  authType: AuthType
  o365Group?: string
  blocked: boolean
  roles: UserRole[]
  assignedPrisons: string[]
  menuRights: string[]
  createdAt: string
  lastLogin?: string
}

export const MENU_RIGHTS: MenuRight[] = [
  { id: 'menu-dashboard', key: 'dashboard', name: 'Dashboard' },
  { id: 'menu-suppliers', key: 'suppliers', name: 'Leveranciers' },
  { id: 'menu-articles', key: 'articles', name: 'Artikelen' },
  { id: 'menu-procurement', key: 'procurement', name: 'Inkoopbeheer' },
  { id: 'menu-stock', key: 'stock', name: 'Voorraad' },
  { id: 'menu-admin', key: 'admin', name: 'Beheer' },
]

export const O365_GROUPS = [
  { id: 'grp-central-admins', name: 'Prison-Central-Admins' },
  { id: 'grp-local-admins', name: 'Prison-Local-Admins' },
  { id: 'grp-procurement', name: 'Prison-Procurement-Users' },
  { id: 'grp-stock', name: 'Prison-Stock-Users' },
  { id: 'grp-viewers', name: 'Prison-Viewers' },
]

export const SYSTEMS = [
  { id: 'central', name: 'Centraal Systeem' },
  { id: 'local', name: 'Lokaal Systeem' },
]

export const DUMMY_USERS: User[] = [
  {
    id: 'user-001',
    email: 'jan.peeters@justitie.belgium.be',
    name: 'Jan Peeters',
    authType: 'o365',
    o365Group: 'Prison-Central-Admins',
    blocked: false,
    roles: [
      { systemId: 'central', systemName: 'Centraal Systeem', role: 'central_admin' },
      { systemId: 'local', systemName: 'Lokaal Systeem', role: 'central_admin' },
    ],
    assignedPrisons: ['antwerpen', 'brugge', 'gent', 'leuven'],
    menuRights: ['dashboard', 'suppliers', 'articles', 'procurement', 'stock', 'admin'],
    createdAt: '2024-01-15',
    lastLogin: '2024-12-23',
  },
  {
    id: 'user-002',
    email: 'marie.janssens@justitie.belgium.be',
    name: 'Marie Janssens',
    authType: 'o365',
    o365Group: 'Prison-Local-Admins',
    blocked: false,
    roles: [
      { systemId: 'local', systemName: 'Lokaal Systeem', role: 'local_admin' },
    ],
    assignedPrisons: ['antwerpen'],
    menuRights: ['dashboard', 'suppliers', 'articles', 'procurement', 'stock'],
    createdAt: '2024-02-20',
    lastLogin: '2024-12-22',
  },
  {
    id: 'user-003',
    email: 'pieter.devos@justitie.belgium.be',
    name: 'Pieter De Vos',
    authType: 'o365',
    o365Group: 'Prison-Procurement-Users',
    blocked: false,
    roles: [
      { systemId: 'local', systemName: 'Lokaal Systeem', role: 'user' },
    ],
    assignedPrisons: ['brugge', 'gent'],
    menuRights: ['dashboard', 'suppliers', 'articles', 'procurement'],
    createdAt: '2024-03-10',
    lastLogin: '2024-12-20',
  },
  {
    id: 'user-004',
    email: 'anna.claes@justitie.belgium.be',
    name: 'Anna Claes',
    authType: 'local',
    blocked: false,
    roles: [
      { systemId: 'local', systemName: 'Lokaal Systeem', role: 'user' },
    ],
    assignedPrisons: ['leuven'],
    menuRights: ['dashboard', 'stock'],
    createdAt: '2024-04-05',
    lastLogin: '2024-12-18',
  },
  {
    id: 'user-005',
    email: 'tom.willems@justitie.belgium.be',
    name: 'Tom Willems',
    authType: 'o365',
    o365Group: 'Prison-Viewers',
    blocked: true,
    roles: [
      { systemId: 'local', systemName: 'Lokaal Systeem', role: 'viewer' },
    ],
    assignedPrisons: ['antwerpen', 'brugge'],
    menuRights: ['dashboard'],
    createdAt: '2024-05-12',
    lastLogin: '2024-10-15',
  },
  {
    id: 'user-006',
    email: 'sofie.martens@justitie.belgium.be',
    name: 'Sofie Martens',
    authType: 'o365',
    o365Group: 'Prison-Stock-Users',
    blocked: false,
    roles: [
      { systemId: 'local', systemName: 'Lokaal Systeem', role: 'user' },
    ],
    assignedPrisons: ['gent', 'oudenaarde'],
    menuRights: ['dashboard', 'stock', 'articles'],
    createdAt: '2024-06-18',
    lastLogin: '2024-12-21',
  },
]
