import { useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { AuthContext } from '../context/AuthProvider'
import toast from 'react-hot-toast'
import customAxios from '../utils/customAxios'
import useCart from '../hooks/useCart'

const Card = ({ item }) => {
  const { _id, image, name, recipe, price } = item
  const [isHeartFilled, setIsHeartFilled] = useState(false)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const { refetch } = useCart()

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled)
  }

  const handleAddTocart = async () => {
    if (user && user?.email) {
      const cartItem = {
        foodId: _id,
        name,
        recipe,
        quantity: 1,
        price,
        image,
        userEmail: user.email
      }

      try {
        await customAxios.post('/carts', cartItem)

        toast.success('Item added to cart')
        refetch()
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || 'Something went wrong')
      }
    } else {
      toast.error('Please login to add item to cart')
      navigate('/signup', { state: { from: location.pathname } })
    }
  }

  return (
    <div className='card bg-base-100 w-[22rem] shadow-xl relative'>
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? 'text-rose-500' : 'text-white'
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className='h-5 w-5 cursor-pointer' />
      </div>
      <Link to={`/menu/${_id}`} className='flex justify-center items-center'>
        <img
          src={image}
          className='hover:scale-105 transition-all duration-300 md:h-72'
          alt='food'
        />
      </Link>
      <div className='card-body'>
        <Link to={`/menu/${_id}`}>
          <h2 className='card-title'>{name}</h2>
        </Link>
        <p>{recipe}</p>
        <div className='card-actions justify-between items-center mt-2'>
          <h5 className='font-semibold'>
            <span className='text-sm text-red'>$</span>
            {price}
          </h5>
          <button className='btn bg-green text-white' onClick={handleAddTocart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
