const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use( '/api/profile/', require('./controllers/profiles'));

app.get('/', (req, res) => {
    res.json('you are at 7890');
  });

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));


module.exports = app;