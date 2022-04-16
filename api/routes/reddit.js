const router = require('express').Router()
const got = require('got');

router.get('/', async (req, res) => {

  const reddit = req.query.sub;

  if (!reddit) return res.send({
    error: "Provide a subreddit!"
  })

  let red;

  try {

    red = await got(`https://www.reddit.com/r/${reddit}/random/.json`)

  } catch (e) {

    return res.send({
      error: 'Subreddit not found'
    })

  }

  const content = JSON.parse(red.body)

  try {

    res.send({
    title: content[0].data.children[0].data.title,
    imgURL: content[0].data.children[0].data.url,
    ups: content[0].data.children[0].data.ups,
    downs: content[0].data.children[0].data.downs,
    commentsCount: content[0].data.children[0].data.num_comments
  })

  }catch(err) {

    return res.send({
      error: 'Subreddit not found!'
    })

  }


})

module.exports = router;