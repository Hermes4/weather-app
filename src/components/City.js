import React, {useState} from 'react';
import '../style/header.scss';
import '../style/App.scss';
import WeatherResult from './WeatherResult';
import light_mode from '../icons/sun.png'
import dark_mode from '../icons/moon.png'

//icons svg
import clear from '../icons/01d.svg';
import mostlySunny from '../icons/02d.svg';
import mostlyCloudy from '../icons/03d.svg';
import cloudy from '../icons/04d.svg';
import chanceRain from '../icons/05d.svg';
import rain from '../icons/06d.svg';
import storm from '../icons/07d.svg';
import snow from '../icons/08d.svg';
import fog from '../icons/09d.svg';
import undefinedIcon from '../icons/unknown.svg';

//svg dark_mode
import mostlySunnyWhite from '../icons/02dwhite.svg';
import mostlyCloudyWhite from '../icons/03dwhite.svg';
import cloudyWhite from '../icons/04dwhite.svg';
import chanceRainWhite from '../icons/05dwhite.svg';
import rainWhite from '../icons/06dwhite.svg';
import stormWhite from '../icons/07dwhite.svg';
import fogWhite from '../icons/09dwhite.svg';

const City = () => {
    const [cityName, setCityName] = useState("");
    const [actualWeatherData, setActualWeatherData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [iconTheme, setIconTheme] = useState(dark_mode);
    const [icon, setIcon] = useState(null);

    const handleInputCity = (e) =>{
        setCityName(e.target.value)
    }

    const getWeatherIcon = (iconId) =>{
        if(document.body.classList.contains('dark_theme')){
            switch(true){
                case iconId >= 200 && iconId<=232:
                    setIcon(stormWhite);
                break;
                case iconId>=300 && iconId<=321:
                    // setIcon(drizzle)
                    setIcon(chanceRainWhite);
                    break;
                case iconId >=500 && iconId<=531:
                    setIcon(rainWhite);
                break;
                case iconId >= 600 && iconId<=622:
                    setIcon(snow);
                break;
                case iconId >= 701 && iconId<=781:
                    setIcon(fogWhite);
                break;
                case iconId === 800:
                    setIcon(clear);
                break;
                case iconId === 801:
                    setIcon(mostlySunnyWhite);
                break;
                case iconId === 802:
                    setIcon(mostlyCloudyWhite);
                break;
                case iconId >= 803 && iconId <=804:
                    setIcon(cloudyWhite);
                break;
                default:
                    setIcon(undefinedIcon);
                break;
    
                }
        }else{
            switch(true){
                case iconId >= 200 && iconId<=232:
                    setIcon(storm);
                break;
                case iconId>=300 && iconId<=321:
                    // setIcon(drizzle)
                    setIcon(chanceRain);
                    break;
                case iconId >=500 && iconId<=531:
                    setIcon(rain);
                break;
                case iconId >= 600 && iconId<=622:
                    setIcon(snow);
                break;
                case iconId >= 701 && iconId<=781:
                    setIcon(fog);
                break;
                case iconId === 800:
                    setIcon(clear);
                break;
                case iconId === 801:
                    setIcon(mostlySunny);
                break;
                case iconId === 802:
                    setIcon(mostlyCloudy);
                break;
                case iconId >= 803 && iconId <=804:
                    setIcon(cloudy);
                break;
                default:
                    setIcon(undefinedIcon);
                break;
    
                }
        }
        
    }

    const actualCheckWeather = () =>{
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3addbbcbad994c4e8d2b11350c463c1f`,{
            method: 'GET'
        } )
        .then(response => response.json())
        .then(data => {
            setActualWeatherData(data);
            dailyWeather(data);     
            getWeatherIcon(data.weather[0].id)

        })
        .catch((error) => console.error('Error', error));
    }
 
    const dailyWeather = (data) =>{
        fetch(` https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&lang=EN&appid=3addbbcbad994c4e8d2b11350c463c1f`,{
            method: 'GET'
        } )
        .then(response => response.json())
        .then(data => {
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
                        actualWeatherData != null && getWeatherIcon(actualWeatherData.weather[0].id);
                    }else{
                        setIconTheme(dark_mode);
                        actualWeatherData != null && getWeatherIcon(actualWeatherData.weather[0].id);
                    }
                    // document.body.classList.contains('dark_theme') ? light_mode : dark_mode;
                }}>
                    <img src={iconTheme} alt="change theme" id="img"/>
            </div>
         </div>
     </div>

        <div className="weather_result" id="weather_result">
            <WeatherResult actualWeather={actualWeatherData} dataWeather={weatherData} icon={icon} />
        </div>
     </>
  );
}

export default City;
