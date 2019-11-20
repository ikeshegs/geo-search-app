const searchForm = document.getElementById('search-form');

const searchString = e => {
  e.preventDefault();
  // reloadPage();

  const imageElement = document.createElement('img');
  const searchInput = document.getElementById('search').value;
  const content = document.getElementById('content');

  // const key = 'CJ2B3G3xKvIbl9uVsfyBAAXdGqAF5G2m';

  const accessToken =
    'pk.eyJ1IjoiaWtlc2hlZ3MiLCJhIjoiY2szNzh6bHJlMDE0djNnbzJqcHFsNDZjMCJ9.Ro91XJh2zaKi894mXTPoTw';

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchInput}.json?access_token=${accessToken}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.features[0].geometry.coordinates);
    })
    .catch();

  // reloadPage();
};

searchForm.addEventListener('submit', searchString);