require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const appRoutes = require('./routes/app.route'); // Ensure this path is correct
const { Sequelize } = require('sequelize'); // Import Sequelize
const httpContext = require('express-http-context');
const db = require('./db/index'); // Make sure your Sequelize db connection is correct

// Initialize the express application
const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3001',  // Replace with the origin of your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Explicitly allow Authorization header
  credentials: true,  // Allow cookies and credentials
};

// Apply CORS middleware before routes are defined
app.use(cors(corsOptions));

// Body Parser Middleware
app.use(bodyParser.json());

// HTTP Context Middleware
app.use(httpContext.middleware);

// Serve static files (if necessary)
app.use(express.static('public', { dotfiles: 'allow' }));

// Set up your API routes
app.use('/api', appRoutes); // Ensure appRoutes points to your routes properly

// Explicitly handle OPTIONS requests (preflight requests)
app.options('*', (req, res) => {
  console.log('Handling OPTIONS request...');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');  // Allow frontend origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');  // Allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');  // Allow Authorization header
  res.setHeader('Access-Control-Allow-Credentials', 'true');  // Allow credentials
  res.status(200).send();  // Respond with 200 OK for the preflight request
});

// Example route (for testing)
app.get('/api/user', (req, res) => {
  res.json({ message: 'Success', data: { name: 'John Doe' } });
});

// Establish connection to the database
db.sequelize.authenticate()
  .then(() => {
    const options = {
      force: false,
      alter: false,
      logging: false,
    };

    // Creating tables in the database based on models
    db.sequelize.sync(options)
      .then(() => {
        const appName = process.env.APP_NAME;
        const port = process.env.APP_PORT || 3000; // Default to port 3000 if not set
        console.log('%s is starting on %d', appName, port);

        const server = app.listen(port, () => {
          console.log(`Server is running on http://localhost:${port}`);
        });

        server.on('error', (err) => {
          console.error('Server error:', err);
        });
      })
      .catch((err) => {
        console.error('Error syncing database:', err);
      });
  })
  .catch((err) => {
    console.error('Error authenticating database:', err);
  });
