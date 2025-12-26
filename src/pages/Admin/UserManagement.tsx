import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Plus,
  Search,
  UserCheck,
  UserX,
  Shield,
  Menu,
  Pencil,
  X,
  Check,
  Users
} from 'lucide-react'
import { DUMMY_USERS, User, O365_GROUPS, SYSTEMS, MENU_RIGHTS, SystemRole, CENTRAL_ROLES, LOCAL_ROLES } from '../../data/users'
import { BELGIAN_PRISONS } from '../../context/PrisonContext'
import styles from './UserManagement.module.css'

type TabType = 'users' | 'roles' | 'o365'

export function UserManagement() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('users')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const tabs = [
    { id: 'users' as TabType, label: t('admin.users.tabs.users'), icon: Users },
    { id: 'roles' as TabType, label: t('admin.users.tabs.roles'), icon: Shield },
    { id: 'o365' as TabType, label: t('admin.users.tabs.o365'), icon: UserCheck },
  ]

  const filteredUsers = DUMMY_USERS.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRoleBadgeClass = (role: SystemRole) => {
    switch (role) {
      case 'central_admin': return styles.roleCentralAdmin
      case 'central_user': return styles.roleCentralUser
      case 'local_admin': return styles.roleLocalAdmin
      case 'local_user': return styles.roleLocalUser
      case 'readonly': return styles.roleReadonly
      default: return ''
    }
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const handleAddUser = () => {
    setSelectedUser(null)
    setShowUserModal(true)
  }

  const renderUsersTab = () => (
    <div className={styles.usersSection}>
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} />
          <input
            type="text"
            placeholder={t('admin.users.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className={styles.addButton} onClick={handleAddUser}>
          <Plus size={20} />
          {t('admin.users.addUser')}
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t('admin.users.columns.name')}</th>
              <th>{t('admin.users.columns.email')}</th>
              <th>{t('admin.users.columns.authType')}</th>
              <th>{t('admin.users.columns.roles')}</th>
              <th>{t('admin.users.columns.prisons')}</th>
              <th>{t('admin.users.columns.status')}</th>
              <th>{t('admin.users.columns.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className={user.blocked ? styles.blockedRow : ''}>
                <td className={styles.nameCell}>
                  <div className={styles.userAvatar}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span>{user.name}</span>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`${styles.authBadge} ${user.authType === 'o365' ? styles.authO365 : styles.authLocal}`}>
                    {user.authType === 'o365' ? 'O365' : t('admin.users.authLocal')}
                  </span>
                </td>
                <td>
                  <div className={styles.rolesList}>
                    {user.roles.map((role, idx) => (
                      <span key={idx} className={`${styles.roleBadge} ${getRoleBadgeClass(role.role)}`}>
                        {t(`admin.users.roleNames.${role.role}`)}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className={styles.prisonCount}>
                    {user.assignedPrisons.length} {t('admin.users.prisonsAssigned')}
                  </span>
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${user.blocked ? styles.blocked : styles.active}`}>
                    {user.blocked ? t('admin.users.statusBlocked') : t('admin.users.statusActive')}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.iconButton}
                      onClick={() => handleEditUser(user)}
                      title={t('common.edit')}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className={`${styles.iconButton} ${user.blocked ? styles.unblock : styles.block}`}
                      title={user.blocked ? t('admin.users.unblock') : t('admin.users.block')}
                    >
                      {user.blocked ? <UserCheck size={16} /> : <UserX size={16} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderRolesTab = () => (
    <div className={styles.rolesSection}>
      <div className={styles.rolesGrid}>
        {/* Centraal Systeem */}
        <div className={styles.systemCard}>
          <div className={styles.systemHeader}>
            <Shield size={24} />
            <h3>{t('admin.users.systems.central')}</h3>
          </div>
          <div className={styles.rolesList}>
            <div className={styles.roleItem}>
              <div className={`${styles.roleIcon} ${styles.roleCentralUser}`}>
                <Users size={16} />
              </div>
              <div className={styles.roleInfo}>
                <span className={styles.roleName}>{t('admin.users.roleNames.central_user')}</span>
                <span className={styles.roleDesc}>{t('admin.users.roleDesc.central_user')}</span>
              </div>
            </div>
            <div className={styles.roleItem}>
              <div className={`${styles.roleIcon} ${styles.roleCentralAdmin}`}>
                <Shield size={16} />
              </div>
              <div className={styles.roleInfo}>
                <span className={styles.roleName}>{t('admin.users.roleNames.central_admin')}</span>
                <span className={styles.roleDesc}>{t('admin.users.roleDesc.central_admin')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lokaal Systeem */}
        <div className={styles.systemCard}>
          <div className={styles.systemHeader}>
            <Shield size={24} />
            <h3>{t('admin.users.systems.local')}</h3>
          </div>
          <div className={styles.rolesList}>
            <div className={styles.roleItem}>
              <div className={`${styles.roleIcon} ${styles.roleLocalUser}`}>
                <Users size={16} />
              </div>
              <div className={styles.roleInfo}>
                <span className={styles.roleName}>{t('admin.users.roleNames.local_user')}</span>
                <span className={styles.roleDesc}>{t('admin.users.roleDesc.local_user')}</span>
              </div>
            </div>
            <div className={styles.roleItem}>
              <div className={`${styles.roleIcon} ${styles.roleLocalAdmin}`}>
                <Shield size={16} />
              </div>
              <div className={styles.roleInfo}>
                <span className={styles.roleName}>{t('admin.users.roleNames.local_admin')}</span>
                <span className={styles.roleDesc}>{t('admin.users.roleDesc.local_admin')}</span>
              </div>
            </div>
            <div className={styles.roleItem}>
              <div className={`${styles.roleIcon} ${styles.roleReadonly}`}>
                <Users size={16} />
              </div>
              <div className={styles.roleInfo}>
                <span className={styles.roleName}>{t('admin.users.roleNames.readonly')}</span>
                <span className={styles.roleDesc}>{t('admin.users.roleDesc.readonly')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.menuRightsSection}>
        <h3>{t('admin.users.menuRights')}</h3>
        <div className={styles.menuRightsGrid}>
          {MENU_RIGHTS.map(menu => (
            <div key={menu.id} className={styles.menuRightCard}>
              <Menu size={20} />
              <span>{menu.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderO365Tab = () => (
    <div className={styles.o365Section}>
      <div className={styles.o365Info}>
        <UserCheck size={48} />
        <h3>{t('admin.users.o365Integration')}</h3>
        <p>{t('admin.users.o365Description')}</p>
      </div>

      <div className={styles.o365Groups}>
        <h3>{t('admin.users.adGroups')}</h3>
        <div className={styles.groupsGrid}>
          {O365_GROUPS.map(group => {
            const usersInGroup = DUMMY_USERS.filter(u => u.o365Group === group.name)
            return (
              <div key={group.id} className={styles.groupCard}>
                <div className={styles.groupHeader}>
                  <Shield size={20} />
                  <span className={styles.groupName}>{group.name}</span>
                </div>
                <div className={styles.groupStats}>
                  <span>{usersInGroup.length} {t('admin.users.members')}</span>
                </div>
                <div className={styles.groupMembers}>
                  {usersInGroup.slice(0, 3).map(user => (
                    <div key={user.id} className={styles.memberAvatar} title={user.name}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  ))}
                  {usersInGroup.length > 3 && (
                    <div className={styles.memberMore}>+{usersInGroup.length - 3}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderUserModal = () => {
    if (!showUserModal) return null

    return (
      <div className={styles.modalOverlay} onClick={() => setShowUserModal(false)}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2>{selectedUser ? t('admin.users.editUser') : t('admin.users.addUser')}</h2>
            <button className={styles.closeButton} onClick={() => setShowUserModal(false)}>
              <X size={20} />
            </button>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.formSection}>
              <h3>{t('admin.users.generalInfo')}</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>{t('admin.users.columns.name')}</label>
                  <input type="text" defaultValue={selectedUser?.name || ''} />
                </div>
                <div className={styles.formGroup}>
                  <label>{t('admin.users.columns.email')}</label>
                  <input type="email" defaultValue={selectedUser?.email || ''} />
                </div>
                <div className={styles.formGroup}>
                  <label>{t('admin.users.columns.authType')}</label>
                  <select defaultValue={selectedUser?.authType || 'o365'}>
                    <option value="o365">Office 365</option>
                    <option value="local">{t('admin.users.authLocal')}</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>{t('admin.users.o365Group')}</label>
                  <select defaultValue={selectedUser?.o365Group || ''}>
                    <option value="">{t('admin.users.selectGroup')}</option>
                    {O365_GROUPS.map(group => (
                      <option key={group.id} value={group.name}>{group.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3>{t('admin.users.roleAssignment')}</h3>
              <div className={styles.rolesAssignment}>
                <div className={styles.systemRoleRow}>
                  <span className={styles.systemLabel}>{t('admin.users.systems.central')}</span>
                  <select defaultValue={selectedUser?.roles.find(r => r.systemId === 'central')?.role || ''}>
                    <option value="">{t('admin.users.noRole')}</option>
                    {CENTRAL_ROLES.map(role => (
                      <option key={role} value={role}>{t(`admin.users.roleNames.${role}`)}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.systemRoleRow}>
                  <span className={styles.systemLabel}>{t('admin.users.systems.local')}</span>
                  <select defaultValue={selectedUser?.roles.find(r => r.systemId === 'local')?.role || ''}>
                    <option value="">{t('admin.users.noRole')}</option>
                    {LOCAL_ROLES.map(role => (
                      <option key={role} value={role}>{t(`admin.users.roleNames.${role}`)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3>{t('admin.users.prisonAssignment')}</h3>
              <div className={styles.prisonsGrid}>
                {BELGIAN_PRISONS.map(prison => (
                  <label key={prison.id} className={styles.prisonCheckbox}>
                    <input
                      type="checkbox"
                      defaultChecked={selectedUser?.assignedPrisons.includes(prison.id)}
                    />
                    <span>{t(prison.nameKey)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formSection}>
              <h3>{t('admin.users.menuRights')}</h3>
              <div className={styles.menuRightsCheckboxes}>
                {MENU_RIGHTS.map(menu => (
                  <label key={menu.id} className={styles.menuCheckbox}>
                    <input
                      type="checkbox"
                      defaultChecked={selectedUser?.menuRights.includes(menu.key)}
                    />
                    <span>{menu.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button className={styles.cancelButton} onClick={() => setShowUserModal(false)}>
              {t('common.cancel')}
            </button>
            <button className={styles.saveButton} onClick={() => setShowUserModal(false)}>
              <Check size={18} />
              {t('common.save')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/admin')}>
          <ArrowLeft size={20} />
          {t('common.back')}
        </button>
        <div className={styles.headerContent}>
          <h1>{t('admin.users.title')}</h1>
          <p>{t('admin.users.description')}</p>
        </div>
      </div>

      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 'users' && renderUsersTab()}
        {activeTab === 'roles' && renderRolesTab()}
        {activeTab === 'o365' && renderO365Tab()}
      </div>

      {renderUserModal()}
    </div>
  )
}
