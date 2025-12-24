import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import styles from './Layout.module.css'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      {sidebarOpen && <div className={styles.overlay} onClick={closeSidebar} />}
      <div className={styles.main}>
        <Header onMenuClick={toggleSidebar} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
