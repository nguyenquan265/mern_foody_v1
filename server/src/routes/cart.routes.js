import { Router } from 'express'
import {
  addTocart,
  deleteCartItem,
  getCartByEmail,
  updateCartItem
} from '~/controllers/cart.controller'
import { protect } from '~/middlewares/auth.middleware'

const router = Router()

// router.use(protect)
router.route('/').get(getCartByEmail).post(addTocart)
router
  .route('/:cartId/:cartItemId')
  .patch(updateCartItem)
  .delete(deleteCartItem)

export default router
