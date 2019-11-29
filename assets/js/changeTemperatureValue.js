// The Unit of Value is Kelvin
const convertToCelsius = () => {
  const value = temperatureInKelvin;
  const celsius = value - 273.15;
  document.getElementById('temp').innerHTML = `Temperature: ${Math.round(
    celsius,
  )} °C`;
};

// The Unit of Value is Kelvin
const convertToFahrenheit = () => {
  const value = temperatureInKelvin;
  const fahrenheit = value * 1.8 - 459.67;
  document.getElementById('temp').innerHTML = `Temperature: ${Math.round(
    fahrenheit,
  )} °F`;
};

document
  .getElementById('celsius-button')
  .addEventListener('click', convertToCelsius);

document
  .getElementById('fahrenheit-button')
  .addEventListener('click', convertToFahrenheit);
