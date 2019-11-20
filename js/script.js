const searchForm = document.getElementById('search-form');

const searchString = e => {
  e.preventDefault();

  const searchInput = document.getElementById('search').value;

  const mapboxAccessToken =
    'pk.eyJ1IjoiaWtlc2hlZ3MiLCJhIjoiY2szNzh6bHJlMDE0djNnbzJqcHFsNDZjMCJ9.Ro91XJh2zaKi894mXTPoTw';

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchInput}.json?access_token=${accessToken}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      mapboxgl.accessToken = mapboxAccessToken;

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
    })
    .catch(err => console.log(err));
};

searchForm.addEventListener('submit', searchString);
