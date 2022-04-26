const express = require('express');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3001;

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

app.get('/info', (request, response) =>
  response.send(
    `The phonebook contains records of ${
      persons.length
    } people.<br>${new Date()}`
  )
);

const generateId = () => {
  const id = Math.ceil(Math.random() * 1000000);
  if (persons.some((person) => person.id === id)) return generateId();
  return id;
};

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) return response.status(400).json({ error: 'name missing' });

  if (!body.number)
    return response.status(400).json({ error: 'number missing' });

  if (persons.some((person) => person.name === body.name))
    return response.status(400).json({ error: 'name must be unique' });

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons.push(person);
  response.json(person);
});

app.get('/api/persons', (request, response) => response.json(persons));

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
