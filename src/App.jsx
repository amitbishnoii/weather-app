import { useState } from "react"
import Navbar from "./components/Navbar"
import "./App.css"


function App() {
  const [city, setcity] = useState("")
  const [weather, setweather] = useState(null)
  const api = "f7c36c96b51e4e50b81145652250610"

  const handleClick = async () => {
    let r = await fetch(`https://api.weatherapi.com/v1/current.json?key=${api}&q=${city}`);
    let res = await r.json()
    setweather(res)
    console.log(res);
  }

  return (
    <>
      <Navbar />
      <div className="weather-card">
        <div className="city-bar">
          <input className="input-city" type="text" placeholder="Enter City Name..." value={city} onChange={(e) => { setcity(e.target.value) }} />
          <button onClick={handleClick}>Check</button>
        </div>
        <div className="weather-data">
          <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
          <p>Feels like {weather.current.feelslike_c}, {weather.current.condition.text}</p>
          {weather && <p>{weather.location.name}, {weather.location.region}, {weather.location.country}</p>}
          {weather && <p>Temprature: {weather.current.temp_c}</p>}
        </div>
      </div>
    </>
  )
}

export default App
