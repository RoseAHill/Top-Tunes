import { User } from "../models/user.js"

export {
  passUserToView,
  isLoggedIn,
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('auth/spotify')
}

function passUserToView(req, res, next) {
  res.locals.user = req.user ? req.user : null
  console.log(req.user);
  User.findById(req.user?._id)
  .then(profile => {
    res.locals.self = profile
    next()
  })
  .catch(err => {
    next()
  })
}