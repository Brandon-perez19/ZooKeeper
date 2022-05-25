const { filteredByQuery, findById, createNewZookeeper, validateZooKeeper, } = require("../../lib/zookeepers");
const { zookeepers } = require("../../data/zookeepers.json");
const router = require("express").Router();

router.get('/zookeepers', (req, res) => {
    let results = zookeepers;
    if (req.query) {
        results = filteredByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/zookeepers', (req, res) => {
    req.body.id = zookeepers.length.toString();

    if (!validateZooKeeper(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});

module.exports = router;