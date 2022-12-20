const express = require('express');

const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauce');

const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

mongoose.connect('mongodb+srv://admin:admin@cluster0.jti93xc.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

// app.use((req, res, next) => {
//   console.log('Request received!');
//   next();
// });

// app.use((req, res, next) => {
//   res.status(201);
//   next();
// });

// app.use((req, res, next) => {
//   res.json({ message: 'Your request was successful!' });
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Response sent successfully!');
// });

app.use ('/api/sauces', sauceRoutes);
app.use ('/api/auth', userRoutes);

module.exports = app;