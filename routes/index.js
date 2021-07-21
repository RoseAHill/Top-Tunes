import { Router } from 'express'
const router = Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home Page',
    self: res.locals.self ? res.locals.self : null
  })
})

export { 
  router
}
