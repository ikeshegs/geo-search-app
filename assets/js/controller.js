import searchInput from './searchInput.js';
import getWeather from './getWeather.js';

// const cusUrl = location.search.replace('?', '');

const reloadPage = document.getElementById('logo');

// Automatically reload the page when click
reloadPage.addEventListener('click', () => {
  location.reload();
});

document.getElementById('search-btn').addEventListener('click', e => {
  e.preventDefault();
  if (document.getElementById('search').value === '') {
    window.alert('Please Input a valid Location');
    return false;
  }
  searchInput();
  getWeather();
});

document.getElementById('search-btn').addEventListener('click', e => {
  e.preventDefault();

  if (location.search) {
    // searchInput();
    // getWeather();
  }
});
