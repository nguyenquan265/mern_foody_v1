import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { useEffect, useRef, useState } from 'react'
import Card from '../../components/Card'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

// const PrevArrow = (props) => {
//   const { className, style, onClick } = props

//   return (
//     <div
//       className={className}
//       style={{ ...style, display: 'block', background: 'red' }}
//       onClick={onClick}
//     >
//       Prev
//     </div>
//   )
// }

// const NextArrow = (props) => {
//   const { className, style, onClick } = props

//   return (
//     <div
//       className={className}
//       style={{ ...style, display: 'block', background: 'green' }}
//       onClick={onClick}
//     >
//       Next
//     </div>
//   )
// }

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}

const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([])
  const slider = useRef(null)

  useEffect(() => {
    fetch('/menu.json')
      .then((res) => res.json())
      .then((data) =>
        setRecipes(data.filter((recipe) => recipe.category === 'popular'))
      )
  }, [])

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 my-20 relative'>
      <div className='text-left'>
        <p className='subtitle'>Special Dishes</p>
        <h3 className='title md:w-[520px]'>Standout Dishes From Our Menus</h3>
      </div>

      <div className='md:absolute right-3 top-8 mb-10 md:mr-24'>
        <button
          className='btn p-2 rounded-full ml-5'
          onClick={() => slider?.current?.slickPrev()}
        >
          <FaAngleLeft className='w-8 h-8 p-1' />
        </button>
        <button
          className='btn p-2 rounded-full ml-5 bg-green'
          onClick={() => slider?.current?.slickNext()}
        >
          <FaAngleRight className='w-8 h-8 p-1' />
        </button>
      </div>

      <Slider
        ref={slider}
        {...settings}
        className='overflow-hidden mt-10 space-x-5'
      >
        {recipes.map((recipe, i) => (
          <Card key={i} item={recipe} />
        ))}
      </Slider>
    </div>
  )
}

export default SpecialDishes
