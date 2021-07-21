import passport from 'passport'
import { Strategy as SpotifyStrategy } from 'passport-spotify'
import { User } from '../models/user.js'

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      callbackURL: process.env.SPOTIFY_CALLBACK,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      User.findOne({ spotifyId: profile.id }, function (err, user) {
        if (err) return done(err)
        if (user) {
          return done(null, user)
        } else {
          const newUser = new User({
            spotifyId: profile.id,
            displayName: profile.displayName,
            avatar: profile.photos.length > 0 ? profile.photos[0].value : 'https://i.imgur.com/43hDQMy.jpeg',
          })
          newUser.save(function (err) {
            if (err) return done(err)
            return done(null, newUser)
          })
        }
      })
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .populate('profile', 'name avatar')
  .exec(function(err, user) {
    done(err, user)
  })
})
