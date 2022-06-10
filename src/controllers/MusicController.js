const Music = require('../models/Music');

const MusicController = {
  getAllMusics: async (ctx) => {
    const musics = await Music.find();

    ctx.res = { musics }
  },

  GetAllMusicsByPlaylist: async (ctx) => {
    const { id } = ctx.req;
    const musics = await Music.find({ playlistIds: { $in: id }});

    ctx.res = { musics }
  }
}

module.exports = MusicController