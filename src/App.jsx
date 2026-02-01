import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CityDetails from './pages/CityDetails'
import UnitToggle from './components/Common/UnitToggle'
import Header from './components/Header'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebase'
import { setUser, clearUser } from './features/auth/authSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
          })
        )
      } else {
        dispatch(clearUser())
      }
    })

    return unsubscribe
  }, [dispatch])

  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />

      <div className='p-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/city/:city' element={<CityDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App