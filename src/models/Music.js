const mongoose = require("mongoose");

const MusicSchema = new mongoose.Schema({
  name: String,
  artist: String,
  playlistIds: {
    type: [mongoose.Types.ObjectId],
    default: [],
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Music', MusicSchema);