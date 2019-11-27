const searchForm = document.getElementById('search-form');

const reloadPage = document.getElementById('reload');

const changeTemperature = document.getElementById('change-temp');
let temperatureInKelvin;

// Automatically reload the page when click
reloadPage.addEventListener('click', () => {
  location.reload();
});

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

      const shareToFacebookButton = document.createElement('button');
      shareToFacebookButton.setAttribute('class', 'fb-share-button');
      shareToFacebookButton.setAttribute('onclick', 'shareToFacebook');
      shareToFacebookButton.setAttribute(
        'data-href',
        'https://ikeshegs.github.io/geo-search-app/',
      );
      shareToFacebookButton.setAttribute('data-layout', 'button_count');
      shareToFacebookButton.innerHTML = 'Share To Facebook';
      document.querySelector('.share-post').appendChild(shareToFacebookButton);
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

const shareToFacebook = () => {
  // eslint-disable-next-line func-names
  (function(d, s, id) {
    let js;
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};

searchForm.addEventListener('submit', searchString);
searchForm.addEventListener('submit', getWeather);
