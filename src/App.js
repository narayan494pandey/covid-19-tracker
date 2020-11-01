import React, {useState, useEffect} from 'react'
import './App.css';
import {
  MenuItem,
  FormControl,
  Select
}
from '@material-ui/core'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')
  const url = "https://disease.sh/v3/covid-19/countries"

  // State = how to write variable in REACT
  // api : https://disease.sh/v3/covid-19/countries
  //useEffect  = run a piece of code based on a given condition 
  //for api call

  useEffect (() =>{
    //the code inside here will run once
    //when the component load and not again
    //asyn => send a request , wait for it , do something with info
    const getCountriesData = async () =>{
      await fetch(url)
      .then((response) => response.json())
      .then((data) =>{
        const countries = data.map((country) =>(
          {
            name:country.country, //India,United Kingdom 
            value:country.countryInfo.iso2  //UK, USA,FR
          }
          
        ));
        setCountries(countries);
      });
    
    }
    getCountriesData();

  },[]);

  const onCountryChange = async (event) =>{
    const countryCode = event.target.value;
    console.log("yooo>>>",countryCode)
  }
  return (
    <div className="App">
      <div className="app__header">
         <h1> COVID 19 TRACKER </h1>
        <FormControl className="app_dropdown">
        <Select 
        onChange={onCountryChange}
        variant ="outlined"
        value={country}
        >
        <MenuItem value="worldwide">Worldwide</MenuItem>
        {/* loop through all the country and show a drop down list of the options*/}
        {
          countries.map(country =>(
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))
        }
        
        {/*<MenuItem value="worldwide">Worldwide</MenuItem>
        <MenuItem value="worldwide">Option1</MenuItem>
        <MenuItem value="worldwide">Option2</MenuItem>
        <MenuItem value="worldwide">Option3</MenuItem>*/}
        </Select>
      </FormControl>
      </div>
      
    </div>
  );
}

export default App;
/*

Header
title + select input dropdoen field
InfoBoxs
InfoBoxs
InfoBoxs
table of different country 
graph
map */