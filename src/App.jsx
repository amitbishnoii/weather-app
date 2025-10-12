import { useState } from "react"
import Navbar from "./components/Navbar"
import "./App.css"
import { FaLocationArrow } from "react-icons/fa";


function App() {
  const [city, setcity] = useState("")
  const [weather, setweather] = useState(null)
  const [showIcon, setshowIcon] = useState(false)
  const api = "f7c36c96b51e4e50b81145652250610"

  const handleClick = async () => {
    let r = await fetch(`https://api.weatherapi.com/v1/current.json?key=${api}&q=${city}`);
    let res = await r.json()
    setweather(res)
    setshowIcon(true)
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
          <div style={{
            display: "flex",
            flexDirection: "column"
          }}>
            {showIcon && <img
              src={weather ? `https:${weather.current.condition.icon}` : ""}
              alt={weather ? weather.current.condition.text : "weather icon"}
            />}
            <span>{"Feels like"} {weather && weather.current.feelslike_c}&deg;C</span>
          </div>
          {weather && <p>{weather.location.name}, {weather.location.region}</p>}
          {weather && <p>Temprature: {weather.current.temp_c}&deg;C</p>}
        </div>

        {weather?.current && (
          <span
            style={{
              display: "inline-block",
              transform: `rotate(${weather.current.wind_degree}deg)`,
              transition: "transform 0.4s ease",
              marginLeft: "5px"
            }}
          >
            <FaLocationArrow style={{ fontSize: "1.5rem" }} />
          </span>
        )}
        {weather && <p>{weather.current.wind_kph} km/h towards {weather.current.wind_dir}</p>}

      </div>
    </>
  )
}

export default App
