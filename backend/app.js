//file for implemanting express features

const express = require('express');

//using express, handling a request for a single special path
//can be used to create new middlewares
const app = express();

app.use((req, res, next) => {
  console.log('First middleware');
  //next lets the request to continue its journey
  next();
});

  //doing something with the response
app.use((req, res, next) => {
  res.send('Hello from express!');
});

//we want to use app like a listener so we exported it to use it. wiring up server.js and app.js
//this would export our constant which is app and also its middlewares
module.exports = app;
