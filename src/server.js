'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/router/index.js');

require('dotenv').config();
const PORT = process.env.PORT || 5002;

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

app.get('/', (req, res, next) => {
  res.status(200).send('Hello World!');
});

// Temp route for testing 500 errors
app.get('/throw-error', (req, res, next) => {
  next(new Error('Test Error'));
});


// Catchalls
app.use(notFound);
app.use(errorHandler);

const start = () => {
  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
}

module.exports = {
  start, 
  app
};