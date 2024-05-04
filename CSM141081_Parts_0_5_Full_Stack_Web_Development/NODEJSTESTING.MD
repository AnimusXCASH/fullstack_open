# Jest 

## Install

```npm install --save-dev jest```

```npm install --save-dev supertest```


## Creating multiple environments support

```js
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

```

```
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    "test": "cross-env  NODE_ENV=test node --test",
    "lint": "eslint ."
```



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


