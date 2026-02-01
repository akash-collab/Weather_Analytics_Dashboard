import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useIsMobile } from '../../hooks/useIsMobile'

const PrecipitationChart = ({ forecast }) => {
  const isMobile = useIsMobile()

  const data = forecast
    .slice(0, isMobile ? 6 : 12)
    .map(item => ({
      time: item.dt_txt.split(' ')[1].slice(0, 5),
      rain: item.rain?.['3h'] || 0
    }))

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Precipitation (mm)</h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          barCategoryGap={isMobile ? 12 : 20}
        >
          <XAxis
            dataKey="time"
            angle={isMobile ? -45 : 0}
            textAnchor={isMobile ? 'end' : 'middle'}
            height={isMobile ? 50 : 30}
            interval={isMobile ? 1 : 0}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="rain" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PrecipitationChart