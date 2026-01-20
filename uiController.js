// uiController.js
// This module handles all updates to the user interface

/**
 * Function to display current weather data on the page
 * @param {Object} data - Weather data object from the API
 */
export function displayWeather(data) {
    // Get references to all the HTML elements we need to update
    const weatherDisplay = document.getElementById('weatherDisplay');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const feelsLike = document.getElementById('feelsLike');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const pressure = document.getElementById('pressure');
    const weatherIcon = document.getElementById('weatherIcon');

    // Update the city name with country code
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    
    // Round the temperature and display it with degree symbol
    temperature.textContent = `${Math.round(data.main.temp)}°F`;
    
    // Display the weather description (e.g., "clear sky", "light rain")
    description.textContent = data.weather[0].description;
    
    // Display all the additional weather details
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°F`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} mph`;
    pressure.textContent = `${data.main.pressure} hPa`;

    // Update the weather icon based on conditions
    weatherIcon.textContent = getWeatherEmoji(data.weather[0].main);

    // Show the weather display (it's hidden by default with display: none in CSS)
    weatherDisplay.style.display = 'block';
}

/**
 * Function to display the 5-day forecast
 * @param {Object} data - Forecast data object from the API
 */
export function displayForecast(data) {
    const forecastDisplay = document.getElementById('forecastDisplay');
    const forecastGrid = document.getElementById('forecastGrid');

    // Clear any previous forecast data
    forecastGrid.innerHTML = '';

    // The API returns data every 3 hours (8 times per day)
    // We filter to get one reading per day (every 8th item)
    // Then we take only the first 5 days
    const dailyData = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);

    // Loop through each day and create a forecast card
    dailyData.forEach(day => {
        // Create a new div element for each forecast card
        const card = document.createElement('div');
        card.className = 'forecast-card';

        // Convert the Unix timestamp to a JavaScript Date object
        // The API provides timestamps in seconds, but JavaScript uses milliseconds
        const date = new Date(day.dt * 1000);
        
        // Get the day name (e.g., "Mon", "Tue", "Wed")
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        // Build the HTML content for the forecast card
        card.innerHTML = `
            <div style="font-size: 14px; margin-bottom: 10px; color: #666;">
                ${dayName}
            </div>
            <div style="font-size: 32px; margin-bottom: 10px;">
                ${getWeatherEmoji(day.weather[0].main)}
            </div>
            <div style="font-size: 20px; font-weight: bold; color: #333;">
                ${Math.round(day.main.temp)}°F
            </div>
            <div style="font-size: 12px; color: #888; margin-top: 5px;">
                ${day.weather[0].main}
            </div>
        `;

        // Add the card to the forecast grid
        forecastGrid.appendChild(card);
    });

    // Show the forecast display
    forecastDisplay.style.display = 'block';
}

/**
 * Helper function to get an emoji based on weather type
 * @param {string} weatherType - The main weather condition (e.g., "Rain", "Clear")
 * @returns {string} - An emoji representing the weather
 */
function getWeatherEmoji(weatherType) {
    // Convert to lowercase for easier comparison
    const weather = weatherType.toLowerCase();
    
    // Return appropriate emoji based on weather condition
    if (weather.includes('rain')) return '🌧️';
    if (weather.includes('cloud')) return '☁️';
    if (weather.includes('clear')) return '☀️';
    if (weather.includes('snow')) return '❄️';
    if (weather.includes('thunder')) return '⛈️';
    
    // Default emoji if none of the conditions match
    return '🌤️';
}

/**
 * Function to show error messages to the user
 * @param {string} message - The error message to display
 */
export function showError(message) {
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
}

/**
 * Function to hide error messages
 */
export function hideError() {
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.style.display = 'none';
}

/**
 * Function to show loading indicator while fetching data
 */
export function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

/**
 * Function to hide loading indicator
 */
export function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

/**
 * Function to hide weather displays
 * Used when starting a new search
 */
export function hideWeather() {
    document.getElementById('weatherDisplay').style.display = 'none';
    document.getElementById('forecastDisplay').style.display = 'none';
}