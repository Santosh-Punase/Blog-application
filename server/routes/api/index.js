const router = require('express').Router();

router.use('/blogs', require('./blogArticles'));

module.exports = router;