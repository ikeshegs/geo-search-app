const tempDetailsContainer = document.getElementById('cf');
const firstChild = tempDetailsContainer.firstElementChild;
const tempButton = document.querySelector('.temp-button');

// The Unit of Value is Kelvin
const convertToCelsius = () => {
  const value = temperatureInKelvin;
  const celsius = value - 273.15;
  firstChild.className = 'celsius';
  document.getElementById('temp').innerHTML = `Temperature: ${Math.round(
    celsius,
  )} °C`;
};

// The Unit of Value is Kelvin
const convertToFahrenheit = () => {
  const value = temperatureInKelvin;
  const fahrenheit = value * 1.8 - 459.67;
  firstChild.className = 'fahrenheit';
  document.getElementById('temp').innerHTML = `Temperature: ${Math.round(
    fahrenheit,
  )} °F`;
};

tempButton.addEventListener('click', () => {
  if (firstChild.className === 'kelvin') {
    convertToCelsius();
  } else if (firstChild.className === 'celsius') {
    convertToFahrenheit();
  } else {
    firstChild.className = 'kelvin';
    document.getElementById(
      'temp',
    ).innerHTML = `Temperature: ${temperatureInKelvin} K`;
  }
});
