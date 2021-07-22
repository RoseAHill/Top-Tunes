import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profileCtrl from '../controllers/profiles.js'

export {
  router
}

const router = Router()

router.get('/', isLoggedIn, profileCtrl.index)
router.get('/recommend', isLoggedIn, profileCtrl.recommend)
router.get('/:id', isLoggedIn, profileCtrl.show)
router.get('/:id/recs/new', isLoggedIn, profileCtrl.newRec)
router.post('/:id/rec', profileCtrl.createRec)