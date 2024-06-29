import { Router } from 'express'
import {
  forgotPassword,
  login,
  logout,
  refreshToken,
  register,
  resetPassword
} from '~/controllers/auth.controller'
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  updatePassword,
  updateMe_v1,
  updateMe_v2
} from '~/controllers/user.controller'
import { protect, restrictTo } from '~/middlewares/auth.middleware'
import { upload } from '~/utils/uploadImage'

const router = Router()

// Auth routes
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/refresh-token').post(refreshToken)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword').patch(resetPassword)

// Current user routes
router.use(protect)
router.route('/me').get(getMe, getUser)
router.route('/updateMyPassword').patch(updatePassword)
router.route('/updateMe-v1').patch(upload.single('photo'), updateMe_v1)
router.route('/updateMe-v2').patch(updateMe_v2)

// User routes
router.use(restrictTo('admin'))
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router
