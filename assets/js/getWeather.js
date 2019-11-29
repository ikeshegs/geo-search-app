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

      // const celsiusButton = document.createElement('button');
      // celsiusButton.setAttribute('class', 'toggle-temp');
      // celsiusButton.setAttribute('class', 'temp-button');
      // celsiusButton.setAttribute('id', 'celsius-button');
      // celsiusButton.setAttribute('onclick', 'convertToCelsius');
      // // tempChangeButton.setAttribute('type', 'submit');
      // celsiusButton.innerHTML = '°C';

      // const fahrenheitButton = document.createElement('button');
      // fahrenheitButton.setAttribute('class', 'toggle-temp');
      // fahrenheitButton.setAttribute('class', 'temp-button');
      // fahrenheitButton.setAttribute('id', 'fahrenheit-button');
      // fahrenheitButton.setAttribute('onclick', 'convertToFahrenheit');
      // // tempChangeButton.setAttribute('type', 'submit');
      // fahrenheitButton.innerHTML = '°F';

      // document.querySelector('.temp-container').appendChild(celsiusButton);
      // document.querySelector('.temp-container').appendChild(fahrenheitButton);
    })
    .catch(err => {
      if (err) {
        const errorMessage = 'Could not get weather information';

        document.getElementById('temp').innerHTML = errorMessage;
      }
    });
};

document.getElementById('search-btn').addEventListener('click', getWeather);
