const Country = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <div>
      Capital <b>{country.capital}</b>
    </div>
    <div>
      Area <b>{country.area.toLocaleString()} km²</b>
    </div>
    <h3>Languages</h3>
    <ul>
      {Object.keys(country.languages).map((key) => (
        <li key={key}>{country.languages[key]}</li>
      ))}
    </ul>
    <img
      style={{ maxHeight: 200 }}
      alt={`Flag of ${country.name.common}`}
      src={country.flags.svg}
    />
  </div>
);

export default Country;
