import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import DateRangeSelector from './DateRangeSelector'
import { formatXAxis } from '../../utils/helpers'

const WindChart = ({ forecast }) => {
  const [range, setRange] = useState(8)

  const data = forecast.slice(0, range).map(item => ({
    time: item.dt_txt,
    speed: item.wind.speed
  }))

  return (
    <div className='bg-white p-4 rounded shadow'>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='font-semibold'>Wind Speed Trend</h3>
        <DateRangeSelector selected={range} onChange={setRange} />
      </div>

      <ResponsiveContainer width='100%' height={280}>
        <LineChart data={data}>
          <XAxis
            dataKey='time'
            tickFormatter={value => formatXAxis(value, range)}
            interval={range === 8 ? 0 : 3}
          />
          <YAxis />
          <Tooltip
            labelFormatter={value => new Date(value).toLocaleString()}
          />
          <Line
            type='monotone'
            dataKey='speed'
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WindChart