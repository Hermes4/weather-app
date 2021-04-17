import React, {useState} from 'react';
import '../style/header.scss';
import '../style/App.scss';
import WeatherResult from './WeatherResult';
import light_mode from '../icons/sun.png'
import dark_mode from '../icons/moon.png'

const City = () => {
    const [cityName, setCityName] = useState("");
    const [actualWeatherData, setActualWeatherData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [iconTheme, setIconTheme] = useState(dark_mode);
    // const iconSrc = dark_mode;

    const handleInputCity = (e) =>{
        setCityName(e.target.value)
    }
    const actualCheckWeather = () =>{
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3addbbcbad994c4e8d2b11350c463c1f`,{
            method: 'GET'
        } )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setActualWeatherData(data);
            dailyWeather(data);
                
        })
        .catch((error) => console.error('Error', error));
    }
    // const checkWeather = () =>{
    //     fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3addbbcbad994c4e8d2b11350c463c1f`,{
    //         method: 'GET'
    //     } )
    //     .then(response => response.json())
    //     .then(data => {
    //         // console.log(data);
    //         setWeatherData(data);
                
    //     })
    //     .catch((error) => console.error('Error', error));
    // }
    const dailyWeather = (data) =>{
        fetch(` https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&lang=EN&appid=3addbbcbad994c4e8d2b11350c463c1f`,{
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
            <div className="button_check">
                <button className="btn" onClick={()=>{actualCheckWeather(); /*checkWeather()*/}}>Check</button>
            </div>
            <div className="button_change_theme" onClick={()=>{
                    document.body.classList.toggle('dark_theme');
                    if(document.body.classList.contains('dark_theme')){
                        setIconTheme(light_mode);
                    }else{
                        setIconTheme(dark_mode);
                    }
                    // document.body.classList.contains('dark_theme') ? light_mode : dark_mode;
                }}>
                    <img src={iconTheme} alt="change theme" id="img"/>
            </div>
         </div>
     </div>

        <div className="weather_result" id="weather_result">
            <WeatherResult actualWeather={actualWeatherData} dataWeather={weatherData}/>
        </div>
     </>
  );
}

export default City;
