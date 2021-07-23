import mongoose from 'mongoose'

export {
  Rec
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

const recSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    },
    song: songSchema,
    mood: [{
      type: String,
      enum: ["neutral", "focus", "energize", "chill", "positive", "grieve"],
      default: "neutral"
    }],
    recMessage: {
      type: String,
      default: "Check out this song!",
    }
  }, {
    timestamps: true
  }
)

const Rec = mongoose.model('Rec', recSchema)