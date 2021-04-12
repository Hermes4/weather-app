// import logo from '../logo.svg';
// import '../style/App.scss';
// import City from './City';

const WeatherResult = (props) => {
    console.log(props)
    if(props.data != null){
        return (
            <div className="weather_box">
                {props.data.name}
            </div> 
          );
    }else{
        return (
            <div className="nothing">
                XD
            </div>
          );
    }
 
}

export default WeatherResult;
