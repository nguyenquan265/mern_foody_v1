import { useRouteError } from 'react-router-dom'

const ErrorElement = () => {
  const error = useRouteError()
  console.log('component error: ', error)

  return <h4 className='font-bold text-4xl'>{error?.message}</h4>
}

export default ErrorElement
