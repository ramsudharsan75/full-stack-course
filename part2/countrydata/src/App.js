import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  console.log(process.env.REACT_APP_TEST);
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data));
  }, []);

  const filterHandler = (e) => setCountryFilter(e.target.value);

  const getFilteredCountries = () => {
    if (countryFilter.length === 0) {
      return null;
    }

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()));

    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];

      return (
        <>
          <h2>{country.name.common}</h2>
          <div>capital {country.capital[0]}</div>
          <div>area {country.area}</div>
          <p><b>languages:</b></p>
          <ul>
            {Object.values(country.languages).map(lang => <li key={lang.id}>{lang}</li>)}
          </ul>
          <p>
            <img src={country.flags.png} alt={country.name.common} />
          </p>
        </>
      );
    }

    const showCountry = (e) => setCountryFilter(e.target.value);

    if (filteredCountries.length > 10)
      return <div>Too many matches, specify another filter</div>;

    return filteredCountries.map(country => (
      <div key={country.name.common}>
        <div>{country.name.common}</div>
        <button onClick={showCountry} value={country.name.common} >Show</button>
      </div>)
    );
  };

  return <>
    <div>find countries <input type="text" onChange={filterHandler} value={countryFilter} /></div>
    {getFilteredCountries()}
  </>;
};

export default App;
