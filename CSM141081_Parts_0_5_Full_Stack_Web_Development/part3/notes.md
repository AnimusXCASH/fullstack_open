### Setup node 

```
npm init 

npm install express
npm install --save-dev nodemon

<!-- Create dev command  -->
scripts:
    "dev": "nodemon index.js",

```


### Middleware 

morgan packgae

```js
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)
```

```js
app.use(requestLogger)

const requestLogger = (request, response, next)=>{
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

```


```js
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use(express.json())



```