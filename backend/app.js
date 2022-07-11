//file for implemanting express features

const express = require('express');

//using express, handling a request for a single special path
const app = express();

app.use((req, res, next) => {
  console.log('First middleware');
  next();
});

app.use((req, res, next) => {
  res.send('Hello from express!');
});

module.exports = app;
