import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CityDetails from './pages/CityDetails'
import UnitToggle from './components/Common/UnitToggle'

function App () {
  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='p-4 bg-white shadow flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Weather Analytics Dashboard</h1>
        <UnitToggle />
      </header>

      <main className='p-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/city/:city' element={<CityDetails />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
