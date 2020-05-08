const express = require('express')
const router = express.Router()
//var SpotifyWebApi = require('spotify-web-api-node');
const spotify = require('./Spotify/authorization')

var showDialog = true

router.get('/authorize', (req, res) => {
    var scope = spotify.scopes;
    var authorizeURL = spotify.spotifyApi.createAuthorizeURL(scope)
    res.send({url: authorizeURL})
      
  })

  
  /*router.get('/callback', function(req, res) {
     // console.log(req.params)
    var code = req.params.code;
    console.log('\ncode:', code, '\n');
     spotify.spotifyApi.authorizationCodeGrant(code).then(
       function(data) {
         console.log('The access token expires in ' + data.body['expires_in']);
         console.log('The access token is ' + data.body['access_token']);
  
         spotify.spotifyApi.setAccessToken(data.body['access_token']);
         spotify.spotifyApi.setRefreshToken(data.body['refresh_token']);
  
         tokenExpiration = new Data().getTime()/1000 + data.body['expires_in'];
         login = 0;
       },
       function(err) {
         console.log('Could not login!', err);
       }
     );
    if(login == 0){
      res.redirect('/#' +
      querystring.stringify({
        access_token: spotify.spotifyApi.getAccessToken(),
        refresh_token: spotify.spotifyApi.getRefreshToken()
      }));
    }else{
      res.redirect('/');
    }
  });*/

  router.get("/callback", function (request, response) {
      console.log('hit callback')
    var authorizationCode = request.query.code;
    console.log(authorizationCode)
    
    spotify.spotifyApi.authorizationCodeGrant(authorizationCode)
    .then(function(data) {
      console.log(data)
      response.send(`/#access_token=${data.body['access_token']}&refresh_token=${data.body['refresh_token']}`)
    }, function(err) {
      console.log('Something went wrong when retrieving the access token!', err.message);
    })
  })

  /*router.get('/myendpoint', function (request, response) {
    var loggedInSpotifyApi = new SpotifyWebApi();
    console.log(request.headers['authorization'].split(' ')[1]);
    loggedInSpotifyApi.setAccessToken(request.headers['authorization'].split(' ')[1]);
    // Search for a track!
    loggedInSpotifyApi.getMyTopTracks()
      .then(function(data) {
        console.log(data.body);
        response.send(data.body);
      }, function(err) {
        console.error(err);
      });
    
  });*/



module.exports = router