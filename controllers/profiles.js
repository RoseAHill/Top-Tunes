import btoa from 'btoa'
import fetch from 'node-fetch'
import { Profile } from '../models/profile.js'
import { Rec } from '../models/rec.js'

export {
  index,
  show,
  recommend,
  newRec,
  createRec,
}

function createRec(req, res) {
  let songId = req.body.spotifyId
  songId = songId.includes('?') ?
  songId.match(/(.{22})(?=\?)/).pop() :
  songId.slice(-22)
  const options = {
    headers: {
      [`Accept`]: `application/json`,
      [`Content-Type`]: `application/json`,
      [`Authorization`]: `Bearer ${process.env.OAUTH_TOKEN}`
    }
  }
  fetch(`https://api.spotify.com/v1/tracks/${songId}`, options)
  .then(data => data.json())
  .then(json => {
    console.log(json)
    Song.findOne({ spotifyId: songId })
    .then(song => {
      if (!song) {
        const newSong = new Song({
          spotifyId: songId,
          songTitle: json.name,
          artist: json.artists[0].name,
          album: json.album.name,
          releaseYear: json.album.releaseDate.substring(0, 4)
        })
        newSong.save()
      }
    })
  })
  .catch((err) => console.log(err))
}

function newRec(req, res) {
  Profile.findById(req.user._id)
  .then(self => {
    res.render('profiles/newRec', {
      title: 'Recommend',
      self,
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect('/')
  })
}

function recommend(req, res) {
  Profile.findById(req.user._id)
  .then(self => {
    res.redirect(`/profiles/${self._id}/recs/new`)
  })
  .catch((err) => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('recs')
  .then(profile => {
    Profile.findById(req.user._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      if (profile.recs.length != 0) {
        console.log(profile.recs)
      }
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
  res.redirect(`/profiles/${req.user._id}`)
}