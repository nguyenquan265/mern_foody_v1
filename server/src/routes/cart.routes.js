import { Router } from 'express'
import { addTocart, getCartByEmail } from '~/controllers/cart.controller'
import { protect } from '~/middlewares/auth.middleware'

const router = Router()

// router.use(protect)
router.route('/').get(getCartByEmail).post(addTocart)

export default router
