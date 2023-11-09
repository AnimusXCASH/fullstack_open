require('dotenv').config()
const express= require('express')
const morgan = require('morgan')
const cors = require('cors')
const Phonebook = require('./models/person')
const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const unknownEndpoint = (request, response) => {
  response.status(400).send({ error:'unknown endpoint' })
}

// middleware
const errorHandler = (error, request, response, next) => {
  console.log('[MIDDLEWARE-ERR]')
  console.log(error.message)

  if (error.name==='CastError'){
    return response.status(400).send({ error:'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}


app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/info', (request, response, next) => {
  console.log('[GET] /info')
  Phonebook.countDocuments({})
    .then(count => {
      let data = `
        <div>
          <p>Phonebook has info for ${count} people</p>
          </br>
          <p>${new Date().toString()}</p>
        </div>
      `
      response.send(data)
    })
    .catch(error => next(error))
})

// get all people
app.get('/api/persons',(request, response) => {
  console.log('[GET] /api/persons/')
  Phonebook.find({}).then(entries => {
    if (entries){
      response.json(entries)
    }else{
      response.status(400).end()
    }
  }).catch(error => {
    console.log(error)
    response.status(500).end()
  })
})

// Get person by id
app.get('/api/persons/:id', (request, response, next) => {
  console.log('[GET] /api/persons/:id')
  Phonebook.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).send({ error: 'not found' })
      }
    })
    .catch(error => next(error))
})

// delete person by ID
app.delete('/api/persons/:id', (request, response,next) => {
  console.log('[DEL] /api/persons/:id')
  Phonebook.findByIdAndDelete(request.params.id).then(result => {
    console.log(result)
    response.status(204).end()
  }).catch(error => next(error))
})

// Update the data in database
app.put('/api/persons/:id', (request, response, next) => {
  console.log('[PUT] /api/persons/:id')
  const { name,number } = request.body

  Phonebook.findByIdAndUpdate(
    request.params.id,
    { name,number },
    { new:true, runValidators:true, context:'query' }
  )
    .then(updatedUser => {
      response.json(updatedUser)
    }).catch(error => next(error))
})

// Make new user entry
app.post('/api/persons', (request, response, next) => {
  console.log('[POST] /api/persons/')
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  let userEntry = new Phonebook (
    {
      name: request.body.name,
      number: request.body.number
    }
  )
  userEntry.save().then(savedEntry => {
    response.json({ savedEntry })
  }).catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})