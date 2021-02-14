import React from "react";

function Header({ getDataWithName, cityName, setCityName }) {
  const handleCity = (e) => {
    e.preventDefault();
    const city = e.target[0].value;
    if (city) {
      getDataWithName(city);
    }
  };

  return (
    <div className="mb-10 text-center">
      <form onSubmit={(e) => handleCity(e)}>
        <label htmlFor="city" className="mr-2">
          Your city:
        </label>
        <input
          type="text"
          name="city"
          id="city"
          className="max-w-max w-full mt-2 rounded px-2 border-blue-300 border-2 focus:outline-none"
          value={cityName}
          onChange={(e) => {
            setCityName(e.target.value);
          }}
        />
        <button
          type="submit"
          className="sm:ml-4 sm:mt-0 mt-4 bg-transparent border-2 border-blue-300 text-blue-400 rounded py-1 px-2 hover:bg-blue-300 hover:text-white transition-all focus:outline-none"
        >
          Get Weather
        </button>
      </form>
    </div>
  );
}

export default Header;
