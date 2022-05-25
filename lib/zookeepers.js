const fs = require("fs");
const path = require("path");

function filteredByQuery(query, zookeepers) {
    let filteredResults = zookeepers;
    if (query.age) {
        filteredResults =filteredResults.filter(
            // have to convert query string to a number since json is storing it as a number
            (zookeept) => zookeepers.age == Number(query.age)
        );
    }
    if (query.favoriteAnimal){
        filteredResults = filteredResults.filter (
            (zookeeper) => zookeeper.favoriteAnimal === query.favoriteAnimal
        )
    }
    if (query.name){
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.name === query.name
        );
    }
    return filteredResults;
};

function findById(id, zookeepers) {
    const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0];
    return result;
};

function createNewZookeeper(body, zookeepers){
    const zookeeper = body;
    zookeepers.push(zookeeper);
    fs.writeFileSync(
        path.join(__dirname, "../data/zookeepers.json"),
        JSON.stringify({zookeepers}, null, 2)
    );
    return zookeeper;
};

function validateZooKeeper (zookeeper) {
    if(!zookeeper.name || typeof zookeeper.name !== "string") {
        return false;
    }
    if (!zookeeper.age || typeof zookeeper.age !== "number") {
        return false;
    }
    if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== "string") {
        return false;
    }
    return true;
}

module.exports = {
    filteredByQuery,
    findById,
    createNewZookeeper,
    validateZooKeeper,
};