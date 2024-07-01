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
    existedCart.totalItems += quantity
    existedCart.totalPrice += price

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
      totalItems: quantity,
      totalPrice: price,
      userEmail
    })

    res.status(200).json({ status: 'success', cart })
  }
})

export const getCartByEmail = catchAsync(async (req, res, next) => {
  const { email } = req.query

  const cart = await Cart.findOne({ userEmail: email })

  res.status(200).json({ status: 'success', cart })
})

export const updateCartItem = catchAsync(async (req, res, next) => {
  const { cartId, cartItemId } = req.params
  const { quantity, type } = req.body

  const cart = await Cart.findById(cartId)

  if (!cart) {
    throw new ApiError(404, 'Cart not found')
  }

  const cartItem = cart.cartItems.find(
    (item) => item._id.toString() === cartItemId
  )

  if (!cartItem) {
    throw new ApiError(404, 'Item not found')
  }

  cartItem.quantity = quantity

  if (type === 'increase') {
    cart.totalItems += 1
    cart.totalPrice += cartItem.price
  } else {
    cart.totalItems -= 1
    cart.totalPrice -= cartItem.price
  }

  await cart.save()

  res.status(200).json({ status: 'success', cart })
})

export const deleteCartItem = catchAsync(async (req, res, next) => {
  const { cartId, cartItemId } = req.params

  const cart = await Cart.findById(cartId)
  const backupCart = cart

  if (!cart) {
    throw new ApiError(404, 'Cart not found')
  }

  const cartItem = backupCart.cartItems.find(
    (item) => item._id.toString() === cartItemId
  )

  const updatedCartItems = cart.cartItems.filter(
    (item) => item._id.toString() !== cartItemId
  )

  cart.cartItems = updatedCartItems
  cart.totalItems -= cartItem.quantity
  cart.totalPrice -= cartItem.price * cartItem.quantity

  await cart.save()

  res.status(200).json({ status: 'success', cart })
})
