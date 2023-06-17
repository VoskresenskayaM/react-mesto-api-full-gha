const router = require('express').Router();

const { notFound } = require('../controllers/main');

router.use('/*', notFound);
module.exports = router;
