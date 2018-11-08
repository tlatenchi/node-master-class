/* 
* Primary file for the API
*/

// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const { httpPort, httpsPort } = require('./config');
const fs = require('fs');

// Instantiate the HTTP server
const httpServer = http.createServer((req, res) => unifiedServer(req, res));

// Start the server
httpServer.listen(httpPort, () => console.log(`The server is listening on port ${httpPort}`));

// Instantiate the HTTPS server
const httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};

const httpsServer = https.createServer(httpsServerOptions, (req, res) => unifiedServer(req, res));

// Start the HTTPS server
httpsServer.listen(httpsPort, () => console.log(`The server is listening on port ${httpsPort}`));

// All the server logic for both the http and https server
var unifiedServer = (req, res) => {
  // Get the URL and parse it
  // by passing true you are using the query string module
  // as well
  // parsedUrl will be an object
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  // removes the slashes from both sides
  // ex, http://localhost:3000/foo/cat/ wil return 'foo/cat'
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP method
  const method = req.method.toLowerCase();

  // Get the headers as an object
  const headers = req.headers;

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', data => buffer += decoder.write(data));

  req.on('end', () => {
    buffer += decoder.end();

    // Choose the handler this request should go to.
    // If one is not found use the NotFound handler
    const chooseHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construc the data object to send to the handler
    const data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };

    // Route the request to the handler specified in the router
    chooseHandler(data, (statusCode, payload) => {
      // Use the status code called back by the handler,
      // or default to 200
      statusCode = typeof (statusCode === 'number') ? statusCode : 200;

      // Use the payload called back by the handler, or default
      // to an empty object
      payload = typeof (payload) === 'object' ? payload : {};

      // Convert the payload to a string
      // This is the payload that we're sending back to the user
      const payloadString = JSON.stringify(payload);

      // Return the response
      console.log(statusCode);
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log('Returning this response: ', statusCode, payloadString);
    });

    // Log the request path

  });
}

// Define our handlers
const handlers = {
  ping: (data, callback) => callback(200),
  notFound: (data, callback) => callback(404)
};

// Define a request router
const router = {
  ping: handlers.ping
};