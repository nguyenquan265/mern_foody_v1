import { Router } from 'express'
const router = Router()

import userRouter from './user.routes'
import foodRouter from './food.routes'
import cartRouter from './cart.routes'
import humanRouter from './human.routes'
import { ApiError } from '~/utils/ApiError'

router.use('/check', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is running' })
})
router.use('/users', userRouter)
router.use('/foods', foodRouter)
router.use('/carts', cartRouter)
router.use('/humans', humanRouter)
router.all('*', (req, res, next) =>
  next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`))
)

export default router
