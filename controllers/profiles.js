import { Profile } from '../models/profile.js'

export {
  index,
  show,
  recommend,
  newRec,
}

function newRec(req, res) {
  
}

function recommend(req, res) {
  Profile.findById(req.user._id)
  .then(self => {
    res.redirect(`/profiles/${self._id}/recs/new`)
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    Profile.findById(req.user._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      res.render('profiles/show', {
        title: `${profile.displayName}`,
        profile,
        self,
        isSelf,
      })
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect('/')
  })
}

function index(req, res) {
  res.show("Respond with a resource")
}