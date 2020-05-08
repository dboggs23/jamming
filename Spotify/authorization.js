var SpotifyWebApi = require('spotify-web-api-node');

var scopes = ['user-read-private', 'user-read-email'];

var spotifyApi = new SpotifyWebApi({
  clientId: 'e0af8ba8d13f46a582acefc2d0507bf2',
  clientSecret: '54fd3332fc4d41b985eeef6296d11563',
  redirectUri: 'http://localhost:3000'
});

let authorizeURL = spotifyApi.createAuthorizeURL(scopes);



let Spotify = {
    scopes: ['user-read-private', 'user-read-email'],
    spotifyApi: spotifyApi
}

module.exports = Spotify