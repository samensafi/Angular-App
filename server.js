const http = require('http');

//we can now use the http variable to create a new server
const server = http.createServer((req, res) => {
  res.end('This is my first response');
});
//createServer takes a request listener as an argument
//so the function will be executed for any incoming request
// () => {} is a function
//req = request, res = response
//res.end() is used to end writing to the response stream
//our server is stored in server constant

server.listen(process.env.PORT || 3000);
//process.env to access environment variable
