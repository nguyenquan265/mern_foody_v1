import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  if (loading)
    return (
      <div className='h-screen w-full flex items-center justify-center'>
        <span className='loading loading-dots loading-lg'></span>
      </div>
    )

  if (user) {
    return <>{children}</>
  }

  return <Navigate to='/login' />
}

export default ProtectedRoute
