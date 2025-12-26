import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import { ArticleStock } from '../../data/stock'
import styles from './StockChart.module.css'

interface StockChartProps {
  article: ArticleStock
  dateRange: { from: string; to: string }
}

interface ChartDataPoint {
  date: string
  dateLabel: string
  stock: number | null
  forecast: number | null
}

export function StockChart({ article, dateRange }: StockChartProps) {
  const { t } = useTranslation()

  const chartData = useMemo(() => {
    // Filter movements within date range
    const filteredMovements = article.movements.filter(
      (m) => m.date >= dateRange.from && m.date <= dateRange.to
    )

    // Create data points for actual stock
    const actualData: ChartDataPoint[] = filteredMovements.map((m) => ({
      date: m.date,
      dateLabel: new Date(m.date).toLocaleDateString('nl-BE', {
        day: '2-digit',
        month: '2-digit',
      }),
      stock: m.runningStock,
      forecast: null,
    }))

    // Calculate average daily consumption for forecast
    const outMovements = filteredMovements.filter((m) => m.type === 'out')
    const totalDays = Math.max(1, filteredMovements.length)
    const totalConsumption = outMovements.reduce((sum, m) => sum + m.quantity, 0)
    const avgDailyConsumption = totalConsumption / totalDays

    // Generate forecast data (next 14 days)
    if (actualData.length > 0 && avgDailyConsumption > 0) {
      const lastActual = actualData[actualData.length - 1]
      const lastDate = new Date(lastActual.date)
      let forecastStock = lastActual.stock!

      // Add connection point (last actual point also has forecast value)
      actualData[actualData.length - 1].forecast = forecastStock

      // Generate forecast points
      for (let i = 1; i <= 14; i++) {
        const forecastDate = new Date(lastDate)
        forecastDate.setDate(forecastDate.getDate() + i)

        forecastStock = Math.max(0, forecastStock - avgDailyConsumption)

        actualData.push({
          date: forecastDate.toISOString().split('T')[0],
          dateLabel: forecastDate.toLocaleDateString('nl-BE', {
            day: '2-digit',
            month: '2-digit',
          }),
          stock: null,
          forecast: Math.round(forecastStock),
        })

        // Stop if stock reaches zero
        if (forecastStock <= 0) break
      }
    }

    return actualData
  }, [article, dateRange])

  // Calculate when stock will be depleted
  const depletionInfo = useMemo(() => {
    const forecastPoints = chartData.filter((d) => d.forecast !== null && d.stock === null)
    const depletionPoint = forecastPoints.find((d) => d.forecast! <= 0)
    const belowMinPoint = forecastPoints.find((d) => d.forecast! < article.minStock)

    return {
      depletionDate: depletionPoint?.dateLabel,
      belowMinDate: belowMinPoint?.dateLabel,
      daysUntilDepletion: forecastPoints.findIndex((d) => d.forecast! <= 0) + 1,
      daysUntilBelowMin: forecastPoints.findIndex((d) => d.forecast! < article.minStock) + 1,
    }
  }, [chartData, article.minStock])

  const formatTooltip = (value: number | undefined, name: string | undefined) => {
    const label = name === 'stock'
      ? t('stockChart.actualStock')
      : t('stockChart.forecast')
    return [value !== null && value !== undefined ? `${value} ${article.unit}` : '-', label]
  }

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>{t('stockChart.title')}</h3>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendLine} style={{ backgroundColor: '#3b82f6' }} />
          <span>{t('stockChart.actualStock')}</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendLine} ${styles.dashed}`} style={{ backgroundColor: '#f59e0b' }} />
          <span>{t('stockChart.forecast')}</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendLine} style={{ backgroundColor: '#ef4444' }} />
          <span>{t('stockChart.minStock')}</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis
            dataKey="dateLabel"
            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
            tickLine={{ stroke: 'var(--border-color)' }}
          />
          <YAxis
            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
            tickLine={{ stroke: 'var(--border-color)' }}
            domain={[0, 'auto']}
          />
          <Tooltip
            formatter={formatTooltip}
            contentStyle={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'var(--text-primary)' }}
          />

          {/* Minimum stock reference line */}
          <ReferenceLine
            y={article.minStock}
            stroke="#ef4444"
            strokeWidth={2}
            label={{
              value: `${t('stockChart.minStock')}: ${article.minStock}`,
              fill: '#ef4444',
              fontSize: 12,
              position: 'right',
            }}
          />

          {/* Actual stock line */}
          <Line
            type="monotone"
            dataKey="stock"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#3b82f6' }}
            connectNulls={false}
            name="stock"
          />

          {/* Forecast line (dashed) */}
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="8 4"
            dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, fill: '#f59e0b' }}
            connectNulls={false}
            name="forecast"
          />
        </LineChart>
      </ResponsiveContainer>

      {depletionInfo.belowMinDate && (
        <div className={styles.forecastWarning}>
          <p>
            {depletionInfo.daysUntilBelowMin > 0 && (
              <>
                {t('stockChart.belowMinWarning', {
                  date: depletionInfo.belowMinDate,
                  days: depletionInfo.daysUntilBelowMin
                })}
              </>
            )}
            {depletionInfo.depletionDate && (
              <>
                {' '}
                {t('stockChart.depletionWarning', {
                  date: depletionInfo.depletionDate,
                  days: depletionInfo.daysUntilDepletion
                })}
              </>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
