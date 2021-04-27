import { useState } from 'react';
import '../style/content.scss';
import DayWeather from './DayWeather';

const WeatherResult = (props) => {
    
    const [selectedDay, setSelectedDay] = useState(false);
    const [selectedDayDetails, setSelectedDayDetails] = useState(null);
    
    // eslint-disable-next-line eqeqeq
if(props.actualWeather != null && props.actualWeather.cod == 200 && props.dataWeather != null ){
    console.log(props)
    
    const handleSelectedDay = (dayClicked) =>{
        setSelectedDay(prevState => !prevState);
        setSelectedDayDetails(<DayWeather dataDay={dayClicked} handleClickDeatails={handleSelectedDay} selectedDay={true} fIconWeather={props.fIconWeather}/>);
      }

    const temperature = Math.round(props.actualWeather.main.temp-273.15);
    const temperatureFeelsLike = Math.round(props.actualWeather.main.feels_like-273.15);
    // const temperatureMin = Math.round(props.actualWeather.main.temp_min-273.15);
    // const temperatureMax = Math.round(props.actualWeather.main.temp_max-273.15);
    
        const dailyData = props.dataWeather.daily;
        const dailyWeather = dailyData.map(day => (
        <DayWeather key={day.dt} dataDay={day} handleClickDeatails={handleSelectedDay} selectedDay={false} fIconWeather={props.fIconWeather}/>
        ));

        return (
            <div className="content">
                <div className="content_box">
                    <div className="weather_box">
                        <div className="font weather_box_font">
                            {props.actualWeather.name}, {props.actualWeather.sys.country}
                        </div>
                        <div className="weather_icon" >
                            <img src={props.icon} alt="Weather Icon"/>
                        </div>
                        <div className="temperature">
                            <div className="temperature_main">
                                {temperature}°C
                            </div>

                            <div className="temperature_add">
                                <div className="feels_like">
                                    Feels like {temperatureFeelsLike}°C
                                </div>
                                <div className="description">
                                    {props.actualWeather.weather[0].description}
                                </div>
                                {/* <div className="temperature_min">
                                    The hight will be {temperatureMax}°
                                </div>
                                <div className="temperature_min">
                                    The low will be {temperatureMin}°
                                </div> */}
                            </div>
                          
                        </div>
                     
                            
                        
                    </div>

                    <div className="weather_box_next">
                        {selectedDay 
                        ? 
                        <div>
                            {selectedDayDetails}
                        </div>
                        : 
                        <div className="list" id='list'>
                            {dailyWeather}
                        </div>
                        }
                        
                    </div>
                </div>
            </div>
          );
    }else{
        return (
            <div className="nothing">
                XDD
                <div className="test">test</div>
            </div>
          );
    }
 
}

export default WeatherResult;
