// import logo from '../logo.svg';
// import '../style/App.scss';
// import City from './City';

const WeatherResult = (props) => {
    console.log(props)
    // eslint-disable-next-line eqeqeq
    if(props.data != null && props.data.cod == 200){
        return (
            <div className="weather_box">
                {props.data.city.name}
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
