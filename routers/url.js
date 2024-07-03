const express = require("express");

const router= express.Router();
const {urlShortnerHandler,urlVisitedAnalyticsHandler} = require('../controllers/url');
const {Authenticate} = require('../middleware/authMiddleware');
router.post('/',Authenticate, urlShortnerHandler);

router.get('/analytics/:id',urlVisitedAnalyticsHandler)

module.exports= router;