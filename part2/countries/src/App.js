import axios from 'axios';
import { useEffect, useState } from 'react';

import { CountryList } from './components';

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => setCountries(res.data));
  }, []);

  return (
    <div>
      <h1>Countries</h1>
      <CountryList countries={countries} />
    </div>
  );
};

export default App;
