const express= require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use(express.json())



let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }


app.get('/', (request, response)=>{
    response.send('<h1>Hello World</h1>')
})

app.get('/info',(request, response)=>{
    
    let data = `
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
            </br>
            <p>${new Date().toString()}</p>
        </div>
    `;
    response.send(data)
})

app.get('/api/persons',(request, response)=>{
    response.json(persons)
})


app.get('/api/persons/:id', (request, response) => {
    let id = Number(request.params.id);
    let person = persons.find(p => p.id === id);
    console.log(person)
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    let id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
  })

app.post('/api/persons', (request, response)=>{
    if (!request.body.name || !request.body.number){
        return response.status(400).json({
            error:'name and number are required'
        })
    }

    const personExists = persons.find(p=>p.name===request.body.name)
    if (personExists){
        return response.status(400).json({error: 'name must be unique'})
    }
    let newPerson = {
        id: generateId(),
        name: request.body.name,
        number: request.body.number
      }

    persons.push(newPerson)
    console.log(persons)
    response.json(newPerson)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})