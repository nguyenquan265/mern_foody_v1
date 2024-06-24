const servicesList = [
  {
    id: 1,
    title: 'Catering',
    image: '/images/home/services/icon1.png',
    des: 'Delight your guests with our flavors and  presentation'
  },
  {
    id: 2,
    title: 'Fast delivery',
    image: '/images/home/services/icon2.png',
    des: 'We deliver your order promptly to your door'
  },
  {
    id: 3,
    title: 'Online Ordering',
    image: '/images/home/services/icon3.png',
    des: 'Explore menu & order with ease using our Online Ordering '
  },
  {
    id: 4,
    title: 'Gift Cards',
    image: '/images/home/services/icon4.png',
    des: 'Give the gift of exceptional dining with Foodi Gift Cards'
  }
]

const OurServices = () => {
  return (
    <div className='section-container my-16'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
        <div className='md:w-1/2'>
          <div className='text-left md:w-4/5'>
            <p className='subtitle'>Our Story & Services</p>
            <h3 className='title md:w-[520px]'>
              Our Culinary Journey And Services
            </h3>
            <p className='my-5 text-secondary leading-[30px]'>
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm
              hospitality.
            </p>
            <button className='btn bg-green text-white px-8 py-3 rounded-full'>
              Explore
            </button>
          </div>
        </div>
        <div className='md:w-1/2'>
          <div className='grid sm:grid-cols-2 grid-col-1 gap-8 items-center'>
            {servicesList.map((service) => (
              <div
                key={service.id}
                className='shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:-translate-y-4 transition-all duration-200'
              >
                <img src={service.image} className='mx-auto' alt='serviceImg' />
                <h5 className='pt-3 font-semibold'>{service.title}</h5>
                <p className='text-[#90BD95]'>{service.des}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurServices
