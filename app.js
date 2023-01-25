/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const express = require('express'); // Express web server framework
// const app = express();
var request = require('request'); // "Request" library
var cookieParser = require('cookie-parser');
const port = 8888;
var cors = require('cors');
var querystring = require('querystring');
const axios = require('axios');
require('dotenv').config(); // to store client variables

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
// const generateRandomString = (length) => {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };
// const stateKey = 'spotify_auth_state';
// app.get('/login', (req, res) => {
//   const state = generateRandomString(16);
//   res.cookie(stateKey, state);
//   // scope is the permissions we are requesting from the user
//   const scope =
//     'playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public user-read-private user-read-email user-read-playback-state user-top-read user-library-read user-read-recently-played';
//   const queryParams = querystring.stringify({
//     client_id: CLIENT_ID,
//     response_type: 'code',
//     redirect_uri: REDIRECT_URI,
//     state: state,
//     scope: scope,
//   });

//   res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
// });
// // callback route to handle the response from spotify
// app.get('/callback', (req, res) => {
//   const code = req.query.code || null;
//   axios({
//     method: 'post',
//     url: 'https://accounts.spotify.com/api/token',
//     data: querystring.stringify({
//       grant_type: 'authorization_code',
//       code: code,
//       redirect_uri: REDIRECT_URI,
//     }),
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
//         'base64'
//       )}`,
//     },
//   })
//     .then((response) => {
//       if (response.status === 200) {
//         const { access_token, refresh_token, expires_in } = response.data;

//         const queryParams = querystring.stringify({
//           access_token,
//           refresh_token,
//           expires_in,
//         });

//         res.redirect(`http://localhost:3000/?${queryParams}`);
//       } else {
//         res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
//       }
//     })
//     .catch((error) => {
//       res.send(error);
//     });
// });
// // refresh token route to handle the response from spotify
// app.get('/refresh_token', (req, res) => {
//   const { refresh_token } = req.query;
//   axios({
//     method: 'post',
//     url: 'https://accounts.spotify.com/api/token',
//     data: querystring.stringify({
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token,
//     }),
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
//         'base64'
//       )}`,
//     },
//   })
//     .then((response) => {
//       res.send(response.data);
//     })
//     .catch((error) => {
//       res.send(error);
//     });
// });
// app.listen(port, () => {
//   console.log(`Express app listening at http://localhost:${port}`);
// });
// /**
//  * Generates a random string containing numbers and letters
//  * @param  {number} length The length of the string
//  * @return {string} The generated string
//  */
var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app
  .use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());

app.get('/login', function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope =
    'playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public user-read-private user-read-email user-read-playback-state user-top-read user-library-read user-read-recently-played';
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state,
      })
  );
});

app.get('/callback', function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      'http://localhost:3000/#' +
        querystring.stringify({
          error: 'state_mismatch',
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization:
          'Basic ' + new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          'http://localhost:3000/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          'http://localhost:3000/#' +
            querystring.stringify({
              error: 'invalid_token',
            })
        );
      }
    });
  }
});

app.get('/refresh_token', function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' + new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

console.log('Listening on 8888');
app.listen(8888);
