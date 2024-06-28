import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const Main = () => {
  const { loading } = useContext(AuthContext)

  if (loading)
    return (
      <div className='h-screen w-full flex items-center justify-center'>
        <span className='loading loading-dots loading-lg'></span>
      </div>
    )

  return (
    <div className='bg-primaryBG'>
      <Navbar />
      <div className='min-h-screen'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Main
