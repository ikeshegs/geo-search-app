document.getElementById('celsius-button').style.display = 'none';
document.getElementById('fahrenheit-button').style.display = 'none';
document.getElementById('share').style.display = 'none';

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

  document.getElementById('celsius-button').style.display = 'inline';
  document.getElementById('fahrenheit-button').style.display = 'inline';
  document.getElementById('share').style.display = 'flex';
});
