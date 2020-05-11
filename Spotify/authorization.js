var SpotifyWebApi = require('spotify-web-api-node');

var scopes = ['user-read-private', 'user-read-email'];

var spotifyApi = new SpotifyWebApi({
  clientId: '',
  clientSecret: '',
  redirectUri: ''
})



let Spotify = {
    scopes: ['user-read-private', 'user-read-email'],
    spotifyApi: spotifyApi
}

module.exports = Spotify