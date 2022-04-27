require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3001;

const Person = require('./models/person');

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

morgan.token('body', (request) =>
  request.method === 'POST' ? JSON.stringify(request.body) : null
);

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.use(express.json());

app.use(express.static('public'));

app.get('/info', (request, response) =>
  response.send(
    `The phonebook contains records of ${
      persons.length
    } people.<br>${new Date()}`
  )
);

app.post('/api/persons', async (request, response) => {
  const body = request.body,
    name = body.name,
    number = body.number;

  if (!name) return response.status(400).json({ error: 'name missing' });

  if (!number) return response.status(400).json({ error: 'number missing' });

  if (await Person.exists({ name }))
    return response.status(400).json({ error: 'name must be unique' });

  new Person({ name, number }).save().then((data) => response.json(data));
});

app.get('/api/persons', (_request, response) =>
  Person.find().then((data) => response.json(data))
);

app.get('/api/persons/:id', (request, response) => {
  const person = persons.find((person) => person.id === +request.params.id);
  if (!person) return response.status(404).end();
  response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  persons = persons.filter((person) => person.id !== +request.params.id);
  response.status(204).end();
});

app.listen(port, () => console.log(`Server listening on port ${port}.`));
