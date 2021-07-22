import mongoose from 'mongoose'

export {
  Profile
}

const recSchema = new mongoose.Schema(
  {
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song'
    },
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

const profileSchema = new mongoose.Schema(
  {
    spotifyId: String,
    displayName: String,
    avatar: {
      type: String,
      default: 'https://i.imgur.com/43hDQMy.jpeg',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    topTune: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
    },
    recs: [recSchema]
  }, {
    timestamps: true
  }
)

const Profile = mongoose.model('Profile', profileSchema)