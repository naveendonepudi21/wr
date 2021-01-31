import { Line } from "@reactchartjs/react-chart.js";
import { useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";

function App() {
  const [weatherData, setWeatherData] = useState("");
  const [cityName, setCityName] = useState("");
  const [next4days, setNext4days] = useState({ temps: [], days: [] });

  const apiKey = "fb8e89313f86e25917988c0d3d19ebaf";

  const apiURL = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&appid=${apiKey}&units=metric`;

  const handleCity = (city) => {
    setCityName(city);
  };

  const getData = async () => {
    const response = await axios.get(apiURL);
    let data = response.data;
    console.log(data.list);
    let daysData = data.list.map((day) => {
      let newDate = DateTime.fromSeconds(day.dt);
      return { ...day, newDate };
    });

    data.list = daysData;

    let forecast = {
      temps: [
        data.list[1].temp.day,
        data.list[2].temp.day,
        data.list[3].temp.day,
        data.list[4].temp.day,
        data.list[5].temp.day,
        data.list[6].temp.day,
      ],
      days: [
        data.list[1].dt.toLocaleString(DateTime.DATE_SHORT),
        data.list[2].dt.toLocaleString(DateTime.DATE_SHORT),
        data.list[3].dt.toLocaleString(DateTime.DATE_SHORT),
        data.list[4].dt.toLocaleString(DateTime.DATE_SHORT),
        data.list[5].dt.toLocaleString(DateTime.DATE_SHORT),
        data.list[6].dt.toLocaleString(DateTime.DATE_SHORT),
      ],
    };

    setNext4days(forecast);
    setWeatherData(data);
  };

  const chartData = {
    labels: next4days.days,
    datasets: [
      {
        label: "Temperature",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: next4days.temps,
      },
    ],
  };

  const chartOptions = {
    options: {
      layout: {
        padding: {
          left: 5550,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
    },
  };

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
        <div className="bg-blue-300 max-w-screen-md w-full p-8 rounded-lg">
          <div className="bg-white p-8 rounded text-gray-500">
            <h1 className="text-2xl font-bold mb-6 text-blue-700">Weather Forescast</h1>
            <div id="header" className="mb-10">
              <label htmlFor="city" className="mr-2">
                Your city:
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="rounded px-2 border-blue-300 border-2"
                onChange={(e) => handleCity(e.target.value)}
              />
              <button
                className="ml-4 bg-transparent border-2 border-blue-300 text-blue-400  rounded py-1 px-2"
                onClick={() => {
                  getData();
                }}
              >
                Get Weather
              </button>
            </div>
            {weatherData ? (
              <div className="flex justify-between my-4">
                <div id="left" className="w-full">
                  <div id="current-weather">
                    <p>{weatherData.list[0].newDate.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</p>
                    <div className="flex my-4">
                      <img
                        alt={weatherData.list[0].weather[0].description}
                        title={weatherData.list[0].weather[0].description}
                        src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
                      />
                      <div className="ml-4">
                        <h3 className="text-4xl">{Math.round(weatherData.list[0].temp.day)}º</h3>
                        <p>Max: {Math.round(weatherData.list[0].temp.max)}º</p>
                        <p>Min: {Math.round(weatherData.list[0].temp.min)}º</p>
                      </div>
                    </div>
                    <h4 className="mb-2">Humidity: {weatherData.list[0].humidity}%</h4>
                    <h4>Wind Speed: {weatherData.list[0].speed} Km/h</h4>
                  </div>
                </div>
                <div id="right" className="w-full">
                  <p>Temperature</p>
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            ) : (
              <p>Insert a city name and get the weather</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
