// central hub to pull all of the routes together

const express = require('express');
const router = express.Router();

// call for the router to use the specific routes
router.use(require('./candidateRoutes'));
router.use(require('./partyRoutes'));

module.exports = router;