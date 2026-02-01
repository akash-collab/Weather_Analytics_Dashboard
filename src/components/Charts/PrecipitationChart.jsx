import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import DateRangeSelector from './DateRangeSelector'
import { formatXAxis } from '../../utils/helpers'
import { useIsMobile } from '../../hooks/useIsMobile'

const PrecipitationChart = ({ forecast }) => {
  const [range, setRange] = useState(8)
  const isMobile = useIsMobile()

  const data = forecast.slice(0, range).map(item => ({
    time: item.dt_txt,
    rain: item.rain?.['3h'] || 0
  }))

  return (
    <div className='bg-white p-4 rounded shadow'>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='font-semibold'>Precipitation Trend (mm)</h3>
        <DateRangeSelector selected={range} onChange={setRange} />
      </div>

      <ResponsiveContainer width='100%' height={280}>
        <BarChart data={data}>
          <XAxis
            dataKey='time'
            tickFormatter={value => formatXAxis(value, range)}
            interval={range === 8 ? 0 : 3}
          />
          <YAxis />
          <Tooltip labelFormatter={value => new Date(value).toLocaleString()} />
          <Bar dataKey='rain' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PrecipitationChart
