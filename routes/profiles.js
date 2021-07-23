import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profileCtrl from '../controllers/profiles.js'

export {
  router
}

const router = Router()

router.get('/', isLoggedIn, profileCtrl.index)
router.get('/:id', isLoggedIn, profileCtrl.show)