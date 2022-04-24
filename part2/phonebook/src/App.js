import axios from 'axios';
import { useEffect, useState } from 'react';

import { Filter, PersonForm, Persons } from './components';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [nameFilter, setNameFilter] = useState('');

  const handleNewNameChange = (event) => setNewName(event.target.value);
  const handleNewNumberChange = (event) => setNewNumber(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName))
      return alert(`${newName} is already present in the phonebook.`);

    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  };

  const handleNameFilterChange = (event) => setNameFilter(event.target.value);

  useEffect(() => {
    axios.get('//localhost:3001/persons').then((res) => setPersons(res.data));
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={nameFilter} onChange={handleNameFilterChange} />
      <h2>Add a person</h2>
      <PersonForm
        onSubmit={addPerson}
        valueName={newName}
        onChangeName={handleNewNameChange}
        valueNumber={newNumber}
        onChangeNumber={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;
