const express = require('express');
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
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
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//=======================================
//express middleware end

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);

});