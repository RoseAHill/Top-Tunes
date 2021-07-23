import btoa from "btoa"
import fetch from "node-fetch"
import { Profile } from "../models/profile.js"
import { Rec } from "../models/rec.js"
import { Song } from "../models/song.js"

export {
  index,
  newRec as new,
  create,
}

function create(req, res) {
  let songId = req.body.spotifyId
  songId = songId.includes('?') ?
  songId.match(/(.{22})(?=\?)/).pop() :
  songId.slice(-22)
  Profile.findById(req.user._id)
  .populate('recs')
  .then(self => {
    let songData = {}
    Song.findOne({ spotifyId: songId })
    .then((err, song) => {
      if (err) res.redirect('/')
      if (song) {
        songData = song
      } else {
        const options = {
          headers: {
            [`Accept`]: `application/json`,
            [`Content-Type`]: `application/json`,
            [`Authorization`]: `Bearer ${self.token}`
          }
        }
        fetch(`https://api.spotify.com/v1/tracks/${songId}`, options)
        .then(data => data.json())
        .then(json => {
          console.log(json)
          const newSong = new Song({
            spotifyId: songId,
            songTitle: json.name,
            artist: json.artists[0].name,
            album: json.album.name,
            releaseYear: json.album.release_date.substring(0, 4)
          })
          newSong.save()
          songData = newSong
        })
        .catch(err => {
          console.log(err)
          res.redirect('/')
        })
      }
    })
    if (self.recs.length) {
      const recSongs = self.recs.map(song => song._id)
      // check if there is a song rec existing in user doc
      if (recSongs.includes(songData._id)) {
        // if so, for now redirect to users profile page
        // later, edit the existing rec
        res.redirect(`/profiles/${self._id}`)
      }
    }
    const newRec = new Rec({
      author: self._id,
      mood: req.body.mood,
      recMessage: req.body.recMessage,
      song: songData._id
    })
    newRec.save()
  })
  .catch((err) => {
    console.log(err)
    res.redirect('/recs/new')
  })
}

function newRec(req, res) {
  res.render('recs/new', {
    title: 'Recommend'
  })
}

function index(req, res) {
  Rec.find({})
  .then(recs => {
    res.render('recs/index', {
      title: 'Browse',
      recs,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}