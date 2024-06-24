import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { useEffect, useRef, useState } from 'react'
import Card from './Card'

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
    <div className='section-container my-20'>
      <div className='text-left'>
        <p className='subtitle'>Special Dishes</p>
        <h3 className='title md:w-[520px]'>Standout Dishes From Our Menus</h3>
      </div>

      <Slider {...settings}>
        {recipes.map((recipe, i) => (
          <Card key={i} item={recipe} />
        ))}
      </Slider>
    </div>
  )
}

export default SpecialDishes
