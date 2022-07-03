import { useState,useEffect } from 'react'
import axios from "axios";
import "./index.css"
import './App.css'
import termico from "./termico.png"
import humedad from "./humedad.png"
function App() {
  
  const [data, setData] = useState({})
  const [temp, setTemp] = useState(0)
  const [feel, setFeel] = useState(0)
  const [isCelcius, setIsCelcius]= useState(true)

  useEffect(()=>{
    
      const success = pos => {
        const lat = pos.coords.latitude
        const long = pos.coords.longitude
       axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a50c45eb87fd2f9ca3973ebcbb6bc806`)
       .then((res) => {
        setData(res.data);
        const changeToCelcius = Math.round((res.data.main.temp - 273.15));
        setTemp(changeToCelcius)
        const changeToFeel = Math.round((res.data.main.feels_like - 273.15));
        setFeel(changeToFeel)
       
     });
       
      }
      navigator.geolocation.getCurrentPosition(success);
  },[]);

  const converTemp = () => {
    if (isCelcius) {
      // Transformar a faren
      setTemp(Math.round((temp * (9/5)) + 32));
      setIsCelcius(false);
    } else {
      // Transformar a celcius;
      setTemp(Math.round((temp - 32) * (5/9)));
      setIsCelcius(true);
    }
  };
console.log(data)

let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
let time = date.getHours() + ':' + date.getMinutes();


  return (
    <div className="App">
      <div className='card'>
        <h2 className="title__card">{data.name} , {data.sys?.country} </h2>
        <div className="date">
          <h3>{output}</h3>
          <h3>{time}</h3>
        </div>
        <div className="description-weather">
          <img className="iconTemp" src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`}  alt="" />
           <p className="description">"{data.weather?.[0].description}"</p>
        </div>
        <h2 className='temp'>{temp} {isCelcius ? "ºC" : "ºF"}</h2>
        <div className="feel">
          <img className="termico" src= {termico} alt="" />
          <h3>Feel Like : {feel}ºC</h3>
        </div>
        <div className="humidity">
           <img className="icon__humidity" src={humedad} alt="" />
           <h3>Humidity: {data.main?.humidity} %</h3>
        </div>
        <button onClick= {converTemp}>ºC / ºF </button>
        
      </div>
    
    </div>
  )
}

export default App
