const express = require("express");
const router = express.Router();
var SpotifyWebApi = require("spotify-web-api-node");
const spotify = require("./Spotify/authorization");
const axios = require("axios");

let accessToken;
let refreshToken;

router.get("/authorize", (req, res) => {
  var scope = spotify.scopes;
  var authorizeURL = spotify.spotifyApi.createAuthorizeURL(scope);
  res.send({ url: authorizeURL });
});

router.get("/callback", (req, res) => {
  code = req.query.code;

  spotify.spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      spotify.spotifyApi.setAccessToken(data.body["access_token"]);
      accessToken = data.body["access_token"];
      spotify.spotifyApi.setRefreshToken(data.body["refresh_token"]);
      refreshToken = data.body["refresh_token"];
      res.redirect("http://localhost:3000");
    })

    .catch((err) => {
      console.log("houston, something something problem", err);
    });
});

router.get("/search", (req, res) => {
  spotify.spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log("refreshed access token");
      spotify.spotifyApi.setAccessToken(data.body["access_token"]);
    })
    .catch((err) => console.log(err));

  spotify.spotifyApi
    .searchArtists(req.query.search)
    .then((data) => res.send(data.body.artists.items))
    .catch((err) => console.log(err));
});

router.get("/getTopSongs", (req, res) => {
  spotify.spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log("refreshed access token");
      spotify.spotifyApi.setAccessToken(data.body["access_token"]);
    })
    .catch((err) => console.log(err));

  spotify.spotifyApi
    .getArtistTopTracks(req.query.artist, "US")
    .then((data) => res.send(data.body.tracks))
    .catch((err) => console.log(err));
});

router.get("/fullSearch", (req, res) => {
  let artist = req.query.artist;
  let song = req.query.track;
  let instrumentalness;
  let acousticness;
  let danceability;
  let energy;
  let loudness;
  let valence;
  let mode;
  let tempo;

  if (req.query.instrumentalness) instrumentalness = req.query.instrumentalness;
  if (req.query.acousticness) acousticness = req.query.acousticness;
  if (req.query.danceability) danceability = req.query.danceability;
  if (req.query.energy) energy = req.query.energy;
  if (req.query.loudness) loudness = req.query.loudness;
  if (req.query.valence) valence = req.query.valence;
  if (req.query.mode) mode = req.query.mode;
  if (req.query.tempo) tempo = req.query.tempo;

  spotify.spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log("refreshed access token");
      accessToken = data.body["access_token"];
      spotify.spotifyApi.setAccessToken(data.body["access_token"]);

      const headers = { Authorization: `Bearer ${accessToken}` };
      let request = `https://api.spotify.com/v1/recommendations?limit=20&seed_artists=${artist}&seed_tracks=${song}`;

      if (instrumentalness)
        request += `&target_instumentalness=${instrumentalness}`;
      if (acousticness) request += `&target_acousticness=${acousticness}`;
      if (danceability) request += `&target_danceability=${danceability}`;
      if (energy) request += `&target_energy=${energy}`;
      if (loudness) request += `&target_loudness=${loudness}`;
      if (valence) request += `&target_valence=${valence}`;
      if (mode) request += `&target_mode=${mode}`;
      if (tempo) request += `&target_tempo=${tempo}`;

      axios
        .get(request, { headers: headers })
        .then((response) => res.send(response.data.tracks))
        .catch((err) => console.log(err));
    })

    .catch((err) => console.log(err));
});

module.exports = router;
