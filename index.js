const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const UrlRoute = require("./routers/url");
const AuthRoute = require("./routers/auth");
const UserRoute = require("./routers/user");
const urlModel = require("./models/urlSchema");

require("dotenv").config();
app.use(bodyParser.json());
app.use(express.json());

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  })
);
app.use(cookieParser());

require("./db");
app.get("/", (req, res) => {
  return res.status(200).json({ message: "success" });
});
app.use("/url", UrlRoute);
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.get("/:id", async (req, res) => {
  const shortId = req.params.id;
  const urlobj = await urlModel.findOneAndUpdate(
    {
      shortId: shortId,
    },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!urlobj) {
    return res.status(400).json({ ok: false, message: "bad request" });
  }
  const originalURL = `https://${urlobj.originalUrl}`;

  return res.redirect(originalURL);
});

app.listen(process.env.PORT, () => {
  console.log("Server has Started");
});
