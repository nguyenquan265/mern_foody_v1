import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import customAxios from '../utils/customAxios'

const useCart = () => {
  const { user } = useContext(AuthContext)

  const { data: cart, refetch } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async () => {
      try {
        const res = await customAxios(`/carts?email=${user?.email}`)

        return res.data.cart
      } catch (error) {
        throw new Error(error)
      }
    }
  })

  return { cart, refetch }
}

export default useCart
