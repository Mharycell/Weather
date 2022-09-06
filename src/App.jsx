import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import sunny from "./assets/sunnyDay.jpg"
import winter from "./assets/winterDay.jpg"

function App() {

  const[weather, setWeather ] = useState({})
  const [isDegrees, setIsDegrees] = useState(true)
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    
    function success(pos) {
      const crd = pos.coords;
      
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=69b34168e48e62e6349b2eaf6852415d`)
      .then(res => setWeather(res.data))
    }
  }, [])

  console.log(weather)

  const celcious = weather.main?.temp-273.15
  const celcious1 = celcious.toFixed(2)
  const fahrenheit = (weather.main?.temp-273.15)*9/5+32
  const fahrenheit1 = fahrenheit.toFixed(2)

  const changeWeather = ()  => {
    if(weather.weather?.[0].id >= 200 && weather.weather?.[0].id<=799){
      return winter
    }else{
      return sunny
    }
  }


  return (
    <div className="App">
      <div className='winter' >
        <img className='winter-day' src={changeWeather()} alt="" />
      </div>
      <div className='Card'>
      <h1>Weather </h1>  
       
        <div>
          <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" /> 
          <h2>{`${weather.name}, ${weather.sys?.country }`}</h2>
          <h2>{weather.weather?.[0].description}</h2>
          <h2>{weather.weather?.[0].main}</h2>
          <h2>Wind Speed: {weather.wind?.speed} m/s</h2> 
          <h2>Clouds: {weather.clouds?.all}%</h2>
          <h2>Pressure: {weather.main?.pressure} hPa</h2>

          <div>
            {isDegrees ? `${celcious1} °C` : `${fahrenheit1} °F`}
          </div>
          <button onClick={() => setIsDegrees(!isDegrees)}>Degrees °F/°C</button>

        </div>
      

      </div>
    </div>
  )
}

export default App
