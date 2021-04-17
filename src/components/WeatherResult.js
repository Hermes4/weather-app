import '../style/content.scss';
import DayWeather from './DayWeather';

const WeatherResult = (props) => {
    console.log(props)
    // eslint-disable-next-line eqeqeq
if(props.actualWeather != null && props.actualWeather.cod == 200 && props.dataWeather != null ){
    const icon = `../icons/${props.actualWeather.weather[0].icon}.png`;
    const temperature = Math.round(props.actualWeather.main.temp-273.15);
    
    // if(props.dataWeather != null){
        const dailyData = props.dataWeather.daily;
        const dailyWeather = dailyData.map(day => (
        <DayWeather key={day.dt} dataDay={day}/>
        ));
    //     return dailyWeather
    // }
    
        return (
            <div className="content">
                <div className="content_box">
                    <div className="weather_box">
                        <div className="font weather_box_font">
                            {props.actualWeather.name}, {props.actualWeather.sys.country}
                        </div>
                        <div className="weather_icon" >
                            <img src={icon} alt="Weather Icon"/>
                        </div>
                        <div className="temperature">
                            {temperature}°
                        </div>
                    
                    </div>

                    <div className="weather_box_next">
                        {dailyWeather}
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
