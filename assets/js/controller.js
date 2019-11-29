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
});
