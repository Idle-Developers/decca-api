require('dotenv').config();
const express = require('express');
const app = express();

const redditRoute = require('./routes/reddit');
const stringRoute = require('./routes/string');
const canvasRoute = require('./routes/canvas');
const extraRoute = require('./routes/extra');
const discordRoute = require('./routes/discord');

const middleware = require('./util/middleware');

app.use("/public", express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.redirect('https://docs.api.decc00n.tk/')
})

app.get('/demo', (req, res) => {
  res.sendFile(__dirname + '/demo/index.html')
})

app.get('/server', (req, res) => {
  res.redirect('https://dsc.gg/decca')
})

app.use('/reddit', middleware.validateKey, redditRoute)

app.use('/string', middleware.validateKey, stringRoute)

app.use('/canvas', middleware.validateKey, canvasRoute)

app.use('/extra', middleware.validateKey, extraRoute)

app.use('/discord', middleware.validateKey, discordRoute)

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))