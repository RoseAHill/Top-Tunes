import passport from 'passport'
import { Strategy as SpotifyStrategy } from 'passport-spotify'
import { Profile } from '../models/profile.js'

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      callbackURL: process.env.SPOTIFY_CALLBACK,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      Profile.findOne({ spotifyId: profile.id }, function (err, user) {
        if (err) return done(err)
        if (user) {
          return done(null, user)
        } else {
          const newProfile = new Profile({
            spotifyId: profile.id,
            displayName: profile.displayName,
            avatar: profile.photos.length > 0 ? profile.photos[0].value : 'https://i.imgur.com/43hDQMy.jpeg',
          })
          newProfile.save(function (err) {
            if (err) return done(err)
            return done(null, newProfile)
          })
        }
      })
    }
  )
)

passport.serializeUser(function (profile, done) {
  done(null, profile.id)
})

passport.deserializeUser(function (id, done) {
  Profile.findById(id)
  .populate('profile', 'name avatar')
  .exec(function(err, profile) {
    done(err, profile)
  })
})
