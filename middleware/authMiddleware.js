const jwt = require("jsonwebtoken");
require("dotenv").config();
const Authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res
        .status(401)
        .json({ ok: false, message: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.userId;
    next();
  } catch {
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

module.exports={Authenticate}
