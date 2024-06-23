import { Link } from 'react-router-dom'

const NavItems = () => {
  return (
    <>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <details>
          <summary>Menu</summary>
          <ul className='p-2'>
            <li>
              <a>All</a>
            </li>
            <li>
              <a>Salad</a>
            </li>
            <li>
              <a>Pizza</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Services</summary>
          <ul className='p-2'>
            <li>
              <a>Online Order</a>
            </li>
            <li>
              <a>Table Booking</a>
            </li>
            <li>
              <a>Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link to='/'>Offers</Link>
      </li>
    </>
  )
}

export default NavItems
