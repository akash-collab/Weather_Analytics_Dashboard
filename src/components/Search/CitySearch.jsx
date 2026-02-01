import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getWeatherByCity } from '../../features/weather/weatherSlice'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const CitySearch = ({ unit, onSearch }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
        )
        const data = await res.json()
        setSuggestions(data)
      } catch {
        setSuggestions([])
      }
    }

    fetchSuggestions()
  }, [query])

  const handleSelect = selectedCity => {
    const cityName = selectedCity.name

    dispatch(getWeatherByCity({ city: cityName, unit }))
    onSearch(cityName)

    setQuery('')
    setSuggestions([])
    setError('')
  }

  const handleSearch = async () => {
    if (!query.trim()) return

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`
      )
      const data = await res.json()

      if (!data.length) {
        setError('City does not exist')
        return
      }

      handleSelect(data[0])
    } catch {
      setError('Something went wrong')
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='relative w-full max-w-md'>
        <input
          value={query}
          onChange={e => {
            setQuery(e.target.value)
            setError('')
          }}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder='Search for a city...'
          className='
            w-full pl-12 pr-24 py-3 rounded-full border
            shadow-sm focus:ring-2 focus:ring-blue-500
            outline-none
          '
        />

        <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
          🔍
        </span>

        <button
          onClick={handleSearch}
          className='
            absolute right-1 top-1/2 -translate-y-1/2
            bg-blue-600 hover:bg-blue-700
            text-white px-5 py-2 rounded-full text-sm
          '
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className='absolute z-20 w-full bg-white mt-2 rounded-lg shadow overflow-hidden'>
            {suggestions.map(city => (
              <li
                key={`${city.lat}-${city.lon}`}
                onClick={() => handleSelect(city)}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm'
              >
                {city.name}
                {city.state ? `, ${city.state}` : ''}, {city.country}
              </li>
            ))}
          </ul>
        )}

        {error && (
          <p className='text-sm text-red-500 mt-2 text-center'>{error}</p>
        )}
      </div>
    </div>
  )
}

export default CitySearch
