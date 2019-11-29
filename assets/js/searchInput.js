const cusUrl = location.search.replace('?', '');

const searchString = () => {
  // e.preventDefault();

  const searchInput = cusUrl || document.getElementById('search').value;
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

export default searchString;
