const { animals } = require('./data/animals');
const express = require('express');
const fs =require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
//assign expresss to app variable to chain methods later
const app = express();


//express middleware start
//===================================
//allows for front-end resources to be loaded by server
app.use(express.static('public'));

//parse incoming string or array data
app.use(express.urlencoded({ extended: true}));

//parse incoming JSON data
app.use(express.json());

//=======================================
//express middleware end

function filterByQuery(query, animalsArray){
    let personalityTraitsArray = [];
    //saved the animalsArray as filtered results
    let filteredResults = animalsArray;
    if (query.personalityTraits ){
        //save personalityTraits as a dedicated array
        //If personalityTraits is a string, place it into a new array and save
        if (typeof query.personalityTraits === 'string'){
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits
        }
        //loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name)
    }
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewAnimal(body, animalsArray){
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );

    //return finished code to post route for response
    return animal;
};

function validateAnimal(animal) {
    if(!animal.name || typeof animal.name!== 'string'){
        return false;
    }
    if(!animal.species || typeof animal.species !== 'string'){
        return false;
    }
    if(!animal.diet || typeof animal.diet !== 'string'){
        return false;
    }
    if(!animal.personalityTraits || !Array.isArray(animal.personalityTraits)){
        return false;
    }
    return true;
}



//query route
//app get must be written before app listen. two arguments. String that describes the route and callback function
app.get('/api/animals', (req, res) => {
    // res = response and it sends to the page hello
    // res.json(animals);
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//req.param is a property of the req object
//param route
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.post('/api/animals', (req, res) => {
    //req.body is where the incoming content will be
    //set id based on what the next index of the array will be
    req.body.id =animals.length.toString();

    //if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        //add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

//serves the index.html aka homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

//serves animals.html
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

//serves zookeeper.html 
app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

//wildcard routes. Any route not defined will be redirected to index.html. Should always come last!
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);

});