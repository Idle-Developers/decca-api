const router = require('express').Router();
const canvas = require('canvas');
const jimp = require('jimp');

router.get('/welcome', async (req, res) => {

  const bgImg = req.query.bgImg;

  const topTxt = req.query.topTxt;

  const botTxt = req.query.botTxt;

  const avatar = req.query.avatar;

  const username = req.query.username;

  const txtColor = req.query.txtColor;

  if (!bgImg) return res.json({
    error: "Missing bgImg param"
  })

  if (!topTxt) return res.json({
    error: "Missing topTxt param"
  })

  if (!botTxt) return res.json({
    error: "Missing botTxt param"
  })

  if (!avatar) return res.json({
    error: "Missing avatar param"
  })

  if (!username) return res.json({
    error: "Missing username param"
  })

  if (!txtColor) return res.json({
    error: "Missing txtColor param"
  })

  const Canvas = canvas.createCanvas(700, 300);
  const ctx = Canvas.getContext('2d');

  // Background

  let bg;

  try {

    bg = await canvas.loadImage(bgImg)

  } catch (err) {

    return res.json({
      error: "Couldn't load background image"
    })

  }

  let x = 0;

  let y = 0;

  ctx.drawImage(bg, x, y, 700, 300);

  // Avatar

  let pfp;

  try {

    pfp = await canvas.loadImage(avatar);

  } catch (e) {

    return res.json({
      error: "Couln't load avatar"
    })

  }

  x = Canvas.width / 2 - pfp.width / 2;

  y = 50;

  ctx.drawImage(pfp, x, y, 128, 128)

  // Top Text

  ctx.fillStyle = txtColor;
  ctx.font = "20px uni-heavy"

  x = 350;

  y = 50;

  ctx.textAlign = "center"
  ctx.fillText(topTxt, x, y)

  // Bottom Text

  ctx.fillStyle = txtColor;
  ctx.font = "20px uni-heavy"

  x = 350;

  y = 260;

  ctx.textAlign = "center"
  ctx.fillText(botTxt, x, y)

  // username

  ctx.fillStyle = txtColor || 'white';
  ctx.font = "15px uni-heavy";

  x = 350;

  y = 190;

  ctx.textAlign = "center";
  ctx.fillText(username, x, y)

  // Image serving

  res.set({ 'Content-Type': 'image/png' });
  res.status(200).send(Canvas.toBuffer());

})

router.get('/xp', async (req, res) => {

  const username = req.query.username;

  const avatar = req.query.avatar;

  const rank = req.query.rank;

  const level = req.query.level;

  const xp = req.query.xp;

  const xpNeeded = req.query.xpNeeded;

  const bgImg = req.query.bgImg;

  if (!username) return res.json({
    error: "Missing username param"
  });

  if (!avatar) return res.json({
    error: "Missing avatar param"
  });

  // if (!rank) return res.json({
  //   error: "Missing rank param"
  // });

  if (!level) return res.json({
    error: "Missing level param"
  });

  if (!xp) return res.json({
    error: "Missing xp param"
  });

  if (!xpNeeded) return res.json({
    error: "Missing xpNeeded param"
  });

  if (!bgImg) return res.json({
    error: "Missing bgImg param"
  });

  let bg;

  try {

    bg = await canvas.loadImage(bgImg);

  } catch (e) {

    return res.json({
      error: "Couldn't load bgImg"
    })

  }

  let av = `https://api.decc00n.tk/canvas/circle?key=${process.env.PUBLIC_KEY}&imgUrl=${avatar}`;

  let ava;

  try {

    ava = await canvas.loadImage(av);

  } catch (err) {

    return res.json({
      error: "Couldn't load avatar"
    })

  }

  let x = 0;

  let y = 0;

  const Canvas = canvas.createCanvas(934, 282);

  const ctx = Canvas.getContext('2d');

  // backhround

  ctx.drawImage(bg, x, y, 934, 282);

  // other background

  ctx.fillStyle = "#151716";

  // ctx.globalAlpha = 0.6;

  x = 50;

  y = 40;

  ctx.fillRect(x, y, 830, 200);

  // avatar

  x = 70;

  y = 60;

  ctx.drawImage(ava, x, y, 150, 150);

  // rank

  if (rank) {

    x = 530;

    y = 100;

    ctx.font = "30px uni-heavy";

    ctx.fillStyle = "white"

    ctx.fillText('Rank', x, y)

    x = 605;

    y = 100;

    ctx.font = "50px uni-heavy";

    ctx.fillStyle = "white";

    ctx.fillText(`#${rank}`, x, y)

  }

  // level

  x = 710;

  y = 100;

  ctx.font = "30px uni-heavy";

  ctx.fillStyle = "#eb4034";

  ctx.fillText('Level', x, y)

  x = 800;

  y = 100;

  ctx.font = "50px uni-heavy";

  ctx.fillStyle = "#eb4034";

  ctx.fillText(level, x, y)

  // username

  x = 260;

  y = 170;

  ctx.font = "40px uni-heavy";

  ctx.fillStyle = "white";

  ctx.fillText(username.replace("$", "#"), x, y)

  // xp

  x = 720;

  y = 170;

  ctx.font = "30px uni-heavy";

  ctx.fillStyle = "white";

  ctx.fillText(`${xp}/${xpNeeded} XP`, x, y)

  // progress bar

  x = 260;

  y = 200;

  ctx.beginPath();
  ctx.lineWidth = 0;
  ctx.strokeStyle = "#808080";
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y, 400, 7);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeRect(x, y, 400, 7);
  ctx.stroke();

  const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

  const random = Math.floor(Math.random() * (colors.length - 1))

  var grad = ctx.createLinearGradient(x, y, 400, 7);
  grad.addColorStop(0, colors[random]);
  grad.addColorStop(1, colors[random + 1])

  //red, orange, yellow, green, blue, indigo and violet

  ctx.fillStyle = grad;
  ctx.globalAlpha = 0.6;
  ctx.fillRect(x, y, ((100 / xpNeeded) * xp) * 4, 7)
  ctx.fill();
  ctx.globalAlpha = 1;

  res.set({ "Content-Type": "image/png" });

  res.status(200).send(Canvas.toBuffer())
})

// Fonts 

canvas.registerFont('/home/runner/api/api/assets/fonts/Uni Sans Heavy Italic.otf', { family: 'uni-heavy-italic' })

canvas.registerFont('/home/runner/api/api/assets/fonts/Uni Sans Heavy.otf', { family: 'uni-heavy' })

canvas.registerFont('/home/runner/api/api/assets/fonts/Uni Sans Thin Italic.otf', { family: 'uni-thi-italic' })

canvas.registerFont('/home/runner/api/api/assets/fonts/Uni Sans Thin.otf', { family: 'uni-thi' })

module.exports = router;
