import { Link } from 'react-router-dom'
import NavItems from './NavItems'
import logo from '/logo.svg'
import { FaUser } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
import Modal from './Modal'
import { AuthContext } from '../context/AuthProvider'
import Profile from './Profile'
import useCart from '../hooks/useCart'

const Navbar = () => {
  const [isSticky, setSticky] = useState(false)
  const { user, loading } = useContext(AuthContext)
  const { cart } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY

      if (offset > 0) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className='max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out'>
      <div
        className={`navbar xl:px-24 transition-all duration-500 ease-in-out ${
          isSticky ? 'shadow-md bg-base-100' : ''
        }`}
      >
        <div className='navbar-start'>
          {/* Mobile menu */}
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              <NavItems />
            </ul>
          </div>
          {/* Logo */}
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
        </div>
        {/* Desktop menu */}
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <NavItems />
          </ul>
        </div>
        {/* Search - Cart - Btn */}
        <div className='navbar-end'>
          {/* Search */}
          <button className='btn btn-ghost btn-circle hidden lg:flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </button>
          {/* Cart */}
          <Link
            to='/cart'
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle mr-3 hidden lg:flex items-center justify-center'
          >
            <div className='indicator'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
              <span className='badge badge-sm indicator-item'>
                {(!loading && cart?.totalItems) || 0}
              </span>
            </div>
          </Link>
          {/* Btn */}
          {loading ? (
            <span className='loading loading-spinner loading-xs'></span>
          ) : user ? (
            <Profile user={user} />
          ) : (
            <>
              <button
                className='btn bg-green rounded-full px-6 text-white flex items-center gap-2'
                onClick={() =>
                  document.getElementById('my_modal_5').showModal()
                }
              >
                <FaUser /> Login
              </button>
              <Modal />
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
