import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit } = useForm()
  const { signUpWithGmail, login } = useContext(AuthContext)
  const navigate = useNavigate()

  // create user with email and password
  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        const user = result.user
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage('Invalid email or password!')
      })
  }

  // signup with gmail account
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20'>
      <div className='modal-action flex-col justify-center mt-0'>
        <form
          className='card-body'
          method='dialog'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className='font-bold text-lg'>Create An Account!</h3>

          {/* email */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder='email'
              className='input input-bordered'
              {...register('email')}
            />
          </div>

          {/* password */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='password'
              className='input input-bordered'
              {...register('password', { required: true })}
            />
            <label className='label'>
              <a href='#' className='label-text-alt link link-hover mt-2'>
                Forgot password?
              </a>
            </label>
          </div>

          {/* submit btn */}
          <div className='form-control mt-4'>
            <input
              type='submit'
              className='btn bg-green text-white'
              value='Login'
            />
          </div>

          {/* show errors */}
          {errorMessage ? (
            <p className='text-red text-xs italic'>{errorMessage}</p>
          ) : (
            ''
          )}

          {/* close btn */}
          <Link
            to='/'
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
          >
            ✕
          </Link>
        </form>
        <div className='text-center space-x-3 mb-5'>
          <button
            onClick={handleRegister}
            className='btn btn-circle hover:bg-green hover:text-white'
          >
            <FaGoogle />
          </button>
          <button className='btn btn-circle hover:bg-green hover:text-white'>
            <FaFacebookF />
          </button>
          <button className='btn btn-circle hover:bg-green hover:text-white'>
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
