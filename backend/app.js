//file for implemanting express features

const express = require('express');

//using express, handling a request for a single special path
//can be used to create new middlewares
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
                "GET, POST, PATCH, DELETE, OPTIONS")
  next();
});

  //doing something with the response
app.use('/api/posts', (req, res, next) => {
  const posts = [
    { id: '12ew34g',
      title: 'First server-side post',
      content: 'This is coming from the server'
    },
    { id: '13ty32j',
    title: 'Second server-side post',
    content: 'This is coming from the server!'
    }
  ];
  //returns data in json format
  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

//we want to use app like a listener so we exported it to use it. wiring up server.js and app.js
//this would export our constant which is app and also its middlewares
module.exports = app;
