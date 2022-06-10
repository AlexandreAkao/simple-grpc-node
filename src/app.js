const Mali = require('mali');
const path = require('path');
const mongoose = require('mongoose');

const userController = require('./controllers/UserController');
const musicController = require('./controllers/MusicController');
const playlistController = require('./controllers/PlaylistController');

class App {
  constructor() {
    this.PROTO_PATH = path.resolve(__dirname, 'protos', 'streaming.proto');
    this.server = new Mali(this.PROTO_PATH, 'Streaming')
    
    this.database();
    this.routes();
  }

  database() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL)

    mongoose.connection.on('error', (err) => console.log(`connection error: ${err}`));
    mongoose.connection.on('disconnected', () => console.log('Application desconnected to database'));
    mongoose.connection.on('connected', () => console.log('Application connected to database'));
  }

  routes() {
    this.server.use(userController);
    this.server.use(musicController);
    this.server.use(playlistController);
  }
}

module.exports = new App().server;