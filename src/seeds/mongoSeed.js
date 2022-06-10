require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const User = require('../models/User');
const Music = require('../models/Music');
const Playlist = require('../models/Playlist');

const factoryUser = () => {
  const user = {
    name: faker.name.findName(),
    age: faker.datatype.number({ min: 5, max: 80 })
  }

  return user;
}

const factoryMusic = () => {
  const music = {
    name: faker.music.songName(),
    artist: faker.name.findName(),
  }

  return music;
}

const factoryPlaylist = (userId) => {
  const playlist = {
    name: faker.music.songName(),
    userId
  }

  return playlist;
}

const createUsers = async (quantity = 100) => {
  const users = [];
  for (let i = 0; i < quantity; i++) users.push(factoryUser());
  await User.insertMany(users);
}

const createMusics = async (quantity = 100) => {
  const musics = [];
  for (let i = 0; i < quantity; i++) musics.push(factoryMusic());
  await Music.insertMany(musics);
}

const createPlaylist = async (quantity = 100) => {
  const playlist = [];
  
  const users = await User.find();
  const userSize = users.length;

  for (let i = 0; i < quantity; i++) {
    const index = Math.trunc(Math.random() * userSize);
    const id = users[index]._id;
    playlist.push(factoryPlaylist(id));
  }

  await Playlist.insertMany(playlist);
}

const bindMusicToPlaylist = async () => {
  console.log('starting binding...')
  const musics = await Music.find();
  const playlists = await Playlist.find();
  
  for (let i = 0; i < musics.length; i++) {
    const quantity = Math.trunc(Math.random() * 100);
    const playlistIds = [];
    const playListIndex = [];
    
    for (let j = 0; j < quantity; j++) {
      let index = Math.trunc(Math.random() * 100);

      while (playListIndex.includes(index)) {
        index = Math.trunc(Math.random() * 100);
      }

      playListIndex.push(index);
    }

    for (let j = 0; j < quantity; j++) {
      const playlistId = playlists[playListIndex[j]]._id
      playlistIds.push(playlistId);
    }

    await Music.findByIdAndUpdate(musics[i]._id, { playlistIds });
  }
  console.log('finished binding...')
}

const run = async () => {
  await Promise.all([
    createUsers(),
    createMusics()
  ]) 
  
  await createPlaylist();
  console.log('Created 100 users');
  console.log('Created 100 Musics');
  console.log('Created 100 Playlist');
}

const clear = async () => {
  await Playlist.deleteMany();
  await User.deleteMany();
  await Music.deleteMany();
  console.log('Delete all document ☢');
}

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('error', (err) => console.log(`connection error: ${err}`));
mongoose.connection.on('disconnected', () => console.log('Application desconnected to database'));
mongoose.connection.on('connected', async () => {
  console.log('Application connected to database')
  await clear();
  await run();
  await bindMusicToPlaylist();
  process.exit(0);
});

