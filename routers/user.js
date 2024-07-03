const express = require('express');
const router= express.Router();
const {Authenticate} = require('../middleware/authMiddleware')
const {getSmartLinkHandler} = require('../controllers/user');

router.get('/smartlinks',Authenticate,getSmartLinkHandler);

module.exports= router;