import { Menu } from '~/models/menu.model'
import { catchAsync } from '~/utils/catchAsync'

export const getAllMenus = catchAsync(async (req, res, next) => {
  const menus = await Menu.find()

  res.status(200).json({ status: 'success', menus })
})
