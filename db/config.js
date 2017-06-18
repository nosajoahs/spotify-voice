const Sequelize = require('sequelize');

const db = new Sequelize('spotifyVoice', 'root', '1111', {
  dialect: 'mysql'
});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Song = db.define('song', {
  title: Sequelize.STRING,
  artist: Sequelize.STRING,
  album: Sequelize.STRING,
  preview_url: Sequelize.STRING,
  url: Sequelize.STRING,
  album_image: Sequelize.STRING
});


Song.sync();
//Song.sync({force: true})

module.exports = {
  Song: Song
}

