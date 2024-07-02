import { Link, Outlet } from 'react-router-dom'
import { MdDashboard, MdDashboardCustomize } from 'react-icons/md'
import {
  FaEdit,
  FaHome,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaShoppingBag,
  FaShoppingCart,
  FaUsers
} from 'react-icons/fa'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const sharedLinks = (
  <>
    <li className='mt-3'>
      <Link to='/'>
        <FaHome /> Home
      </Link>
    </li>
    <li>
      <Link to='/menu'>
        <FaShoppingCart /> menu
      </Link>
    </li>
    <li>
      <Link to='#'>
        <FaLocationArrow />
        Orders Tracking
      </Link>
    </li>
    <li>
      <Link to='#'>
        <FaQuestionCircle />
        Customer Support
      </Link>
    </li>
  </>
)

const DashboardLayout = () => {
  const { logout } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
      .then(() => {
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='drawer md:drawer-open'>
      <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col md:items-start md:justify-start my-2'>
        <div className='flex items-center justify-between mx-4'>
          <label
            htmlFor='my-drawer-2'
            className='btn btn-primary drawer-button md:hidden'
          >
            <MdDashboardCustomize />
          </label>
          <button
            className='btn rounded-full px-6 bg-green text-white md:hidden'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className='mt-5 md:mt-2 mx-4'>
          <Outlet />
        </div>
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer-2'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <ul className='menu bg-base-200 text-base-content min-h-full w-80 p-4'>
          <li>
            <Link to='/'>
              <img src='/logo.svg' alt='logo' className='w-20' />
              <span className='badge badge-primary'>Admin</span>
            </Link>
          </li>
          <hr />
          <li className='mt-3'>
            <Link to='/dashboard'>
              <MdDashboard /> Dashboard
            </Link>
          </li>
          <li>
            <Link to='/dashboard'>
              <FaShoppingBag /> Manage Bookings
            </Link>
          </li>
          <li>
            <Link to='/dashboard'>
              <FaPlusCircle /> Add Menu
            </Link>
          </li>
          <li>
            <Link to='/dashboard'>
              <FaEdit /> Manage Items
            </Link>
          </li>
          <li className='mb-3'>
            <Link to='/dashboard/users'>
              <FaUsers />
              All Users
            </Link>
          </li>
          <hr />
          {sharedLinks}
        </ul>
      </div>
    </div>
  )
}

export default DashboardLayout
