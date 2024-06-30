import { Router } from 'express'
import { getAllFoods } from '~/controllers/food.controller'

const router = Router()

router.route('/').get(getAllFoods)

export default router
