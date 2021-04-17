
const DayWeather = (props) => {
    const date = props.dataDay.dt + "000";
    const dateInt = parseInt(date);
    const someDate = new Date(dateInt);
    const dateNumbers = someDate.toLocaleDateString();
    const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const numberWeekDay = someDate.getDay();
  return (
    <div className="week_day_row">
       {dateNumbers}, {weekDay[numberWeekDay]}
    </div>
  );
}

export default DayWeather;
