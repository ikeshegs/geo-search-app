const searchForm = document.getElementById('search-form');
const celsiusButton = document.getElementById('celsius');
const fahrenheitButton = document.getElementById('fahrenheit');

const reloadPage = document.getElementById('reload');

const changeTemperature = document.getElementById('change-temp');
let temperatureInKelvin;

// Automatically reload the page when click
reloadPage.addEventListener('click', () => {
  location.reload();
})

/*
 * Uses the Users Search input to get the locations coordinates.
 * Uses coordinates to get the map image
*/

const searchString = e => {
  e.preventDefault();

  const searchInput = document.getElementById('search').value;
  const mapboxAccessToken =
    'pk.eyJ1IjoiaWtlc2hlZ3MiLCJhIjoiY2szNzh6bHJlMDE0djNnbzJqcHFsNDZjMCJ9.Ro91XJh2zaKi894mXTPoTw';

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchInput}.json?access_token=${mapboxAccessToken}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      mapboxgl.accessToken = mapboxAccessToken;

      if (data) {
        const coordinates = {
          longitude: data.features[0].geometry.coordinates[0],
          latitude: data.features[0].geometry.coordinates[1],
        };
        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [coordinates.longitude, coordinates.latitude],
          zoom: 13,
        });

        // Add Marker to map
        const marker = new mapboxgl.Marker()
          .setLngLat([coordinates.longitude, coordinates.latitude])
          .addTo(map);
      }
    })
    .catch(err => {
      if (err) {
        document.getElementById('map').innerHTML = 'Map could not be loaded';
      }
    });
};

const getWeather = e => {
  e.preventDefault();

  const searchInput = document.getElementById('search').value;

  const openWeatherId = '227cf83c61fac1850fb651932dcec580';

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${openWeatherId}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      temperatureInKelvin = data.main.temp;
      
      document.getElementById('temp').innerHTML = `Temperature: ${data.main.temp} K`;
      document.getElementById('humidity').innerHTML = `Humidity: ${data.main.humidity}`;
      document.getElementById('weather-condition').innerHTML = `Weather Condition: ${data.weather[0].main}`;
      document.getElementById('wind-speed').innerHTML = `Wind Speed: ${data.wind.speed}`;
      
      const newButton = document.createElement('button');
      newButton.setAttribute('class', 'toggle-temp');
      newButton.setAttribute('class', 'temp-button')
      newButton.setAttribute('id', 'change-temp');
      newButton.setAttribute('type', 'submit');
      newButton.innerHTML = '°C/°F';

      document.querySelector('.temp-container').appendChild(newButton);

      // '<button class="toggle-temp" id="change-temp" type="submit">°C/°F</button>';
    })
    .catch(err => {
      if (err) {
        const errorMessage = 'Could not get weather information';

        document.getElementById('temp').innerHTML = errorMessage;
        document.getElementById('humidity').innerHTML = errorMessage;
        document.getElementById('weather-condition').innerHTML = errorMessage;
        document.getElementById('wind-speed').innerHTML = errorMessage;
      }
    })
};

// The Unit of Value is Kelvin
const convertToCelsius = (value) => {
  const celsius = value - 273.15;
  document.getElementById('temp').innerHTML = `Temperature: ${Math.round(celsius)} °C`;
}

// The Unit of Value is Kelvin
const convertToFahrenheit = (value) => {
  const fahrenheit = value * 1.8 - 459.67;
  document.getElementById('temp').innerHTML = `Temperature: ${Math.round(fahrenheit)} °F`;
}

const toggleTemperature = () => {
  // const btnContainer = document.querySelector('.btn-container');
  // if (btnContainer.classList === 'fah') {
  //   convertToFahrenheit(temperatureInKelvin);
  // }

  // if (celsiusButton.classList === 'cels') {
  //   convertToCelsius(temperatureInKelvin);
  // }
  const tempId = document.querySelector('#temp');
  console.log(tempId)
  if (tempId.classList === 'kelvin') {
    convertToFahrenheit(temperatureInKelvin);
  } else {
    tempId.classList.remove('kelvin');
    convertToCelsius(temperatureInKelvin);
  }

  tempId.classList.toggle('kelvin');
}

searchForm.addEventListener('submit', searchString);
searchForm.addEventListener('submit', getWeather);

changeTemperature.addEventListener('submit', toggleTemperature);

// celsiusButton.addEventListener('click', toggleTemperature);
// fahrenheitButton.addEventListener('click', toggleTemperature);