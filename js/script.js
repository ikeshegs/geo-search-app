const searchForm = document.getElementById('search-form');

// const reloadPage = () => {
//   document.location.reload(true);
// };

const searchString = e => {
  e.preventDefault();
  // reloadPage();

  const imageElement = document.createElement('img');
  const searchInput = document.getElementById('search').value;
  const content = document.getElementById('content');

  const key = 'CJ2B3G3xKvIbl9uVsfyBAAXdGqAF5G2m';

  imageElement.setAttribute(
    'src',
    `https://www.mapquestapi.com/staticmap/v5/map?key=${key}&center=${searchInput}`,
  );
  imageElement.setAttribute('classname', 'map-image');
  content.appendChild(imageElement);

  // reloadPage();
};

searchForm.addEventListener('submit', searchString);