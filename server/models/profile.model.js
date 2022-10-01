const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  avatar: String,
  bio: String,
  socials: [
    {
      name: String,
      link: String,
    },
  ],
  contact: String
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile