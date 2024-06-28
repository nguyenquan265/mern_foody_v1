import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Link } from 'react-router-dom'

const Profile = ({ user }) => {
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
    <div>
      <div className='drawer drawer-end z-50'>
        <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content'>
          {/* Page content here */}
          <label
            htmlFor='my-drawer-4'
            className='drawer-button btn btn-ghost btn-circle avatar'
          >
            <div className='w-10 rounded-full'>
              {user?.photoURL ? (
                <img alt='' src={user.photoURL} />
              ) : (
                <img alt='' src={avatarImg} />
              )}
            </div>
          </label>
        </div>
        <div className='drawer-side'>
          <label
            htmlFor='my-drawer-4'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
            <li>
              <Link to='/update-profile'>Profile</Link>
            </li>
            <li>
              <a href='/order'>Order</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile
