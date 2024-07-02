import { Human } from '~/models/human.model'
import { ApiError } from '~/utils/ApiError'
import { catchAsync } from '~/utils/catchAsync'

export const getAllHumans = catchAsync(async (req, res, next) => {
  const humans = await Human.find()

  res.status(200).json({ status: 'success', humans })
})

export const createHuman = catchAsync(async (req, res, next) => {
  const { email } = req.body

  const existingHuman = await Human.findOne({ email })

  if (existingHuman) {
    throw new ApiError(400, 'Human with this email already exists')
  }

  const human = await Human.create(req.body)

  res.status(200).json({ status: 'success', human })
})

export const deleteHuman = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const human = await Human.findByIdAndDelete(id)

  if (!human) {
    throw new ApiError(404, 'Human not found')
  }

  res.status(200).json({ status: 'success', human })
})
