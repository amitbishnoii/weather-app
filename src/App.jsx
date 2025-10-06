import { useState } from "react"
import Navbar from "./components/Navbar"
import "./App.css"


function App() {
  const [city, setcity] = useState("")
  const api = "f7c36c96b51e4e50b81145652250610"

  const handleClick = () => {

  }

  return (
    <>
      <Navbar />
      <div className="weather-card">
        <div className="city-bar">
          <input className="input-city" type="text" placeholder="Enter City Name..." />
          <button onClick={handleClick}>Check</button>
        </div>
      </div>
    </>
  )
}

export default App
