import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getWeatherByCity } from '../features/weather/weatherSlice'

import TemperatureChart from '../components/Charts/TemperatureChart'
import WindChart from '../components/Charts/WindChart'
import PrecipitationChart from '../components/Charts/PrecipitationChart'

const CityDetails = () => {
  const { city } = useParams()
  const dispatch = useDispatch()

  const unit = useSelector(state => state.settings.unit)
  const cacheKey = `${city}_${unit}`

  const weather = useSelector(
    state => state.weather.data[cacheKey]
  )

  useEffect(() => {
    if (!weather) {
      dispatch(getWeatherByCity({ city, unit }))
    }
  }, [city, unit, weather, dispatch])

  if (!weather) {
    return <p className="p-4">Loading details…</p>
  }

  const { current, forecast } = weather

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold">{city}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat
          label="Feels Like"
          value={`${Math.round(current.main.feels_like)}° ${
            unit === 'metric' ? 'C' : 'F'
          }`}
        />
        <Stat label="Pressure" value={`${current.main.pressure} hPa`} />
        <Stat label="Humidity" value={`${current.main.humidity}%`} />
        <Stat label="Visibility" value={`${current.visibility / 1000} km`} />
      </div>

      <TemperatureChart forecast={forecast.list} unit={unit} />
      <WindChart forecast={forecast.list} />
      <PrecipitationChart forecast={forecast.list} />
    </div>
  )
}

const Stat = ({ label, value }) => (
  <div className="bg-white p-4 rounded shadow text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
)

export default CityDetails