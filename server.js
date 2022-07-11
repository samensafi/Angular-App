const http = require('http');
const app = require('./backend/app');

const port = process.env.PORT || 3000;
//we can now use the http variable to create a new server
app.set('port', port)
const server = http.createServer(app);
//createServer takes a request listener as an argument
//so the function will be executed for any incoming request
// () => {} is a function
//req = request, res = response
//res.end() is used to end writing to the response stream
//our server is stored in server constant

server.listen(port);
//process.env to access environment variable
