import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";

import Header from "./components/Header";
import Stats from "./components/Stats";
import Chart from "./components/Chart";
import ForecastStats from "./components/ForecastStats";

function App() {
  const BASE_URL = "https://codementor-weather-app-api.herokuapp.com";

  const [weatherData, setWeatherData] = useState("");
  const [cityName, setCityName] = useState("");
  const [next7days, setNext7days] = useState({ temps: [], days: [] });

  const handleWeatherData = (data) => {
    const daysData = data.list.map((day) => {
      const newDate = DateTime.fromSeconds(day.dt);
      return { ...day, newDate };
    });

    data.list = daysData;

    const tempsData = [];
    const days = [];

    for (let i = 1; i < 7; i++) {
      const temp = daysData[i].temp.day;
      tempsData.push(temp);
    }

    for (let i = 1; i < 7; i++) {
      const date = daysData[i].newDate.toLocaleString();
      days.push(date);
    }

    const forecast = {
      temps: tempsData,
      days: days,
    };

    setWeatherData(data);
    setCityName(data.city.name);
    setNext7days(forecast);
  };

  const getDataWithName = async (cityName) => {
    try {
      const apiURL = `${BASE_URL}/city/${cityName}`;
      const response = await axios.get(apiURL);
      let data = response.data;
      handleWeatherData(data);
    } catch (error) {
      toast.error("Ops, city not found! Try another!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      let geoLocationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const apiURL = `${BASE_URL}/coord/${latitude}/${longitude}`;
            const response = await axios.get(apiURL);
            let data = response.data;
            handleWeatherData(data);
          } catch (error) {
            toast.error("Ops, something went wrong...", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        },
        (err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        },
        geoLocationOptions
      );
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center w-screen sm:h-screen mt-4 sm:mt-0 bg-gray-100">
        <div className="bg-blue-300 w-11/12 sm:w-4/5 xl:w-3/5 p-2 sm:p-4 rounded-lg">
          <div className="bg-white p-3 rounded text-gray-500">
            <h1 className="text-2xl text-center font-bold mb-6 text-blue-700">Weather Forecast</h1>
            <Header getDataWithName={getDataWithName} cityName={cityName} setCityName={setCityName} />
            {weatherData ? (
              <div>
                <div className="flex flex-wrap sm:flex-nowrap justify-between my-4">
                  <div className="w-full mb-4 sm:mb-0">
                    <Stats weatherData={weatherData} />
                  </div>
                  <div className="w-full sm:max-w-1/2">
                    <p className="mb-4 text-center font-bold">Temperature - Next 6 days (Celsius)</p>
                    <Chart next7days={next7days} />
                  </div>
                </div>
                <div className="w-full flex flex-wrap justify-evenly">
                  {weatherData.list.slice(1).map((day) => {
                    return <ForecastStats day={day} key={day.dt} />;
                  })}
                </div>
              </div>
            ) : (
              <p className="text-center">Insert a city name and get the weather</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
