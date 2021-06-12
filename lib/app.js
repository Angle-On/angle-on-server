const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use('/api/v1/images', require('./controllers/images'));
app.use('/api/v1/directors', require('./controllers/directors'));
app.use('/api/v1/donations', require('./controllers/donations'));
app.use('/api/v1/films', require('./controllers/films'));
app.use('/api/v1/investors', require('./controllers/investors'));
app.get('/', (req, res) => {
  res.json('you are at 7890');
});

// Getting the user from Google with the code
// app.get(`/${redirectURI}`, async (req, res) => {
//   const code = req.query.code as string;

//   const { id_token, access_token } = await getTokens({
//     code,
//     clientId: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     redirectUri: `${SERVER_ROOT_URI}/${redirectURI}`,
//   });

//    Fetch the user's profile with the access token and bearer
//    const googleUser = await axios
//    .get(
//      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
//      {
//        headers: {
//          Authorization: `Bearer ${id_token}`,
//        },
//      }
//    )
//    .then((res) => res.data)
//    .catch((error) => {
//      console.error(`Failed to fetch user`);
//      throw new Error(error.message);
//    });

//  const token = jwt.sign(googleUser, JWT_SECRET);

//  res.cookie(COOKIE_NAME, token, {
//    maxAge: 900000,
//    httpOnly: true,
//    secure: false,
//  });

//  res.redirect(UI_ROOT_URI);
// });

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
