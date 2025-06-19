import {
  BarChart as TremorBarChart,
  LineChart as TremorLineChart,
} from '@tremor/react'
import { cn } from '@/lib/utils'

export function BarChart({
                           className,
                           data,
                           index,
                           categories,
                           colors = ['green'],
                         }) {
  return (
      <TremorBarChart
          data={data}
          index={index}
          categories={categories}
          colors={colors}
          showLegend
          yAxisWidth={48}
          className={cn('mt-6', className)}
      />
  )
}

export function LineChart({
                            className,
                            data,
                            index,
                            categories,
                            colors = ['blue', 'green'],
                          }) {
  return (
      <TremorLineChart
          data={data}
          index={index}
          categories={categories}
          colors={colors}
          showLegend
          curveType="monotone"
          yAxisWidth={48}
          className={cn('mt-6', className)}
      />
  )
}
