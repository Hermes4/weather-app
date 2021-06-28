import '../style/content.scss';

const SelectDay = (props) => {
  console.log('selected', props)

  // const [selectedDayIcon, setSelectedDayIcon] = useState(props.fIconWeather(props.dataDay.weather[0].id));

  const temperatureMin = Math.round(props.dataDay.temp.min - 273.15);
  const temperatureMax = Math.round(props.dataDay.temp.max - 273.15);

  const temperatureMorn = Math.round(props.dataDay.temp.morn - 273.15);
  const temperatureAfter = Math.round(props.dataDay.temp.day - 273.15);
  const temperatureEve = Math.round(props.dataDay.temp.eve - 273.15);
  const temperatureNight = Math.round(props.dataDay.temp.night - 273.15);

  const feelsLikeMorn = Math.round(props.dataDay.feels_like.morn - 273.15);
  const feelsLikeAfter = Math.round(props.dataDay.feels_like.day - 273.15);
  const feelsLikeEve = Math.round(props.dataDay.feels_like.eve - 273.15);
  const feelsLikeNight = Math.round(props.dataDay.feels_like.night - 273.15);

  const sunriseData = props.dataDay.sunrise + "000";
  const sunriseInt = parseInt(sunriseData);
  const sunrise = new Date(sunriseInt);
  const sunriseString = sunrise.toLocaleTimeString().slice(0, -3);

  const sunsetData = props.dataDay.sunset + "000";
  const sunsetInt = parseInt(sunsetData);
  const sunset = new Date(sunsetInt);
  const sunsetString = sunset.toLocaleTimeString().slice(0, -3);

  // const [dropDay, setDropDay] = useState(false);
  // const handleDropDay = () =>{
  //   props.handleClickDeatails(props.dataDay);
  //   // setDropDay(prevState => !prevState);
  // }

  return (
    <>
      <div className="dropDay ">
        <div className="dropDay_first_info">
          <div className="dropDay_icon">
            <img src={props.fIconWeather(props.dataDay.weather[0].id)} alt="Weather Icon" />
          </div>
          <div className="dropDay_info">
            <div className="dropDay_info_description  font">
              {props.dataDay.weather[0].description}
            </div>
            <div className="dropDay_info_temp">
              The high will be {temperatureMax}°C ,
              the low will be {temperatureMin}°C
            </div>
          </div>
        </div>


        <div className="dropDay_add_info">
          <tr>
            <div className="dropDay_add_info_rain">
              Rain: {props.dataDay.rain ? props.dataDay.rain : 0} mm
            </div>
            <div className="dropDay_add_info_wind">
              Wind: {props.dataDay.wind_speed} m/s
            </div>
            <div className="dropDay_add_info_pressure">
              Pressure: {props.dataDay.pressure} hPa
            </div>
          </tr>
          <tr>
            <div className="dropDay_add_info_humidity">
              Humidity: {props.dataDay.humidity} %
            </div>
            <div className="dropDay_add_info_uv">
              UV: {props.dataDay.uvi}
            </div>
            <div className="dropDay_add_info_dew_point">
              Dew point: {props.dataDay.dew_point}
            </div>
          </tr>

        </div>
        <div className="dropDay_table_temp">
          <table>
            <tr>
              <th></th> <th>Morning</th> <th>Afternoon</th> <th>Evening</th> <th>Night</th>
            </tr>
            <tr>
              <td>Temperature</td> <td>{temperatureMorn}°C</td> <td>{temperatureAfter}°C</td> <td>{temperatureEve}°C</td> <td>{temperatureNight}°C</td>
            </tr>
            <tr>
              <td>Feels Like</td> <td>{feelsLikeMorn}°C</td> <td>{feelsLikeAfter}°C</td> <td>{feelsLikeEve}°C</td> <td>{feelsLikeNight}°C</td>
            </tr>
          </table>
        </div>

        <div className="sun_set-rise">
          <table>
            <tr><th>sunrise</th><th>sunset</th></tr>
            <tr><td>{sunriseString}</td><td>{sunsetString}</td></tr>
          </table>
        </div>

      </div>

    </>
  );
}

export default SelectDay;
