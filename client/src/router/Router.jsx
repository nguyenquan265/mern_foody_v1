import { createBrowserRouter } from 'react-router-dom'
import Main from '../layout/Main'

import Home from '../pages/home/Home'
import Menu from '../pages/menu/Menu'
import Error from '../pages/Error'

import ErrorElement from '../components/ErrorElement'

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
      }
    ]
  }
])

export default router
