import { DateTime } from "luxon";

function Stats({ weatherData }) {
  console.log(weatherData);
  return (
    <div>
      <p className="text-center">{weatherData.list[0].newDate.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</p>
      <p className="text-center">
        {weatherData.city.name}, {weatherData.city.country}
      </p>
      <div>
        <div className="flex my-4 justify-center">
          <img
            alt={weatherData.list[0].weather[0].description}
            title={weatherData.list[0].weather[0].description}
            src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
          />
          <div className="ml-8">
            <h3 className="text-4xl">{Math.round(weatherData.list[0].temp.day)}º</h3>
            <p className="text-sm">Max: {Math.round(weatherData.list[0].temp.max)}º</p>
            <p className="text-sm">Min: {Math.round(weatherData.list[0].temp.min)}º</p>
          </div>
        </div>
        <h4 className="mb-2 text-center">Humidity: {weatherData.list[0].humidity}%</h4>
        <h4 className="text-center">Wind Speed: {weatherData.list[0].speed} Km/h</h4>
      </div>
    </div>
  );
}

export default Stats;
