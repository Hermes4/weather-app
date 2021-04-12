import React, {useState} from 'react';
import WeatherResult from './WeatherResult';

const City = () => {
    const [cityName, setCityName] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    
    const HandleInputCity = (e) =>{
        setCityName(e.target.value)
    }
    const CheckWeather = () =>{
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3addbbcbad994c4e8d2b11350c463c1f`,{
            method: 'GET'
        } )
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            setWeatherData(data);
                
        })
    }


    return (
    <>
     <div className="searchCity">
        <label htmlFor="city">Check weather in your City: </label>
        <input 
        type="text" 
        name="city"
        placeholder="City"
        value={cityName}
        onChange={HandleInputCity}
        />
        <button onClick={CheckWeather}>Check</button>
     </div>

        <div className="weather_result" id="weather_result">
            <WeatherResult data={weatherData}/>
        </div>
     </>     
  );
}

export default City;
