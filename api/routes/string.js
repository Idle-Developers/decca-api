const router = require('express').Router();
const translate = require("translate");

router.get('/reverse', (req, res) => {
  const string = req.query.string;

  if (!string || typeof string !== 'string') return res.send({
    error: "Provide a string!"
  })

  const split = string.split('');
  const reversed = split.reverse();
  const response = reversed.join('')

  res.status(200).send({ response })
})

router.get('/mock', (req, res) => {
  const string = req.query.string;

  if (!string || typeof string !== 'string') return res.send({
    error: "Provide a string!"
  })

  const response = string
    .split("")
    .map((character, index) =>
      index % 2 === 0 ? character.toLowerCase() : character.toUpperCase()
    )
    .join("")

  res.status(200).send({ response })
})

router.get('/randomid', (req, res) => {

  let id = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 14; i++) { id += possible.charAt(Math.floor(Math.random() * possible.length)); }

  res.json({ id })

})

module.exports = router;