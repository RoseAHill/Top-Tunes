import mongoose from 'mongoose'

export {
  Song
}

const songSchema = new mongoose.Schema(
  {
    spotifyId: {
      type: String,
      required: true,
    },
    songTitle: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    album: String,
    releaseYear: {
      type: Number,
    },
  }, {
    timestamps: true,
  }
)

const Song = mongoose.model('Song', songSchema)