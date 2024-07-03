const express = require('express');
const router = express.Router();
const {signInHandler, signUpHandler, checkAuthHandler, logoutHandler}= require("../controllers/authentication");
const {Authenticate} = require("../middleware/authMiddleware");
router.post("/signup",signUpHandler);

router.post("/signin",signInHandler);
router.post("/",Authenticate,checkAuthHandler);
router.post("/logout",logoutHandler);
module.exports = router;