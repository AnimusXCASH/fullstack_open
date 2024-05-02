# Jest 

## Install

```npm install --save-dev jest```

## define test script 

```
{
  //...
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build:ui": "rm -rf build && cd ../frontend/ && npm run build && cp -r build ../backend",
    "deploy": "fly deploy",
    "deploy:full": "npm run build:ui && npm run deploy",
    "logs:prod": "fly logs",
    "lint": "eslint .",
    "test": "jest --verbose"
  },
  //...
}
```

## crete test folder
.test.js is required
revers.test.js

## Run single test 

```npm test -- -t 'when list has only one blog, equals the likes of that'```

ostal Exercises 4.3.-4.7.
