const apiKey = 'f5d875e5742320af550f4d2c9b3bf8ed'; // oh noooo i left my key innnn

const weatherIconElem = document.getElementById('weather-icon');
const currentTempElem = document.getElementById('current-temp');
const tempCelsiusElem = document.getElementById('temp-celsius');
const tempFahrenheitElem = document.getElementById('temp-fahrenheit');
const errorElem = document.getElementById('error-message');

const weatherEmojis = {
  "Clear": "☀️",
  "Clouds": "☁️",
  "Rain": "🌧️",
  "Drizzle": "🌦️",
  "Thunderstorm": "⚡",
  "Snow": "❄️",
  "Mist": "🌫️",
};

let weatherData = null;

async function fetchWeatherData() {
  const city = "Bucharest";
  const country = "RO"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) throw new Error(data.message || 'Failed to fetch weather data.');

    weatherData = data;
    updateWeatherUI(data);
  } catch (error) {
    errorElem.textContent = `Error: ${error.message}`;
  }
}

function updateWeatherUI(data) {
  const primaryWeather = data.weather[0];
  const weatherCondition = primaryWeather.main;
  const emoji = weatherEmojis[weatherCondition] || "🌈"; 

  weatherIconElem.textContent = emoji;
  currentTempElem.textContent = `${Math.round(data.main.temp)}`;
  
  tempCelsiusElem.classList.add('active');
}

function toggleTemperature(unit) {
  if (!weatherData) return;

  const temp = weatherData.main.temp;
  let displayTemp = unit === 'F' ? (temp * 9 / 5) + 32 : temp;

  currentTempElem.textContent = `${Math.round(displayTemp)}`;

  tempCelsiusElem.classList.toggle('active', unit === 'C');
  tempFahrenheitElem.classList.toggle('active', unit === 'F');
}

tempCelsiusElem.addEventListener('click', () => toggleTemperature('C'));
tempFahrenheitElem.addEventListener('click', () => toggleTemperature('F'));

document.addEventListener('DOMContentLoaded', fetchWeatherData);
