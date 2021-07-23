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
      if (typeof song == "undefined") {
        console.log("LETS FETCH THE SONG");
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
          console.log("LETS CREATE THE SONG");
          const newSong = new Song({
            spotifyId: songId,
            songTitle: json.name,
            artist: json.artists[0].name,
            album: json.album.name,
            releaseYear: json.album.release_date.substring(0, 4)
          })
          const newRec = new Rec({
            author: self._id,
            mood: req.body.mood,
            recMessage: req.body.recMessage,
            song: newSong._id
          })
          newSong.save(function(err) {
            console.log(err)
          })
          newRec.save()
          .then(()=> {
            self.recs.push(newRec._id)
            self.save()
            .then(() => {
              res.redirect(`/profiles/${self._id}`)
            })
          })
        })
        .catch(err => {
          console.log(err)
          res.redirect('/')
        })
      } else if (song){
        const newRec = new Rec({
          author: self._id,
          mood: req.body.mood,
          recMessage: req.body.recMessage,
          song: song._id
        })
        newRec.save()
        .then(()=> {
          self.recs.push(newRec._id)
          self.save()
          .then(() => {
            res.redirect(`/profiles/${self._id}`)
          })
        })
      }
    })
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