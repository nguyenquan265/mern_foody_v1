import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  cartItems: [
    {
      foodId: String,
      name: {
        type: String,
        trim: true,
        required: true
      },
      recipe: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  userEmail: {
    type: String,
    required: true
  }
})

export const Cart = mongoose.model('Cart', cartSchema)
