// IMPORT SECTION
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const appRoutes = require('./routes/app.route'); // Ensure this path is correct
const { Sequelize } = require('sequelize'); // Import Sequelize
const db = require('./db/index')

// Initialize the express application
const app = express();

app.use(bodyParser.json());
app.use(express.static('public', { dotfiles: 'allow' })); // Uncomment if needed
app.use('/api', appRoutes);

// Establish connection to the database
db.sequelize.authenticate().then(() => {
    const options = {
        force: false,
        alter: false,
        logging: false
    }
    // Creating tables in the database based on models
    db.sequelize.sync(options).then(function () {
        const appName = process.env.APP_NAME
        const port = process.env.APP_PORT
        console.log('%s is starting on %d', appName, port)
        const laneaxisServer = app.listen(port)
        laneaxisServer.on('error', (err) => {
           
        })
    }).catch((err) => {
        console.log(err)
    })
}).catch(err => {
    console.log( err)
})
