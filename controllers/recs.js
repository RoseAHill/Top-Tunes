import btoa from "btoa"
import fetch from "node-fetch"
import { Profile } from "../models/profile.js"
import { Rec } from "../models/rec.js"

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

    // Song.findOne({ spotifyId: songId })
    // .then(song => {
    //   if (!song) {
    //     const newSong = new Song({
    //       spotifyId: songId,
    //       songTitle: json.name,
    //       artist: json.artists[0].name,
    //       album: json.album.name,
    //       releaseYear: json.album.releaseDate.substring(0, 4)
    //     })
    //     newSong.save()
    //   }
    // })
  })
  .catch((err) => console.log(err))
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