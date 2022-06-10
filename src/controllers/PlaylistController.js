const Music = require('../models/Music');
const Playlist = require('../models/Playlist');

const PlaylistController = {
  getAllPlaylistsByUser: async (ctx) => {
    const { id: userId } = ctx.req;
    const playlists = await Playlist.find({ userId });

    ctx.res = { playlists }
  },

  getAllPlaylistsByMusic: async (ctx) => {
    const { id } = ctx.req;
    const music = await Music.findById(id);
    
    const playlists = await Playlist.find({ _id: { $in: music.playlistIds }});

    ctx.res = { playlists }
  }
}

module.exports = PlaylistController