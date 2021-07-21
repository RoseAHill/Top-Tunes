import mongoose from 'mongoose'

export {
  User
}

const userSchema = new mongoose.Schema(
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

const User = mongoose.model('User', userSchema)