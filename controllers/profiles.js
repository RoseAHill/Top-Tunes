import btoa from 'btoa'
import fetch from 'node-fetch'
import { Profile } from '../models/profile.js'
import { Rec } from '../models/rec.js'
import { Song } from '../models/song.js'

export {
  index,
  show,
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    Rec.find({ author: profile._id })
    .then((recs) => {
      Song.populate(recs, [{ path: 'song'}])
      .then(() => {
        Profile.findById(req.user._id)
        .then(self => {
          const isSelf = self._id.equals(profile._id)
          res.render('profiles/show', {
            title: `${profile.displayName}`,
            profile,
            recs,
            self,
            isSelf,
          })
        })
      })
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect('/')
  })
}

function index(req, res) {
  res.redirect(`/profiles/${req.user._id}`)
}