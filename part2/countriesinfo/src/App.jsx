import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import CountryDetails from "./components/CountryDetails"
import countryService from "../service/countryService"

const App = () => {
  const [countries, setCountries] = useState([]) 
   const [filter, setFilter] = useState('')
   const [selectedCountry, setSelectedCountry] = useState(null)


   useEffect(() => {
    console.log('effect')
    countryService
    .getAll()
      .then(data => {
        console.log('promise fulfilled')
        setCountries(data)
      })
  }, [])
  
   const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())
)

  

  return (
    <div>
    <Filter filter={filter} handleFilterChange={handleFilterChange}/>
    {filter && countriesToShow.length > 10 && (
      <p>Too many matches, specify another filter.</p>
    )}
    {countriesToShow.length <= 10 && countriesToShow.length > 1 && (
      <ul>
        {countriesToShow.map(country => (
          <li key={country.cca3}>{country.name.common} {" "}
          <button onClick={() => setSelectedCountry(country)}>Show</button>
          </li>
          
        ))}
      </ul>
    )}
    {countriesToShow.length === 1 && (
      <CountryDetails country={countriesToShow[0]}/>
    )} 

    {selectedCountry && (
      <CountryDetails country={selectedCountry} />
    )}

    </div>
  )
}


export default App