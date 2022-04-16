module.exports.validateKey = async (req, res, next) => {

  const key = req.query.key;

  if (key) {

    if (key == process.env.BREMEA_DEV_KEY || key == process.env.DECCA_KEY || key == process.env.PUBLIC_KEY) next()

    else return res.status(403).json({
      error: "Forbidden: Invalid key"
    })

  }else {

    return res.status(403).json({
      error: "Forbidden: Missing key"
    })

  }

}