import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  addFavorite,
  removeFavorite
} from '../../features/favorites/favoritesSlice'

const CityCard = ({ city, weather, unit }) => {
  const [secondsAgo, setSecondsAgo] = useState(0)
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.favorites.cities)
  const isFavorite = favorites.includes(city)

  useEffect(() => {
    if (!weather?.lastFetched) return

    const update = () => {
      setSecondsAgo(
        Math.floor((Date.now() - weather.lastFetched) / 1000)
      )
    }

    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [weather?.lastFetched])

  if (!weather) {
    return (
      <div className='h-40 rounded-2xl bg-white/60 backdrop-blur shadow animate-pulse flex items-center justify-center'>
        Loading {city}…
      </div>
    )
  }

  const { current } = weather
  const icon = current.weather[0].icon

  return (
    <Link
      to={`/city/${city}`}
      className='
        relative block
        rounded-2xl
        bg-linear-to-br from-white/80 to-white/40
        backdrop-blur
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        p-5
      '
    >
      <div className='flex items-start justify-between'>
        <h2 className='text-lg font-semibold text-gray-800'>{city}</h2>

        <div className='flex gap-2'>
          <button
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              isFavorite
                ? dispatch(removeFavorite(city))
                : dispatch(addFavorite(city))
            }}
            className='text-xl hover:scale-110 transition'
          >
            {isFavorite ? '★' : '☆'}
          </button>

          {isFavorite && (
            <button
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                dispatch(removeFavorite(city))
              }}
              className='text-gray-400 hover:text-red-500 transition'
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className='flex items-center justify-between mt-4'>
        <div>
          <p className='text-4xl font-bold text-gray-900'>
            {Math.round(current.main.temp)}°
            <span className='text-base font-medium text-gray-500 ml-1'>
              {unit === 'metric' ? 'C' : 'F'}
            </span>
          </p>
          <p className='text-sm text-gray-500 capitalize'>
            {current.weather[0].description}
          </p>
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt='weather'
          className='w-16 h-16'
        />
      </div>

      <div className='flex justify-between text-xs text-gray-600 mt-4'>
        <span>💧 {current.main.humidity}%</span>
        <span>
          🌬 {current.wind.speed}
          {unit === 'metric' ? ' m/s' : ' mph'}
        </span>
        <span className='text-gray-500'>
          Updated {secondsAgo < 5 ? 'just now' : `${secondsAgo}s ago`}
        </span>
      </div>
    </Link>
  )
}

export default CityCard