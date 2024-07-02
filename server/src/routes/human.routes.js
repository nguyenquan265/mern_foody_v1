import { Router } from 'express'
import {
  createHuman,
  deleteHuman,
  getAllHumans
} from '~/controllers/human.controller'

const router = Router()

router.route('/').get(getAllHumans).post(createHuman)
router.route('/:id').delete(deleteHuman)

export default router
