import { Router } from 'express'
import { getAllMenus } from '~/controllers/menu.controller'

const router = Router()

router.route('/').get(getAllMenus)

export default router
