import React, {useState} from 'react';
import '../style/header.scss';
import WeatherResult from './WeatherResult';

const City = () => {
    const [cityName, setCityName] = useState("");
    const [actualWeatherData, setActualWeatherData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    
    const handleInputCity = (e) =>{
        setCityName(e.target.value)
    }
    const actualCheckWeather = () =>{
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3addbbcbad994c4e8d2b11350c463c1f`,{
            method: 'GET'
        } )
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            setActualWeatherData(data);
            // CheckWeather();
                
        })
        .catch((error) => console.error('Error', error));
    }
    const checkWeather = () =>{
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3addbbcbad994c4e8d2b11350c463c1f`,{
            method: 'GET'
        } )
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            setWeatherData(data);
                
        })
        .catch((error) => console.error('Error', error));
    }


    return (
    <>
     <div className="header">
         <div className="search_city_box">
            <label htmlFor="city" ><div className="font input_label" >Check weather in your City </div></label>
            <input 
            className="font input input_city-name"
            type="text" 
            name="city"
            placeholder="City"
            value={cityName}
            onChange={handleInputCity}
            />
            <button className="btn" onClick={()=>{actualCheckWeather(); checkWeather()}}>Check</button>
         </div>
     </div>

        <div className="weather_result" id="weather_result">
            <WeatherResult actualWeather={actualWeatherData} dataWeather={weatherData}/>
        </div>
     </>
  );
}

export default City;
