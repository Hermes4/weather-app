// import { useState } from 'react';
import '../style/content.scss';
import arrow_down from '../icons/arrow_down.svg'

const DayWeather = (props) => {
  console.log(props)
    const date = props.dataDay.dt + "000";
    const dateInt = parseInt(date);
    const someDate = new Date(dateInt);
    const dateNumbers = someDate.toLocaleDateString();
    const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const numberWeekDay = someDate.getDay();

    const temperatureMin = Math.round(props.dataDay.temp.min-273.15);
    const temperatureMax = Math.round(props.dataDay.temp.max-273.15);

    // const [dropDay, setDropDay] = useState(false);
    const handleDropDay = () =>{
      props.handleClickDeatails(props.dataDay);
      // setDropDay(prevState => !prevState);
    }

  return (
    <>
    <div className="week_day_row" id='week_day_row' onClick={handleDropDay}>
        <div className="week_day_row_date">
            {dateNumbers}, {weekDay[numberWeekDay]}
        </div>
        <div className="week_day_row_icon">
       		<img src={props.fIconWeather(props.dataDay.weather[0].id)} alt="Weather Icon"/>
      	</div>  
        <div className="week_day_row_temp">
        {temperatureMax} / {temperatureMin}
        </div>
        
       <div className="arrow_down" id="arrow_down"
       >
         <img src={arrow_down} alt="" className={document.body.classList.contains('dark_theme') ? 'arrow_down_color' : null}/>
       </div>
    </div>
    {props.selectedDay && 
		<div className="dropDay">
			<div className="dropDay_icon">
       		<img src={props.fIconWeather(props.dataDay.weather[0].id)} alt="Weather Icon"/>
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
      
    </div>}
    
    </>
  );
}

export default DayWeather;
