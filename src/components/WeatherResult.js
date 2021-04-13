import '../style/content.scss';

const WeatherResult = (props) => {
    console.log(props)
    // eslint-disable-next-line eqeqeq
if(props.actualWeather != null && props.actualWeather.cod == 200 /*&& props.dataWeather != null && props.dataWeather.cod == 200*/){
    const icon = `../icons/${props.actualWeather.weather[0].icon}.png`;
    const temperature = Math.round(props.actualWeather.main.temp-273.15)
        return (
            <div className="content">
                <div className="weather_box">
                    <div className="font weather_box_font">
                        {props.actualWeather.name}, {props.actualWeather.sys.country}
                    </div>
                    <div className="weather_icon" >
                        <img src={icon} alt="Weather Icon"/>
                    </div>
                    <div className="temperature">
                        {temperature} °C
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
