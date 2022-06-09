const Playlist = require('../models/Playlist');

const PlaylistController = {
  getAllPlaylists: async (ctx) => {
    const {} = ctx.res
    const playlists = await Playlist.find();

    ctx.res = { playlists }
  }
}

module.exports = PlaylistController