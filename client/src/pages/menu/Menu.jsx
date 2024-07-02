import { useState } from 'react'
import Card from '../../components/Card'
import { FaFilter } from 'react-icons/fa'
import customAxios from '../../utils/customAxios'
import { useQuery } from '@tanstack/react-query'

const Menu = () => {
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortOption, setSortOption] = useState('default')
  const [page, setPage] = useState(1)

  const itemsPerPage = 9
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const indexOfLastItem = page * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)

  const { data: menu, isLoading } = useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      try {
        const res = await customAxios('/foods')

        setFilteredItems(
          res.data.foods.sort((a, b) => a.name.localeCompare(b.name))
        )

        return res.data.foods
      } catch (error) {
        throw new Error(error)
      }
    }
  })

  if (isLoading)
    return (
      <div className='h-screen w-full flex items-center justify-center'>
        <span className='loading loading-dots loading-lg'></span>
      </div>
    )

  const paginate = (pageNumber) => {
    setPage(pageNumber)
  }

  const filterItems = (category) => {
    setSelectedCategory(category)

    const filteredItems =
      category === 'all'
        ? menu
        : menu.filter((item) => item.category === category)

    setFilteredItems(filteredItems)
    setPage(1)
  }

  const showAll = () => {
    setFilteredItems(menu)
    setSelectedCategory('all')
    setPage(1)
  }

  const handleSortChange = (option) => {
    setSortOption(option)

    const sortedItems = [...filteredItems]

    switch (option) {
      case 'A-Z':
        sortedItems.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'Z-A':
        sortedItems.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'low-to-high':
        sortedItems.sort((a, b) => a.price - b.price)
        break
      case 'high-to-low':
        sortedItems.sort((a, b) => b.price - a.price)
        break
      default:
        sortedItems.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    setFilteredItems(sortedItems)
  }

  return (
    <div>
      <div className='section-container bg-gradient-to-r from-[#fafafa] from-0% to-[#fcfcfc] to-100%'>
        <div className='py-48 flex flex-col justify-center items-center gap-8'>
          <div className='text-center space-y-7 px-4'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug'>
              Dive into Delights Of Delectable{' '}
              <span className='text-green'>Food</span>
            </h2>
            <p className='text-xl text-[#4a4a4a] md:w-4/5 mx-auto'>
              Where Each Plate Weaves a Story of Culinary Mastery and Passionate
              Craftsmanship
            </p>
            <button className='btn bg-green px-8 py-3 font-semibold text-white rounded-full'>
              Order now
            </button>
          </div>
        </div>
      </div>

      <div className='section-container'>
        <div className='flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8'>
          <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap'>
            <button
              onClick={showAll}
              className={`${
                selectedCategory === 'all' ? 'active' : ''
              } hover:text-green`}
            >
              All
            </button>
            <button
              onClick={() => filterItems('salad')}
              className={`${
                selectedCategory === 'salad' ? 'active' : ''
              } hover:text-green`}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems('pizza')}
              className={`${
                selectedCategory === 'pizza' ? 'active' : ''
              } hover:text-green`}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems('soup')}
              className={`${
                selectedCategory === 'soup' ? 'active' : ''
              } hover:text-green`}
            >
              Soup
            </button>
            <button
              onClick={() => filterItems('dessert')}
              className={`${
                selectedCategory === 'dessert' ? 'active' : ''
              } hover:text-green`}
            >
              Dessert
            </button>
            <button
              onClick={() => filterItems('drinks')}
              className={`${
                selectedCategory === 'drinks' ? 'active' : ''
              } hover:text-green`}
            >
              Drinks
            </button>
            <p>({filteredItems.length} results)</p>
          </div>
          <div className='flex justify-end mb-4 rounded-sm'>
            <div className='bg-green p-2 rounded-md'>
              <FaFilter className='h-4 w-4 text-white' />
            </div>
            <select
              name='sort'
              id='sort'
              onChange={(e) => handleSortChange(e.target.value)}
              className='bg-green text-white px-2 py-1 rounded-md cursor-pointer'
              value={sortOption}
            >
              <option value='default'>Default</option>
              <option value='A-Z'>A-Z</option>
              <option value='Z-A'>Z-A</option>
              <option value='low-to-high'>Low to High</option>
              <option value='high-to-low'>High to Low</option>
            </select>
          </div>
        </div>
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
          {currentItems.map((item, i) => (
            <Card key={i} item={item} />
          ))}
        </div>
      </div>

      <div className='flex justify-center my-8'>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              page === index + 1 ? 'bg-green text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Menu
