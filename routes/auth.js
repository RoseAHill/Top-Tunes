import { Router } from 'express'
import passport from 'passport'

export {
  router
}

const router = Router()

router.get(
  '/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email']
  })
)

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', {
    successRedirect: '/',
    failureRedirect: '/auth/spotify',
  })
)

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})