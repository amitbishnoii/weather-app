import { useState } from "react"
import Navbar from "./components/Navbar"
import "./App.css"
import { FaLocationArrow } from "react-icons/fa";
import { BsThermometerHalf } from "react-icons/bs";
import { WiBarometer } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";


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
          <div className="city-name">
            {showIcon && <img
              style={{ width: "60px" }}
              src={weather ? `https:${weather.current.condition.icon}` : ""}
              alt={weather ? weather.current.condition.text : "weather icon"}
            />}
            {weather && <p>{weather.location.name}, {weather.location.region}</p>}
          </div>
          <div className="temprature-box">
            {weather && <span style={{
              display: "flex", alignItems: "center"
            }}><BsThermometerHalf size={"25px"} /> Feels like {weather.current.feelslike_c}&deg;C</span>}
            {weather && <p>Temprature: {weather.current.temp_c}&deg;C</p>}
          </div>

          {weather?.current && (
            <p style={{display: "flex", alignItems: "center"}}>{weather.current.wind_kph} km/h towards {weather.current.wind_dir}
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
            </p>
          )}

          <div className="extra-details">
            {weather && <p style={{
              display: "flex", alignItems: "center"
            }}><WiBarometer size={"50px"} /> Pressure: {weather.current.pressure_mb} millibar</p>}
            {weather && <p style={{
              display: "flex", alignItems: "center", gap: "10px"
            }}><MdOutlineVisibility size={"30px"} /> Visibility: {weather.current.vis_km} kms</p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
