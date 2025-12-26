import { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, X } from 'lucide-react'
import styles from './DataTable.module.css'

export interface Column<T> {
  key: keyof T
  header: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
  filterOptions?: { value: string; label: string }[]
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
}

type SortDirection = 'asc' | 'desc' | null

export function DataTable<T extends object>({
  data,
  columns,
  keyField,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [searchQuery, setSearchQuery] = useState('')

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortDirection(null)
        setSortKey(null)
      } else {
        setSortDirection('asc')
      }
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({})
    setSearchQuery('')
  }

  const hasActiveFilters = Object.values(filters).some((v) => v !== '') || searchQuery !== ''

  const filteredAndSortedData = useMemo(() => {
    let result = [...data]

    // Apply search query across all string fields
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((row) =>
        Object.values(row).some(
          (value) =>
            typeof value === 'string' && value.toLowerCase().includes(query)
        )
      )
    }

    // Apply column filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((row) => {
          const cellValue = row[key as keyof T]
          if (typeof cellValue === 'boolean') {
            return value === 'true' ? cellValue : !cellValue
          }
          return String(cellValue).toLowerCase() === value.toLowerCase()
        })
      }
    })

    // Apply sorting
    if (sortKey && sortDirection) {
      result.sort((a, b) => {
        const aValue = a[sortKey]
        const bValue = b[sortKey]

        if (aValue === bValue) return 0

        let comparison = 0
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue)
        } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
          comparison = aValue === bValue ? 0 : aValue ? -1 : 1
        } else {
          comparison = aValue < bValue ? -1 : 1
        }

        return sortDirection === 'desc' ? -comparison : comparison
      })
    }

    return result
  }, [data, searchQuery, filters, sortKey, sortDirection])

  const getSortIcon = (key: keyof T) => {
    if (sortKey !== key) {
      return <ChevronsUpDown size={14} className={styles.sortIconInactive} />
    }
    if (sortDirection === 'asc') {
      return <ChevronUp size={14} className={styles.sortIconActive} />
    }
    if (sortDirection === 'desc') {
      return <ChevronDown size={14} className={styles.sortIconActive} />
    }
    return <ChevronsUpDown size={14} className={styles.sortIconInactive} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filters}>
          {columns
            .filter((col) => col.filterable && col.filterOptions)
            .map((col) => (
              <select
                key={String(col.key)}
                value={filters[String(col.key)] || ''}
                onChange={(e) => handleFilterChange(String(col.key), e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">{col.header}</option>
                {col.filterOptions?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ))}
          {hasActiveFilters && (
            <button onClick={clearFilters} className={styles.clearButton}>
              <X size={14} />
              Clear
            </button>
          )}
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`${col.sortable ? styles.sortable : ''} ${col.className || ''}`}
                >
                  <div className={styles.headerCell}>
                    <span>{col.header}</span>
                    {col.sortable && getSortIcon(col.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.emptyState}>
                  No results found
                </td>
              </tr>
            ) : (
              filteredAndSortedData.map((row) => (
                <tr key={String(row[keyField])}>
                  {columns.map((col) => (
                    <td key={String(col.key)} className={col.className}>
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <span>
          Showing {filteredAndSortedData.length} of {data.length} results
        </span>
      </div>
    </div>
  )
}
