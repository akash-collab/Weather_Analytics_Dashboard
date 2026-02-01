import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CityCard from './CityCard'
import CitySearch from '../Search/CitySearch'
import { getWeatherByCity } from '../../features/weather/weatherSlice'

const DEFAULT_CITIES = ['Delhi', 'London', 'New York', 'Tokyo']
const CACHE_DURATION = 60 * 1000

const Dashboard = () => {
  const dispatch = useDispatch()
  const unit = useSelector(state => state.settings.unit)
  const favorites = useSelector(state => state.favorites.cities)
  const weatherData = useSelector(state => state.weather.data)

  const [searchedCities, setSearchedCities] = useState([])

  const citiesToShow = useMemo(() => {
    if (searchedCities.length > 0) return searchedCities
    if (favorites.length > 0) return favorites
    return DEFAULT_CITIES
  }, [searchedCities, favorites])

  useEffect(() => {
    citiesToShow.forEach(city => {
      const cacheKey = `${city}_${unit}`
      if (!weatherData[cacheKey]) {
        dispatch(getWeatherByCity({ city, unit }))
      }
    })
  }, [citiesToShow, unit, weatherData, dispatch])

  useEffect(() => {
    const interval = setInterval(() => {
      citiesToShow.forEach(city => {
        const cacheKey = `${city}_${unit}`
        const cached = weatherData[cacheKey]
        if (!cached) return

        const isStale =
          Date.now() - cached.lastFetched >= CACHE_DURATION

        if (isStale) {
          dispatch(getWeatherByCity({ city, unit }))
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [citiesToShow, unit, weatherData, dispatch])

  const handleSearchResult = city => {
    setSearchedCities(prev =>
      prev.includes(city) ? prev : [city, ...prev]
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-10">
      <CitySearch unit={unit} onSearch={handleSearchResult} />

      <h2 className="text-lg font-semibold text-gray-700">
        {searchedCities.length > 0
          ? 'Search Results'
          : favorites.length > 0
          ? 'Your Favorites'
          : 'Popular Cities'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {citiesToShow.map(city => {
          const cacheKey = `${city}_${unit}`

          return (
            <CityCard
              key={cacheKey}
              city={city}
              weather={weatherData[cacheKey]}
              unit={unit}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard