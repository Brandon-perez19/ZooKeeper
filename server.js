const { animals } = require('./data/animals');
const express = require('express');
const PORT = process.env.PORT || 3001;
//assign expresss to app variable to chain methods later
const app = express();

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

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);

});