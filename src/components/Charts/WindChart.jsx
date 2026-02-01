import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useIsMobile } from '../../hooks/useIsMobile'

const WindChart = ({ forecast }) => {
  const isMobile = useIsMobile()

  const data = forecast
    .slice(0, isMobile ? 6 : 12)
    .map(item => ({
      time: item.dt_txt.split(' ')[1].slice(0, 5),
      speed: item.wind.speed
    }))

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Wind Speed</h3>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <XAxis
            dataKey="time"
            angle={isMobile ? -45 : 0}
            textAnchor={isMobile ? 'end' : 'middle'}
            height={isMobile ? 50 : 30}
            interval={isMobile ? 1 : 0}
          />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="speed"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WindChart