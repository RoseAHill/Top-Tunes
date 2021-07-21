import 'dotenv/config.js'
import createError from 'http-errors'
import session from 'express-session'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import logger from 'morgan'
import methodOverride from 'method-override'
import passport from 'passport'

// custom middleware import
import { passUserToView } from './middleware/middleware.js'

// router imports
import { router as indexRouter } from './routes/index.js'
import { router as usersRouter } from './routes/users.js'

// create the express app
const app = express()

// configure mongoose
import('./config/database.js')

// configure passport
import('./config/passport.js')

// view engine setup
app.set(
  'views',
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'views')
)
app.set('view engine', 'ejs')

// middleware
app.use(methodOverride('_method'))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  )
)

// session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax'
    }
  })
)

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export { app }
