import React, { useState } from 'react'
import style from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHippo,faDroplet, faLocationDot, faWind, faMagnifyingGlassLocation, faSquareNfi } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
function BodyFunction() {
  const [city, setCity] = useState('');
  const [myweather, setmyWeather] = useState();
  const [image, setImage] = useState();
  const [errorMass, setError] = useState(false);

  function getImage(res) {
    const url = res.data.weather[0].main.toLowerCase();

    if (url === 'clear') {
      return `./image/cloud.png`
    }
    else if (url === 'clouds') {
      return `./image/cloud.png`
    }
    else if (url === 'rain') {
      return `./image/highrain.png`
    }
    else if (url === 'snow') {
      return `./image/snow.png`
    }
    else if (url === 'sunny') {
      return `./image/sunny.png`
    }
    else if (url === 'wind') {
      return `./image/slowrain.png`
    }
    else {
      return `./image/default.png`
    }
  }


  async function fetchApi(cityName) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${'0a92a278dbbdcbab8a9af3536e3d1b3a'}`)
      if (response.status !== 200) {
        alert("City not found! Please enter a valid city.");
        return;
      }
      setmyWeather(response)
      const imageUrl = getImage(response)
      setImage(imageUrl)
    }
    catch (error) {
      setError(true)
      console.log('error in the code', error)
    }
  }

  function handleChange(e) {
    const cityName = e.target.value;
    setCity(cityName)
  }

  function handleSearchBtn() {
    setError(false)
    fetchApi(city)
    setCity('')
  }

  function handleKeyDown(event){
    if(event.key === 'Enter'){
      handleSearchBtn()
    }
  }


  return (
    <div className={style.body}>
      <div className={style.bodyContainer}>
        <div className={style.bodyHeader}>
          <input type="text" value={city} onKeyDown={handleKeyDown} onChange={handleChange} placeholder="Enter City name" />
          <button className={style.searchBtn} onClick={handleSearchBtn}>Search</button>
        </div>

        {errorMass && (
          <div className={style.errorContainer}>
            <img src='../public/image/error2.png' alt="error" />
            <p className={style.errorText}>City not found! Please try again.</p>
          </div>)}

        {!myweather && !errorMass && (
          <div className={style.noData}>
            <img src='/image/search3.png' alt="default-weather" />
            <p>Search for a city's weather</p>
          </div>
        )}


        {myweather && !errorMass && (
          <div className={style.bodyContent}>
            <div className={style.bodyContentTop}>
              <FontAwesomeIcon className={style.locationIcon} icon={faLocationDot} />
              <h1 className={style.cityname}>{myweather.data.name}</h1>
            </div>
            <div className={style.bodyContentBottum}>
              <img src={image} alt="weather-image" />
              <p className={style.temp}><span className={style.tempName}>{myweather.data.weather[0].main}</span><span>{(myweather.data.main.temp - 273.15).toFixed(1) } °C</span></p>
            </div>
            <div className={style.bottumContainer}>
              <div className={style.humidityContainer}>
                <div className={style.humidityValueContainer}>
                  <FontAwesomeIcon className={style.IconWind} icon={faDroplet} />
                  <p className={`${style.humidity} ${style.text}`}>humidity</p>
                </div>
                <p className={style.humidityValue}>{myweather.data.main.humidity}</p>
              </div>
              <div className={`${style.windContainer}  ${style.humidityContainer}`}>
                <div className={`${style.windValueContainer} ${style.humidityValueContainer}`}>
                  <FontAwesomeIcon className={style.IconWind} icon={faWind} />
                  <p className={`${style.wind} ${style.text}`}>wind Speed</p>
                </div>
                <p className={style.windValue}>{myweather.data.wind.speed}</p>
              </div>
            </div>
          </div>
        )
        }

      </div>
    </div>
  )
}

export default BodyFunction

