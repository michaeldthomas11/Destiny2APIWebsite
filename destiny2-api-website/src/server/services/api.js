const express = require('express');
const router = express.Router();

// Define routes
router.use('/reddit', require('./reddit'));
router.use('/forums', require('./forums'));
router.use('/search', require('./search'));

// GET api listing.
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
