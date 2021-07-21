import mongoose from 'mongoose'

export {
  Profile
}

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
    recommendations: [String]
  }, {
    timestamps: true
  }
)

const Profile = mongoose.model('Profile', profileSchema)