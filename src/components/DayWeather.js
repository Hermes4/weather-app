// import { useState } from 'react';
import '../style/content.scss';
import arrow_down from '../icons/arrow_down.svg'

const DayWeather = (props) => {
  // console.log(props)
    const date = props.dataDay.dt + "000";
    const dateInt = parseInt(date);
    const someDate = new Date(dateInt);
    const dateNumbers = someDate.toLocaleDateString();
    const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const numberWeekDay = someDate.getDay();

    // const [dropDay, setDropDay] = useState(false);
    const handleDropDay = () =>{
      props.handleClickDeatails(props.dataDay);
      // setDropDay(prevState => !prevState);
    }

  return (
    <>
    <div className="week_day_row" id='week_day_row'>
       {dateNumbers}, {weekDay[numberWeekDay]}
       <div className="arrow_down" id="arrow_down"
       onClick={handleDropDay}>
         <img src={arrow_down} alt="" className={document.body.classList.contains('dark_theme') ? 'arrow_down_color' : null}/>
       </div>
    </div>
    {props.selectedDay && <div className="dropDay">
      {props.dataDay.weather[0].main}
    </div>}
    
    </>
  );
}

export default DayWeather;
