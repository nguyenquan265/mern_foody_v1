import { createBrowserRouter } from 'react-router-dom'
import Main from '../layout/Main'

import Home from '../pages/home/Home'
import Menu from '../pages/menu/Menu'
import Error from '../pages/Error'

import ErrorElement from '../components/ErrorElement'
import Signup from '../pages/auth/Signup'
import Login from '../pages/auth/Login'
import ProtectedRoute from './ProtectedRoute'
import UpdateProfile from '../pages/dashboard/UpdateProfile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <ErrorElement />
      },
      {
        path: '/menu',
        element: <Menu />,
        errorElement: <ErrorElement />
      },
      {
        path: '/update-profile',
        element: <ProtectedRoute children={<UpdateProfile />} />
      }
    ]
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router
