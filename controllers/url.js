const { randomInt } = require("crypto");
const urlModel = require("../models/urlSchema");
const userModel = require("../models/userSchema");
function helper() {
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let shortId = "";
  for (let i = 0; i < 7; i++) {
    shortId += str[randomInt(0, 61)];
  }

  return shortId;
}

const urlShortnerHandler = async (req, res) => {
  try {

    const originalUrl = req.body.url;
    const urlTitle= req.body.title;
    const urlObj = await urlModel.findOne({ originalUrl: originalUrl });
    let shortUrl = process.env.ORIGIN;

    if (urlObj) {
      shortUrl += urlObj.shortId;
      return res
        .status(200)
        .json({
          ok: true,
          message: "Success",
          shortUrl: shortUrl,
        });
    }

    let shortId = null;

    do {
      shortId = helper();
      const urlobj = await urlModel.findOne({ shortId: shortId });
      if (urlobj) {
        shortId = null;
      }
    } while (shortId === null);

    shortUrl += shortId;

    const newUrlobj = new urlModel({
      originalUrl,
      shortId,
      userId: req.userId,
      title: urlTitle
    });
    const newUrl = await newUrlobj.save();

    await userModel.findOneAndUpdate(
      {
        _id: req.userId,
      },
      {
        $push: {
          links: newUrl._id,
        },
      }
    );

    res
      .status(200)
      .json({ ok: true, message: "Success", shortUrl: shortUrl, data: newUrl });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Server Side Error" });
  }
};

const urlVisitedAnalyticsHandler = async (req, res) => {
  const shortId = req.params.id;
  const urlObj = await urlModel.findOne({ shortId: shortId });
  if (!urlObj) {
    return res
      .status(400)
      .json({ message: `Url for ${shortId} does not exist` });
  }

  res
    .status(200)
    .json({ message: "success", visitedHistory: urlObj.visitedHistory });
};

module.exports = {
  urlShortnerHandler,
  urlVisitedAnalyticsHandler,
};
