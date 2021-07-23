import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as recsCtrl from '../controllers/recs.js'

export {
  router
}

const router = Router()

router.get('/', recsCtrl.index)