import { DateTime } from "luxon";

function ForecastStats({ day }) {
  return (
    <div className="flex justify-evenly border-gray-300 border text-sm items-end p-2 mb-2 w-full md:w-auto rounded">
      <div className="mr-3 text-center">
        <img
          alt={day.weather[0].description}
          title={day.weather[0].description}
          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
        />
        <p className="text-center">{day.newDate.toLocaleString(DateTime.DATE_SHORT)}</p>
      </div>
      <div>
        <p className="">Temperature: {Math.round(day.temp.day)}º</p>
        <p className="">Humidity: {day.humidity}%</p>
        <p className="">Wind Speed: {day.speed} Km/h</p>
      </div>
    </div>
  );
}

export default ForecastStats;
