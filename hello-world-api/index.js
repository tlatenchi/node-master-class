// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const { httpPort, httpsPort } = require('./config');
const fs = require('fs');

// Instantiate and start the HTTP server
const httpServer = http.createServer((req, res) => unifiedServer(req, res));
httpServer.listen(httpPort, () => console.log(`The server is listening on port ${httpPort}`));

// Instantiate and start the HTTPS server
const httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};
const httpsServer = https.createServer(httpsServerOptions, (req, res) => unifiedServer(req, res));
httpsServer.listen(httpsPort, () => console.log(`The server is listening on port ${httpsPort}`));

// All the server logic for both the http and https server
var unifiedServer = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const queryStringObject = parsedUrl.query;
  const method = req.method.toLowerCase();
  const headers = req.headers;
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', data => buffer += decoder.write(data));
  req.on('end', () => {
    buffer += decoder.end();
    const chooseHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
    const data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };

    chooseHandler(data, (statusCode, payload) => {
      statusCode = typeof (statusCode === 'number') ? statusCode : 200;
      payload = typeof (payload) === 'object' ? payload : {};
      const payloadString = JSON.stringify(payload);

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log(statusCode);
      console.log('Returning this response: ', statusCode, payloadString);
    });
  });
};

const welcomeMessages = [
  'Hello World',
  'Hello and welcome to the new world',
  'We are so happy you came',
  'Finally, you are here! What took you so long?',
  'Aww, you made it!'
];

const getMessage = (list) => {
  const random = Math.floor(Math.random() * list.length);
  return { message: welcomeMessages[random] };
};

const handlers = {
  hello: (data, callback) => callback(200, getMessage(welcomeMessages)),
  ping: (data, callback) => callback(200),
  notFound: (data, callback) => callback(404)
};

const router = {
  ping: handlers.ping,
  hello: handlers.hello,
};