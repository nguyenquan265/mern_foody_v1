import { Food } from '~/models/food.model'
import { catchAsync } from '~/utils/catchAsync'

export const getAllFoods = catchAsync(async (req, res, next) => {
  const foods = await Food.find()

  res.status(200).json({ status: 'success', foods })
})
