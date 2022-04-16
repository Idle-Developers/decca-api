const router = require('express').Router();
const canvas = require('canvas');
const { registerFont } = require('canvas');
const jimp = require('jimp');
const { AwesomeQR } = require("awesome-qr");

router.get('/drip', async (req, res) => {

  const imageUrl = req.query.imgUrl;

  if (!imageUrl) return res.json({

    message: 'Missing imgUrl param'

  })

  let toLayer;
  try {
    toLayer = await canvas.loadImage(imageUrl);
  } catch (err) {
    return res.status(400).json({
      message: 'Failed to load image.'
    });
  };

  const drip = await canvas.loadImage("/home/runner/api/api/assets/images/drip.png");

  const Canvas = canvas.createCanvas(867, 892)
  const ctx = Canvas.getContext('2d');

  let x = 97;
  let y = 0;
  ctx.drawImage(drip, x, y)

  x = 370;
  y = 220;

  ctx.drawImage(toLayer, x, y, 128, 128)
  res.set({ 'Content-Type': 'image/png' });
  res.status(200).send(Canvas.toBuffer());
})

router.get('/bonk', async (req, res) => {
  const imageUrl = req.query.imgUrl;

  if (!imageUrl) return res.json({

    message: 'Missing imgUrl param'

  })

  let toLayer;
  try {
    toLayer = await canvas.loadImage(imageUrl);
  } catch (err) {
    return res.status(400).json({
      message: 'Failed to load image.'
    });
  };

  const bonk = await canvas.loadImage("/home/runner/api/api/assets/images/bonk.png");

  const Canvas = canvas.createCanvas(364, 228)
  const ctx = Canvas.getContext('2d');

  let x = 97;
  let y = 0;
  ctx.drawImage(bonk, x, y)

  x = 230;
  y = 160;

  ctx.drawImage(toLayer, x, y, 128, 128)
  res.set({ 'Content-Type': 'image/png' });
  res.status(200).send(Canvas.toBuffer());
})

router.get('/makememe', async (req, res) => {

  const imageUrl = req.query.imgUrl;
  const topText = req.query.topTxt;
  const bottomText = req.query.botTxt;
  const type = req.query.type;

  if (!imageUrl) return res.json({

    message: 'Missing imgUrl param'

  })

  if (!topText) return res.json({

    message: 'Missing topTxt param'

  })

  if (!bottomText) return res.json({

    message: 'Missing botTxt param'

  })

  let toLayer;
  try {
    toLayer = await canvas.loadImage(imageUrl);
  } catch (err) {
    return res.status(400).json({
      message: 'Failed to load image.'
    });
  };

  if (!type || type === "1") {

    const Canvas = canvas.createCanvas(400, 256 + 80)

    const ctx = Canvas.getContext('2d');

    ctx.fillStyle = "black";

    ctx.fillRect(0, 0, 400, 256 + 80);

    let x = 75;

    let y = 40;

    ctx.drawImage(toLayer, x, y, 256, 256)

    ctx.font = '20px impact';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(addNewlines(topText.toUpperCase(), 40), (400 / 2), 25);
    ctx.fillText(addNewlines(bottomText.toUpperCase(), 40), (400 / 2), 256 + 40 + 25)

    res.set({ 'Content-Type': 'image/png' });
    res.status(200).send(Canvas.toBuffer());

  }else if (type === "2") {

    const Canvas = canvas.createCanvas(256, 256)

    const ctx = Canvas.getContext('2d');

    let x = 0;

    let y = 0;

    ctx.drawImage(toLayer, x, y, 256, 256)

    ctx.font = '20px impact';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    x = 256 / 2;

    y = 25;

    ctx.fillText(addNewlines(topText.toUpperCase(), 40), x, y);

    y = 250;

    ctx.fillText(addNewlines(bottomText.toUpperCase(), 40), x, y)

    res.set({ 'Content-Type': 'image/png' });
    res.status(200).send(Canvas.toBuffer());
  }

})

router.get('/brain', async (req, res) => {
  const imageUrl = req.query.imgUrl;

  if (!imageUrl) return res.json({

    message: 'Missing imgUrl param'

  })

  let toLayer;
  try {
    toLayer = await canvas.loadImage(imageUrl);
  } catch (err) {
    return res.status(400).json({
      message: 'Failed to load image.'
    });
  };

  const brain = await canvas.loadImage("/home/runner/api/api/assets/images/bigbrain.jpg");

  const Canvas = canvas.createCanvas(239, 211)
  const ctx = Canvas.getContext('2d');

  let x = 0;
  let y = 0;
  ctx.drawImage(brain, x, y)

  x = 170;
  y = 135;

  ctx.drawImage(toLayer, x, y, 64, 64)
  res.set({ 'Content-Type': 'image/png' });
  res.status(200).send(Canvas.toBuffer());
})

router.get('/bright', async (req, res) => {
  const imageUrl = req.query.imgUrl;

  if (!imageUrl) return res.json({
    error: 'Missing imgUrl param!'
  })

  let val = req.query.val;

  if (!val) return res.json({
    error: 'Missing val param!'
  })

  val = Number(val) || parseInt(val);

  if (val != 0 && !val) return res.status(400).json({
    error: 'val param is not a number.'
  });

  if (val > 1 || val < -1) {
    return res.status(400).json({
      error: true,
      message: 'val param must have a value of -1 to +1.'
    });
  };

  let img;
  try {
    img = await jimp.read(imageUrl);
  } catch (err) {
    return res.status(400).json({
      message: 'Failed to load image.'
    });
  };

  img.brightness(val);
  res.set({ 'Content-Type': 'image/png' });
  res.status(200).send(await img.getBufferAsync('image/png'));
})

router.get('/contrast', async (req, res) => {
  const imageUrl = req.query.imgUrl;

  if (!imageUrl) return res.json({
    error: 'Missing imgUrl param!'
  })

  let val = req.query.val;

  if (!val) return res.json({
    error: 'Missing val param!'
  })

  val = Number(val) || parseInt(val);

  if (val != 0 && !val) return res.status(400).json({
    error: 'val param is not a number.'
  });

  if (val > 1 || val < -1) {
    return res.status(400).json({
      error: true,
      message: 'val param most have a value of -1 to +1.'
    });
  };

  let img;
  try {
    img = await jimp.read(imageUrl);
  } catch (err) {
    return res.status(400).json({
      message: 'Failed to load image.'
    });
  };

  img.contrast(val);
  res.set({ 'Content-Type': 'image/png' });
  res.status(200).send(await img.getBufferAsync('image/png'));
})

router.get('/invert', async (req, res) => {
  const imageUrl = req.query.imgUrl;

  if (!imageUrl) return res.json({
    error: 'Missing imgUrl param!'
  })

  let img;
  try {
    img = await jimp.read(imageUrl);
  } catch (err) {
    return res.status(400).json({
      message: 'Failed to load image.'
    });
  };

  img.invert();
  res.set({ 'Content-Type': 'image/png' });
  res.status(200).send(await img.getBufferAsync('image/png'));
})

router.get('/circle', async (req, res) => {
  const imageUrl = req.query.imgUrl;

  if (!imageUrl) return res.status(400).json({
    message: 'Missing imgUrl param'
  });

  let img;
  try {
    img = await jimp.read(imageUrl);
  } catch (err) {
    return res.status(400).json({
      message: 'Failed to load image.'
    });
  };

  img.circle();
  res.set({ 'Content-Type': 'image/png' });
  res.status(200).send(await img.getBufferAsync('image/png'));
});

router.get('/blur', async (req, res) => {

  const image = req.query.imgUrl;

  const r = req.query.r;

  if (!image) return res.json({
    error: "Missing imgUrl param!"
  })

  let img;

  try {

    img = await jimp.read(image);

  } catch (err) {

    return res.json({
      error: "Couldn't read image"
    })

  }

  if (r && isNaN(r) || r < 0) return res.json({
    error: "r param must be a number higher than 0"
  })

  img.blur(parseInt(r) || 5);

  res.set({ 'Content-Type': 'image/png' });
  res.status(200).send(await img.getBufferAsync('image/png'));
})

router.get('/pixel', async (req, res) => {
  const imageUrl = req.query.imgUrl;

  if (!imageUrl) return res.json({
    message: 'Missing imgUrl param!'
  })

  const val = req.query.val;

  let img;

  try {
    img = await jimp.read(imageUrl);
  } catch (err) {
    return res.status(400).json({
      message: 'Failed to load image.'
    });
  };

  img.pixelate(Number(val) || 10);
  res.set({ 'Content-Type': 'image/png' });
  res.status(200).send(await img.getBufferAsync('image/png'));
})

router.get('/yankee', async (req, res) => {
  const imageUrl = req.query.imgUrl;

  if (!imageUrl) return res.json({

    message: 'Missing imgUrl param'

  })

  let toLayer;
  try {
    toLayer = await canvas.loadImage(imageUrl);
  } catch (err) {
    return res.status(400).json({
      message: 'Failed to load image.'
    });
  };

  const yankee = await canvas.loadImage("/home/runner/api/api/assets/images/yankee.png");

  const Canvas = canvas.createCanvas(256, 256)
  const ctx = Canvas.getContext('2d');

  let x = 0;
  let y = 0;
  ctx.drawImage(toLayer, x, y, 256, 256)

  x = 95;
  y = 20;

  ctx.drawImage(yankee, x, y, 64, 64)
  res.set({ 'Content-Type': 'image/png' });
  res.status(200).send(Canvas.toBuffer());
})

router.get('/sus', async (req, res) => {
  const imageUrl = req.query.imgUrl;

  if (!imageUrl) return res.json({

    message: 'Missing imgUrl param'

  })

  let toLayer;
  try {
    toLayer = await canvas.loadImage(imageUrl);
  } catch (err) {
    return res.status(400).json({
      message: 'Failed to load image.'
    });
  };

  const red = await canvas.loadImage("/home/runner/api/api/assets/images/red.png");

  const Canvas = canvas.createCanvas(4419, 4252)
  const ctx = Canvas.getContext('2d');

  let x = 0;
  let y = 0;
  ctx.drawImage(red, x, y, 4419, 4252)

  x = 1650;
  y = 1400;

  ctx.globalAlpha = 0.7;
  ctx.drawImage(toLayer, x, y, 1000, 500)

  res.set({ 'Content-Type': 'image/png' });
  res.status(200).send(Canvas.toBuffer());
});

router.get('/qr', async (req, res) => {

  const string = req.query.string;

  const bgImg = req.query.bgImg;

  if (!string) return res.json({
    message: 'Missing string param!'
  })

  if (typeof string !== "string") return res.json({
    message: 'Invalid string param!'
  })

  let buffer;

  if (!bgImg) {

    buffer = await new AwesomeQR({
      text: string,
      size: 500,
    }).draw();

  } else {

    buffer = await new AwesomeQR({
      text: string,
      size: 500,
      backgroundImage: bgImg
    }).draw();

  }

  res.set({ "Content-Type": "image/png" });

  res.status(200).send(buffer)
})

router.get('/afvsae', async (req, res) => {

  const f1 = req.query.f1;
  const f2 = req.query.f2;

  if (!f1) return res.json({
    error: "Missing f1 param!"
  })

  if (!f2) return res.json({
    error: "Missing f2 param!"
  })

  const template = await canvas.loadImage("/home/runner/api/api/assets/images/avg_fan_vs_avg_enjoyer.png");

  const Canvas = canvas.createCanvas(332, 330);

  const ctx = Canvas.getContext('2d');

  let x = 0;

  let y = 0;

  ctx.drawImage(template, x, y, 332, 330);

  ctx.font = "18px impact";

  ctx.fillStyle = "black";

  x = 10;

  y = 20;

  ctx.fillText(addNewlines(f1, 20), x, y);

  x = 170;

  ctx.fillText(addNewlines(f2, 20), x, y);

  res.set({ 'Content-Type': 'image/png' });
  res.status(200).send(Canvas.toBuffer());

})

router.get('/gun', async (req, res) => {
  const imgUrl = req.query.imgUrl;

  if (!imgUrl) return res.json({
    error: "Missing imgUrl param!"
  })

  let img;

  try{

    img = await canvas.loadImage(imgUrl)

  }catch(e){

    return res.json({
      error: "Couldn't load image"
    })

  }

  const Canvas = canvas.createCanvas(img.width, img.height);
  const ctx = Canvas.getContext('2d');

  let x = 0;

  let y = 0;

  ctx.drawImage(img, x, y);

  const base = await canvas.loadImage("/home/runner/api/api/assets/images/gun.png");

  const ratio = (img.height / 2) / base.height;
	const width = base.width * ratio;

  x = img.width - width;

  y = img.height - (img.height / 2);

  ctx.drawImage(base, x, y, width, img.height / 2);

  res.set({ 'Content-Type': 'image/png' });
  res.status(200).send(Canvas.toBuffer());
})

router.get('/ping', async (req, res) => {
  const imgUrl = req.query.imgUrl;

  if (!imgUrl) return res.json({
    error: "Missing imgUrl param!"
  })

  let img;

  try{

    img = await canvas.loadImage(imgUrl)

  }catch(e){

    return res.json({
      error: "Couldn't load image"
    })

  }

  const Canvas = canvas.createCanvas(256, 256);
  const ctx = Canvas.getContext('2d');

  let x = 0;

  let y = 0;

  ctx.drawImage(img, x, y, 256, 256);

  const base = await canvas.loadImage("/home/runner/api/api/assets/images/ping.png");

  x = 256 - 80;

  y = 256 - 75;

  ctx.drawImage(base, x, y, 64, 64);

  res.set({ 'Content-Type': 'image/png' });
  res.status(200).send(Canvas.toBuffer());
})

// functions

function addNewlines(str, amount) {
  var result = '';
  while (str.length > 0) {
    result += str.substring(0, amount) + '\n';
    str = str.substring(amount);
  }
  return result;
}

// fonts

registerFont('/home/runner/api/api/assets/fonts/impact.ttf', { family: 'impact' });

module.exports = router;