const apiKey = 'f5d875e5742320af550f4d2c9b3bf8ed'; // oopsies

// DOM elements for weather data display
const weatherIconElem = document.getElementById('weather-icon');
const currentTempElem = document.getElementById('current-temp');
const tempCelsiusElem = document.getElementById('temp-celsius');
const tempFahrenheitElem = document.getElementById('temp-fahrenheit');
const errorElem = document.getElementById('error-message');

// Weather conditions and their corresponding emojis
const weatherEmojis = {
  "Clear": "☀️",
  "Clouds": "☁️",
  "Rain": "🌧️",
  "Drizzle": "🌦️",
  "Thunderstorm": "⚡",
  "Snow": "❄️",
  "Mist": "🌫️",
};

// Global variable to hold the fetched weather data
let weatherData = null;

// Fetch weather data from OpenWeather API
async function fetchWeatherData() {
  const city = "Bucharest";
  const country = "RO"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Handle errors if the API response is not successful
    if (data.cod !== 200) throw new Error(data.message || 'Failed to fetch weather data.');

    weatherData = data; // Store fetched data globally
    updateWeatherUI(data); // Update UI with the fetched data
  } catch (error) {
    errorElem.textContent = `Error: ${error.message}`; // Display error message
  }
}

// Update UI with the fetched weather data
function updateWeatherUI(data) {
  const primaryWeather = data.weather[0];
  const weatherCondition = primaryWeather.main;
  const emoji = weatherEmojis[weatherCondition] || "🌈"; // Default emoji for unknown weather

  // Update DOM with weather info
  weatherIconElem.textContent = emoji;
  currentTempElem.textContent = `${Math.round(data.main.temp)}`;

  // Ensure Celsius is active by default
  tempCelsiusElem.classList.add('active');
}

// Toggle temperature units between Celsius and Fahrenheit
function toggleTemperature(unit) {
  if (!weatherData) return;

  const temp = weatherData.main.temp;
  let displayTemp = unit === 'F' ? (temp * 9 / 5) + 32 : temp; // Convert to Fahrenheit if needed

  // Update the displayed temperature
  currentTempElem.textContent = `${Math.round(displayTemp)}`;

  // Toggle active class for temperature unit buttons
  tempCelsiusElem.classList.toggle('active', unit === 'C');
  tempFahrenheitElem.classList.toggle('active', unit === 'F');
}

// Event listeners for temperature unit buttons
tempCelsiusElem.addEventListener('click', () => toggleTemperature('C'));
tempFahrenheitElem.addEventListener('click', () => toggleTemperature('F'));

// Fetch weather data when the DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchWeatherData);
