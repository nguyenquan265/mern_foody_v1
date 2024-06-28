import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'

const Modal = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit } = useForm()
  const { signUpWithGmail, login } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  // login with email and password
  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        const user = result.user
        navigate(from, { replace: true })
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage('Invalid email or password!')
      })
  }

  // signup with gmail account
  const handleRegister = () => {
    document.getElementById('my_modal_5').close()

    signUpWithGmail()
      .then((result) => {
        const user = result.user
        navigate(from, { replace: true })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <dialog id='my_modal_5' className='modal modal-middle'>
      <div className='modal-box'>
        <div className='modal-action flex-col justify-center mt-0'>
          <form
            className='card-body'
            method='dialog'
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className='font-bold text-lg'>Please Login!</h3>

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

            {/* show errors */}
            {errorMessage ? (
              <p className='text-red text-xs italic'>{errorMessage}</p>
            ) : (
              ''
            )}

            {/* submit btn */}
            <div className='form-control mt-4'>
              <input
                type='submit'
                className='btn bg-green text-white'
                value='Login'
              />
            </div>

            {/* close btn */}
            <div
              htmlFor='my_modal_5'
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              onClick={() => document.getElementById('my_modal_5').close()}
            >
              ✕
            </div>

            <p className='text-center my-2'>
              Don't have an account?
              <Link
                to='/signup'
                className='underline text-red ml-1'
                onClick={() => document.getElementById('my_modal_5').close()}
              >
                Signup
              </Link>
            </p>
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
    </dialog>
  )
}

export default Modal
