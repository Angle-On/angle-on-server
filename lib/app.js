const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({ origin: true, credentials: true }));
// app.use(cors());
// app.use(cors({ origin: 'https://dazzling-heyrovsky-02bd75.netlify.app/' }));
app.use(express.json());



app.use('/api/v1/images', require('./controllers/images'));
app.use('/api/v1/directors', require('./controllers/directors'));
app.use('/api/v1/donations', require('./controllers/donations'));
app.use('/api/v1/films', require('./controllers/films'));
app.use('/api/v1/investors', require('./controllers/investors'));
app.get('/', (req, res) => {
  res.json('you are at 7890');
});



app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));



module.exports = app;
