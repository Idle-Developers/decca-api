const router = require('express').Router();
const trivia = require('../storage/trivia.json');
const ftl = require('../storage/ftl.json');

router.get('/trivia', (req, res) => {
  const resp = trivia[Math.floor(Math.random() * trivia.length)];

  res.status(200).send(resp)
})

router.get('/ftl', (req, res) => {
  const resp = ftl[Math.floor(Math.random() * ftl.length)];

  res.status(200).send(resp)
})

module.exports = router;