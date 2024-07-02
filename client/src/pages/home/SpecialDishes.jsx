import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { useRef } from 'react'
import Card from '../../components/Card'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import customAxios from '../../utils/customAxios'
import { useQuery } from '@tanstack/react-query'

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
  const slider = useRef(null)
  const { data: recipes, isLoading } = useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      try {
        const res = await customAxios('/foods')

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
        {recipes
          .filter((recipe) => recipe.category === 'popular')
          .map((recipe, i) => (
            <Card key={i} item={recipe} />
          ))}
      </Slider>
    </div>
  )
}

export default SpecialDishes
