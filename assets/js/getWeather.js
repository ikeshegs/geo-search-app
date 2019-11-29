let temperatureInKelvin;
const changeTemperature = document.getElementById('change-temp');

const getWeather = () => {
  const searchInput = document.getElementById('search').value;

  const openWeatherId = '227cf83c61fac1850fb651932dcec580';

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${openWeatherId}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      temperatureInKelvin = data.main.temp;

      document.getElementById(
        'temp',
      ).innerHTML = `Temperature: ${data.main.temp} K`;
      document.getElementById(
        'humidity',
      ).innerHTML = `Humidity: ${data.main.humidity} %`;
      document.getElementById(
        'weather-condition',
      ).innerHTML = `Weather Condition: ${data.weather[0].main}`;
      document.getElementById(
        'wind-speed',
      ).innerHTML = `Wind Speed: ${data.wind.speed} m/s`;

      const tempChangeButton = document.createElement('button');
      tempChangeButton.setAttribute('class', 'toggle-temp');
      tempChangeButton.setAttribute('class', 'temp-button');
      tempChangeButton.setAttribute('id', 'change-temp');
      tempChangeButton.setAttribute('onclick', 'toggleTemperature');
      // tempChangeButton.setAttribute('type', 'submit');
      tempChangeButton.innerHTML = '°C/°F';

      document.querySelector('.temp-container').appendChild(tempChangeButton);
    })
    .catch(err => {
      if (err) {
        const errorMessage = 'Could not get weather information';

        document.getElementById('temp').innerHTML = errorMessage;
        document.getElementById('humidity').innerHTML = errorMessage;
        document.getElementById('weather-condition').innerHTML = errorMessage;
        document.getElementById('wind-speed').innerHTML = errorMessage;
      }
    });
};

// The Unit of Value is Kelvin
const convertToCelsius = value => {
  const celsius = value - 273.15;
  document.getElementById('temp').innerHTML = `Temperature: ${Math.round(
    celsius,
  )} °C`;
};

// The Unit of Value is Kelvin
const convertToFahrenheit = value => {
  const fahrenheit = value * 1.8 - 459.67;
  document.getElementById('temp').innerHTML = `Temperature: ${Math.round(
    fahrenheit,
  )} °F`;
};

const toggleTemperature = () => {
  const tempContainer = document.querySelector('.temp-container');
  const temp = document.getElementById('temp');

  if (temp.classList === 'kelvin') {
    convertToFahrenheit(temperatureInKelvin);
  }

  if (temp.classList === 'fahrenheit') {
    convertToCelsius(temperatureInKelvin);
  }
  // const tempId = document.querySelector('#temp');
  // console.log(tempId)
  // if (tempId.classList === 'kelvin') {
  //   convertToFahrenheit(temperatureInKelvin);
  // } else {
  //   tempId.classList.remove('kelvin');
  //   convertToCelsius(temperatureInKelvin);
  // }

  // tempId.classList.toggle('kelvin');
};

export default getWeather;
