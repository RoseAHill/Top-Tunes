import mongoose from 'mongoose'

export {
  Profile
}

const recommendationSchema = new mongoose.Schema(
  {
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song'
    },
    mood: [String],
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
    topTune: [String],
    recommendations: [recommendationSchema]
  }, {
    timestamps: true
  }
)

const Profile = mongoose.model('Profile', profileSchema)