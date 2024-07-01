import { useContext } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import useCart from '../../hooks/useCart'
import { useMutation } from '@tanstack/react-query'
import customAxios from '../../utils/customAxios'

const Cart = () => {
  const { user } = useContext(AuthContext)
  const { cart, refetch } = useCart()

  const { mutate: handleDecrease } = useMutation({
    mutationFn: async (item) => {
      try {
        const res = await customAxios.patch(`/carts/${cart._id}/${item._id}`, {
          quantity: item.quantity - 1,
          type: 'decrease'
        })

        return res.data.cart
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
    },
    onSuccess: () => {
      refetch()
    }
  })

  const { mutate: handleIncrease } = useMutation({
    mutationFn: async (item) => {
      try {
        const res = await customAxios.patch(`/carts/${cart._id}/${item._id}`, {
          quantity: item.quantity + 1,
          type: 'increase'
        })

        return res.data.cart
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
    },
    onSuccess: () => {
      refetch()
    }
  })

  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: async (item) => {
      try {
        const res = await customAxios.delete(`/carts/${cart._id}/${item._id}`)

        document.getElementById(`my_modal_${item._id}`).close()

        return res.data.cart
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
    },
    onSuccess: () => {
      refetch()
    }
  })

  const calculateTotalPrice = (item) => {
    return item.price * item.quantity
  }

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%'>
        <div className='py-28 flex flex-col items-center justify-center'>
          <div className='text-center px-4 space-y-7'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
              Items Added to The<span className='text-green'> Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* cart table */}
      {cart?.cartItems.length > 0 ? (
        <div>
          {/* cart items */}
          <div className=''>
            <div className='overflow-x-auto'>
              <table className='table'>
                {/* head */}
                <thead className='bg-green text-white rounded-sm'>
                  <tr>
                    <th>#</th>
                    <th>Food</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {/* body */}
                <tbody>
                  {cart.cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td>
                        <div className='avatar'>
                          <div className='mask mask-squircle w-12 h-12'>
                            <img
                              src={item.image}
                              alt='Avatar Tailwind CSS Component'
                            />
                          </div>
                        </div>
                      </td>
                      <td className='font-medium'>{item.name}</td>
                      {/* quantity */}
                      <td>
                        <button
                          className='btn btn-xs'
                          onClick={() => handleDecrease(item)}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <input
                          type='number'
                          value={item.quantity}
                          readOnly
                          className='w-10 mx-2 text-center overflow-hidden appearance-none'
                        />
                        <button
                          className='btn btn-xs'
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </td>
                      {/* price */}
                      <td>${calculateTotalPrice(item).toFixed(2)}</td>
                      {/* delete item */}
                      <td>
                        <button
                          className='btn btn-sm border-none text-red bg-transparent'
                          onClick={() =>
                            document
                              .getElementById(`my_modal_${item._id}`)
                              .showModal()
                          }
                        >
                          <FaTrash />
                        </button>
                        <dialog id={`my_modal_${item._id}`} className='modal'>
                          <div className='modal-box items-center text-center'>
                            <h3 className='font-bold text-lg'>Are you sure?</h3>
                            <p className='py-4'>
                              You won't be able to revert this!
                            </p>
                            <div className='modal-action items-center justify-center'>
                              <button
                                className='btn bg-red text-white'
                                onClick={() => handleDelete(item)}
                              >
                                {isPending ? 'Deleting...' : 'Yes, delete it!'}
                              </button>
                              <form method='dialog'>
                                <button className='btn'>Cancel</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <hr />
          {/* user detail */}
          <div className='flex flex-col md:flex-row justify-between items-start my-12 gap-8'>
            <div className='md:w-1/2 space-y-3'>
              <h3 className='text-lg font-semibold'>Customer Details</h3>
              <p>Name: {user?.displayName || 'None'}</p>
              <p>Email: {user?.email}</p>
              <p>
                User_id: <span className='text-sm'>{user?.uid}</span>
              </p>
            </div>
            <div className='md:w-1/2 space-y-3'>
              <h3 className='text-lg font-semibold'>Shopping Details</h3>
              <p>Total Items: {cart.totalItems}</p>
              <p>
                Total Price:{' '}
                <span id='total-price'>${cart.totalPrice.toFixed(2)}</span>
              </p>
              <button className='btn btn-md bg-green text-white px-8 py-1'>
                Procceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center mt-20'>
          <p>Cart is empty. Please add products.</p>
          <Link to='/menu'>
            <button className='btn bg-green text-white mt-3'>
              Back to Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Cart
