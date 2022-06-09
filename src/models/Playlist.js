const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  name: String,
  userId: mongoose.Types.ObjectId
}, {
  timestamps: true,
});

module.exports = mongoose.model('Playlist', PlaylistSchema);