import React, { useEffect, useState } from 'react';

import { QueryCountry } from './components/QueryBox';
import { Results } from './components/Results';
import { getAllCountries } from './services/services';


const App = () => {
  const [countryData, setCountryData] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [errorText, setErrorText] = useState('')

  const searchCountry = (event) => {
    const query = event.target.value;
    setCountryFilter(query)
    if (query.length === 0){
      setErrorText('')
      setCountries([]);
      setCountryFilter('')
      return;
    }

    getAllCountries().then((response) => {
      let filteredCountries = response.data.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()));

      if (filteredCountries.length > 10) {
        setErrorText('Too many matches, specify another filter or extend the current input');
        setCountries([]); 
      } else if (filteredCountries.length > 0) {
        setCountries(filteredCountries);
        setErrorText('');
      } else {
        setErrorText('No countries found');
        setCountries([]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <QueryCountry userQuery={countryFilter} userInput={searchCountry} />
      {errorText ? <p>{errorText}</p> : null}
      {countries.length > 0 ? <Results countries={countries}/> : null}
    </div>
  );
};

export default App;

