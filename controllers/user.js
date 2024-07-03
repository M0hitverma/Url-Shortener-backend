const urlModel = require("../models/urlSchema");

const getSmartLinkHandler = async (req, res) => {
  try {
    
    const smartLinks = await urlModel.find({userId: req.userId});
    
    return res
      .status(200)
      .json({ ok: true, message: "Success", data: smartLinks });
  } catch {
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};
module.exports = { getSmartLinkHandler };
