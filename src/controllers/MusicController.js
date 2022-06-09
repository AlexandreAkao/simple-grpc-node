const Music = require('../models/Music');

const MusicController = {
  getAllMusics: async (ctx) => {
    const musics = await Music.find();

    ctx.res = { musics }
  }
}

module.exports = MusicController