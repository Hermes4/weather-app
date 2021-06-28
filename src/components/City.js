import React, { useState } from 'react';
// import { FormattedMessage } from 'react-intl';
import '../style/header.scss';
import '../style/App.scss';
import WeatherResult from './WeatherResult';
import light_mode from '../icons/sun.png'
import dark_mode from '../icons/moon.png'
import langs from '../translate/langs.json';


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
    const [selectedDay, setSelectedDay] = useState(false);
    const [lang, setLang] = useState("EN");

    const handleInputCity = (e) => {
        setCityName(e.target.value)
    }

    const handleSelectLang = (e) => {
        setLang(e.target.value);
    }

    const getWeatherIcon = (iconId) => {
        if (document.body.classList.contains('dark_theme')) {
            switch (true) {
                case iconId >= 200 && iconId <= 232:
                    return stormWhite

                case iconId >= 300 && iconId <= 321:
                    return chanceRainWhite

                case iconId >= 500 && iconId <= 531:
                    return rainWhite

                case iconId >= 600 && iconId <= 622:
                    return snow

                case iconId >= 701 && iconId <= 781:
                    return fogWhite

                case iconId === 800:
                    return clear

                case iconId === 801:
                    return mostlySunnyWhite

                case iconId === 802:
                    return mostlyCloudyWhite

                case iconId >= 803 && iconId <= 804:
                    return cloudyWhite

                default:
                    return undefinedIcon

            }
        } else {
            switch (true) {
                case iconId >= 200 && iconId <= 232:
                    return storm

                case iconId >= 300 && iconId <= 321:
                    return chanceRain

                case iconId >= 500 && iconId <= 531:
                    return rain

                case iconId >= 600 && iconId <= 622:
                    return snow

                case iconId >= 701 && iconId <= 781:
                    return fog

                case iconId === 800:
                    return clear

                case iconId === 801:
                    return mostlySunny

                case iconId === 802:
                    return mostlyCloudy

                case iconId >= 803 && iconId <= 804:
                    return cloudy

                default:
                    return undefinedIcon

            }
        }

    }

    const actualCheckWeather = () => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${lang}&appid=3addbbcbad994c4e8d2b11350c463c1f`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setActualWeatherData(data);
                dailyWeather(data);
                getWeatherIcon(data.weather[0].id);

            })
            .catch((error) => {
                setActualWeatherData({ cod: 'error' });
                console.error('Error', error)
            });
    }

    const dailyWeather = (data) => {
        fetch(` https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&lang=${lang}&appid=3addbbcbad994c4e8d2b11350c463c1f`, {
            method: 'GET'
        })
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
                    <label htmlFor="city" ><div className="font input_label">
                        {langs[lang].header.title}
                        {/* <FormattedMessage id='header_title' defaultMessage='quote'/> */}
                    </div></label>
                    <input
                        className="font input input_city-name"
                        type="text"
                        name="city"
                        placeholder={langs[lang].header.placeholder}
                        value={cityName}
                        onChange={handleInputCity}
                    />
                    <div className="button_check">
                        <button className="btn" onClick={() => { actualCheckWeather(); setSelectedDay(false);/*checkWeather()*/ }}>{langs[lang].header.button}</button>
                    </div>
                    <div className="select_change_language">
                        <select name="lang" id="lang" value={lang} onChange={handleSelectLang}>
                            <option value="EN">English</option>
                            <option value="PL">Polski</option>
                        </select>
                    </div>
                    <div className="button_change_theme" onClick={() => {

                        document.body.classList.toggle('dark_theme');

                        if (document.body.classList.contains('dark_theme')) {
                            setIconTheme(light_mode);
                            actualWeatherData != null && getWeatherIcon(actualWeatherData.weather[0].id);
                            // setSelectedDay(false);
                        } else {
                            setIconTheme(dark_mode);
                            actualWeatherData != null && getWeatherIcon(actualWeatherData.weather[0].id);
                            // setSelectedDay(false);
                        }
                        // document.body.classList.contains('dark_theme') ? light_mode : dark_mode;
                    }}>
                        <img src={iconTheme} alt="change theme" id="img" />
                    </div>
                </div>
            </div>

            <div className="weather_result" id="weather_result">
                <WeatherResult actualWeather={actualWeatherData} dataWeather={weatherData} fIconWeather={getWeatherIcon} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
            </div>
        </>
    );
}

export default City;
