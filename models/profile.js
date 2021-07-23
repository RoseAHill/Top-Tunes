import mongoose from 'mongoose'

export {
  Profile
}

const profileSchema = new mongoose.Schema(
  {
    token: String,
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
    recs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rec'
    }]
  }, {
    timestamps: true
  }
)

const Profile = mongoose.model('Profile', profileSchema)