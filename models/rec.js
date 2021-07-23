import mongoose from 'mongoose'

export {
  Rec
}

const recSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    },
    mood: [{
      type: String,
      enum: ["neutral", "focus", "energize", "chill", "positive", "grieve"],
      default: "neutral"
    }],
    recMessage: {
      type: String,
      default: "Check out this song!",
    },
    song: {
      type: mongoose.Schema.Types.ObjectId,
      rec: 'Song'
    },
  }, {
    timestamps: true
  }
)

const Rec = mongoose.model('Rec', recSchema)