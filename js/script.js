const searchForm = document.getElementById('search-form');

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
      }
    })
    .catch();
};

const getWeather = e => {
  e.preventDefault();

  const searchInput = document.getElementById('search').value;

  const openWeatherId = '227cf83c61fac1850fb651932dcec580';

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${openWeatherId}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      document.getElementById('temp').innerHTML = `Temperature: ${data.main.temp}`;
      document.getElementById('humidity').innerHTML = `Humidity: ${data.main.humidity}`;
      document.getElementById('weather-condition').innerHTML = `Weather Condition: ${data.weather[0].main}`;
      document.getElementById('wind-speed').innerHTML = `Wind Speed: ${data.wind.speed}`;
    })
    .catch()
}

searchForm.addEventListener('submit', searchString);
searchForm.addEventListener('submit', getWeather);