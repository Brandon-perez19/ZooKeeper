const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');

//two different ways to write
router.use(animalRoutes);
router.use(require('./zooKeeperRoutes'));

module.exports = router;