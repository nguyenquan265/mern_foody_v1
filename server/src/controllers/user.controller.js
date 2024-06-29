/* eslint-disable no-unused-vars */
import { User } from '~/models/user.model'
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne
} from './factory.handler'
import { catchAsync } from '~/utils/catchAsync'
import { ApiError } from '~/utils/ApiError'
import fs from 'fs'
import util from 'util'
import path from 'path'
import { filterObj } from '~/utils/filterObject'
import { cloudinary } from '~/config/cloudinary'

const writeFile = util.promisify(fs.writeFile)

export const getMe = (req, res, next) => {
  req.params.id = req.user.id

  next()
}

export const updatePassword = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm, currentPassword } = req.body

  const user = await User.findById(req.user.id).select('+password')

  if (!(await user.correctPassword(currentPassword))) {
    throw new ApiError(401, 'Your current password is wrong')
  }

  user.password = password
  user.passwordConfirm = passwordConfirm
  await user.save()

  const { password: pass, ...rest } = user._doc

  res.status(200).json({ status: 'success', user: rest })
})

export const updateMe_v1 = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    throw new ApiError(400, 'This route is not for password updates')
  }

  const filteredBody = filterObj(req.body, 'name', 'email')

  // upload file
  if (req.file) {
    if (req.user.photo) {
      await cloudinary.uploader.destroy(
        req.user.photo_publicId || req.user.photo.split('/').pop().split('.')[0]
      )
    }

    const tempFilePath = path.join(__dirname, req.file.originalname)
    await writeFile(tempFilePath, req.file.buffer)

    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: 'file-upload'
    })

    fs.unlinkSync(tempFilePath)
    filteredBody.photo = result.secure_url
    filteredBody.photo_publicId = result.public_id
  }

  // update user
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  })

  res.status(200).json({ status: 'success', user })
})

export const updateMe_v2 = catchAsync(async (req, res, next) => {
  const { name } = req.body
  let { photo } = req.body
  const userId = req.user._id

  // check if user exists
  const user = await User.findById(userId)

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  // upload file
  if (photo) {
    if (user.photo) {
      await cloudinary.uploader.destroy(
        user.photo_publicId || user.photo.split('/').pop().split('.')[0]
      )
    }

    const result = await cloudinary.uploader.upload(photo, {
      folder: 'file-upload'
    })

    user.photo = result.secure_url
    user.photo_publicId = result.public_id
  }

  // update other fields
  user.name = name || user.name

  // save user
  await user.save()

  res.status(200).json({ status: 'success', user })
})

// Admin
export const getAllUsers = getAll(User)
export const getUser = getOne(User)
export const createUser = createOne(User)
export const updateUser = updateOne(User)
export const deleteUser = deleteOne(User)
