# Hello World API

This project showcases `/hello` route using node.js with no external libraries.

**Dev environment**
In terminal run:
```
npm run
```

Routes
http: `http://localhost:3000/hello/`
https: `https://localhost:3000/hello/`

**Production environment**
To initiate production environment in terminal run:

```
NODE_ENV=production node index.js
```

Routes
http: `https://www.localhost:5001/hello/`
http:`https://www.localhost:5001/hello/`

**Generate RSA key**
In terminal run:
```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```