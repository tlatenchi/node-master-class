
# Node Master Class
**Course Link**
https://pirple.thinkific.com/courses/the-nodejs-master-class
## Background Information

### What is v8, exactly?

In order to execute high-level code, the computer uses:

- Interpreters
  Take source  code and directly execute it by taking realtime intermediate steps. But, they don't leave anything behind.

- Compilers
  Take source code and turn it into an executable file (a file full of code that the computer can execute).

- Transpilers
  Take source code and turn it into source code of another type.

V8 is a Javascript Engine
Javascript engines are interpreters for JS. V8 compiles JS down to native machine code and executes it. It als optimizes the code at runtime.

### What is Node.js, exactly?

- Node.js is a server-side javascript runtime environment.

- Node is a C++ application that embeds the V8 js engine.

Nodejs represents itself as two applications:

1. A script processor

  ```javascript
  node {script name}
  ```

  eg:

  ```javascript
  node index.js
  ```

2. A REPL (Read Eval Print Loop)

  `node`

Breaking down script processor:
Node first initializes a process called the event loop. Then it processes the initial parts of the JS file then it's going to process the event loop it process earlier.

The "event loop" is continually checking if there's anything new for Node.js to do.

Non-blocking tasks get added to the todolist, and Node processes them whenever it can.

Node's event loops and "non blocking" IO don't allow Node to do multiple things at one time, they just allow Node to schedule things later.

When processing a request, most web apps are actually sitting around waiting for most of the time.

A Non blocking IO allows an app to do other things while it's sitting around waiting.

In summary: Node's script processor:

1. Reads in the file you specify

2. Reads in all the dependencies that file, specifies, and all the dependencies of those files, etc.

3. Begins executing the synchronous tasks in those files.

4. Begins processing the "todo list" by repeating the event loop until it has nothing to do.

### Comon Node Conventions

#### Ways to read environment names and variables.

Option 1:
Create variables with

```javascript
NODE_ENV=myEnvironmentName node index.js
```

In the configuration file you can read the value by `process.env.NODE_ENV`

Option 2:
Start your app with every configuration variable you're going to need for that environemnt:

```javascript
DBpassword=myDBpassword apiToken=mySecretToken port=thePortIShouldRunOn foo=bar node index.js
```

Option 3:
Read all your configuration from a .env file which gets ignored by source control.

each dev would put their own .env file in the project prior to beginning localhost work.

Your deployment pipeline would insert an .env file into the repo before it deploys anywhere.

#### Styles and Patterns

[https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)

#### Error Handling

##### Errback

Functions should callback two parameters

1. An error (if any)

2. Data being returned (if any)

Example:

```javascript
exampleFunction(function(err, data) {
  // Check the error
  // Do stuff with the data
});
```

#### Avoid Throwing Exceptions

An uncaught exception takes down the entire thread, and kills the app. Instead return the error to the caller.

#### Avoid Globals
This way you'll avoid namespace collisions with any libraries you may be using.

### Node.js vs the Browser
In node you don't have access to window object.

Node can do many things that frontend JS cannot.

Node is one environment. The browser is many.

In Node, the source code you write is not visible to the user.

### Building a RESTful API

#### Requirements of project

1. The API listens on a PORT and accepts incoming HTTP requests for POST, GET, PUT, DELETE, and HEAD.

2. The API allows a client to connect, then create a new user, then edit and delete that user.

3. The API Allows a user to "sign in" which gives them a token that they can use for subsequent authenticated requests.

4. The API allows the user to "sign out" which invalidates their token.

5. The API allows a signed-in user to use their token to create a new "check".

6. The API allows a signed-in user to edit or delete any of their checks.

7. In the background, workers perform all the "checks" at the appropriate times, and send alerts to the users when a check changes its state from "up" to "down", or visa versa.