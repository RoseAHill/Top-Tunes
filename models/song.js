import mongoose from 'mongoose'

export {
  Song
}

const songSchema = new mongoose.Schema(
  {
    spotifyId: String,
    songTitle: {
      type: String,
      required: true,
    },
    artist: [{
      type: String,
      required: true,
    }],
    album: String,
    releaseYear: {
      ype: Number,
      min: 1900,
      max: function() {
        let today = new Date
        return today.getFullYear() + 1
      }
    },
  }, {
    timestamps: true,
  }
)

const Song = mongoose.model('Song', songSchema)