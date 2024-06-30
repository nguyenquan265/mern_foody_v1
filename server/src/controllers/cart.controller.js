import { Cart } from '~/models/cart.model'
import { ApiError } from '~/utils/ApiError'
import { catchAsync } from '~/utils/catchAsync'

export const addTocart = catchAsync(async (req, res, next) => {
  const { foodId, name, recipe, quantity, image, price, userEmail } = req.body

  const existedCart = await Cart.findOne({ userEmail })

  if (existedCart) {
    const existedCartItem = existedCart.cartItems.find(
      (item) => item.foodId === foodId
    )

    if (existedCartItem) {
      throw new ApiError(400, 'Item already existed in cart')
    }

    existedCart.cartItems.push({
      foodId,
      name,
      recipe,
      image,
      price,
      quantity
    })

    await existedCart.save()

    res.status(200).json({ status: 'success', cart: existedCart })
  } else {
    const cart = await Cart.create({
      cartItems: [
        {
          foodId,
          name,
          recipe,
          image,
          price,
          quantity
        }
      ],
      userEmail
    })

    res.status(200).json({ status: 'success', cart })
  }
})

export const getCartByEmail = catchAsync(async (req, res, next) => {
  const { email } = req.query

  const cart = await Cart.findOne({ userEmail: email })

  if (!cart) {
    throw new ApiError(404, 'Cart not found')
  }

  res.status(200).json({ status: 'success', cart })
})
