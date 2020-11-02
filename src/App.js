import React, {useState, useEffect} from 'react'
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,CardContent
}
from '@material-ui/core'

import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import {sortData,prettyPrintStat} from './util'
import LineGraph from './LineGraph'
import "leaflet/dist/leaflet.css"

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({lat:34.80746 ,lng:-40.4796})
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases") ;


  useEffect (() =>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data =>{
      setCountryInfo(data)
      
    })
  },[])
  


  useEffect (() =>{
    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{
        const countries = data.map((country) =>(
          {
            name:country.country, //India,United Kingdom 
            value:country.countryInfo.iso2  //UK, USA,FR
          }
          
        ));
        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
        setMapCountries(data);
      });
    
    }
    getCountriesData();

  },[]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode)
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    
    await fetch(url).then(response => response.json())
    .then(data =>{
      setCountry(countryCode);
       setCountryInfo(data);
       setMapCenter([data.countryInfo.lat,data.countryInfo.long])
      setMapZoom(4); 
    }) 
  }
  return (
    <div className="app">
      <div className="app__left">
            <div className="app__header">
              <h1> COVID 19 TRACKER </h1>
              <FormControl className="app_dropdown">
              <Select 
              onChange={onCountryChange}
              variant ="outlined"
              value={country}
              >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country =>(
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
              </Select>
              </FormControl>
            </div>
            <div className="app__stats">
              <InfoBox isRed  active={casesType === "cases"} 
              onClick={e =>setCasesType('cases')}
               title="Coronavirus Cases " 
               total={prettyPrintStat(countryInfo.cases)}
                cases={prettyPrintStat(countryInfo.todayCases)}/>
              <InfoBox active={casesType === "recovered"} onClick={e =>setCasesType('recovered')} title="Recoverd " total={prettyPrintStat(countryInfo.recovered)} cases={prettyPrintStat(countryInfo.todayRecovered)}/>
              <InfoBox isRed active={casesType === "deaths"} onClick={e =>setCasesType('deaths')} title="Deaths" total={prettyPrintStat(countryInfo.deaths)}  cases={prettyPrintStat(countryInfo.todayDeaths)}/> 
            </div>
            <Map casesType={casesType} countries={mapCountries} center={mapCenter}  zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent >
        <div className="app__table">
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
        </div>
         <div className="app__graph">
          <h3>Worldwide new {casesType}</h3>
          <LineGraph  casesType={casesType}/>
         </div>
        </CardContent>
      </Card>
      
    </div>
  );
}

export default App;
/*
  // State = how to write variable in REACT
  // api : https://disease.sh/v3/covid-19/countries
  //useEffect  = run a piece of code based on a given condition 
  //for api call
  //the code inside here will run once
    //when the component load and not again
    //asyn => send a request , wait for it , do something with info
  //https://disease.sh/v3/covid-19/all
    //https://disease.sh/v3/covid-19/countries/[Country_code]
Header
title + select input dropdoen field
loop through all the country and show a drop down list of the options
<MenuItem value="worldwide">Worldwide</MenuItem>
<MenuItem value="worldwide">Option1</MenuItem>
<MenuItem value="worldwide">Option2</MenuItem>
<MenuItem value="worldwide">Option3</MenuItem>
InfoBoxs
InfoBoxs
InfoBoxs
table of different country 
graph
map */