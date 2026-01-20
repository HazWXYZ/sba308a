// app.js
// Main application file that brings everything together

// Import functions from our other modules
// This demonstrates the ES6 module system
import { getCurrentWeather, getForecast } from './weatherService.js';
import { 
    displayWeather, 
    displayForecast, 
    showError, 
    hideError, 
    showLoading, 
    hideLoading, 
    hideWeather 
} from './uiController.js';

/**
 * Main function to search for weather
 * This is an async function because it needs to wait for API responses
 */
async function searchWeather() {
    // Get the city name from the input field
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim(); // trim() removes extra spaces

    // Validate that user entered something
    if (!city) {
        showError('Please enter a city name');
        return; // Exit the function early if no city entered
    }

    // Hide any previous errors
    hideError();
    
    // Show loading indicator to let user know we're fetching data
    showLoading();
    
    // Hide previous weather data while loading new data
    hideWeather();

    try {
        // Make both API calls at the same time using Promise.all
        // This is more efficient than calling them one after another
        // We use await to wait for both promises to resolve
        const [weatherData, forecastData] = await Promise.all([
            getCurrentWeather(city),
            getForecast(city)
        ]);

        // Once we have the data, hide loading indicator
        hideLoading();

        // Display the weather data we received
        displayWeather(weatherData);
        displayForecast(forecastData);

    } catch (error) {
        // If something went wrong (city not found, network error, etc.)
        // Hide loading and show an error message
        hideLoading();
        showError('City not found. Please try again.');
        
        // Log the error to the console for debugging
        console.error('Error fetching weather:', error);
    }
}

/**
 * Initialize the app - set up event listeners
 * This function runs when the page loads
 */
function init() {
    // Get references to the search button and input field
    const searchBtn = document.getElementById('searchBtn');
    const cityInput = document.getElementById('cityInput');

    // Add click event listener to search button
    // When the button is clicked, run the searchWeather function
    searchBtn.addEventListener('click', () => {
        searchWeather();
    });

    // Add keypress event listener to input field
    // This allows users to press Enter to search instead of clicking the button
    cityInput.addEventListener('keypress', (e) => {
        // Check if the key pressed was Enter (key code 13)
        if (e.key === 'Enter') {
            searchWeather();
        }
    });

    // Log to console that app is ready
    console.log('Weather app initialized and ready!');
}

// When the DOM is fully loaded, initialize the app
// This ensures all HTML elements exist before we try to access them
document.addEventListener('DOMContentLoaded', init);