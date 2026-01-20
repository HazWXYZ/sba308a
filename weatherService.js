// weatherService.js
// This module handles all communication with the OpenWeatherMap API

const API_KEY = 'f0b2ca39e36839fd324379133d020ff8';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Function to get current weather for a city
 * @param {string} city - The name of the city to search for
 * @returns {Promise} - Promise that resolves to weather data
 */
export async function getCurrentWeather(city) {
    try {
        // Build the API URL with the city name and API key
        // Using 'imperial' units to get Fahrenheit temperatures
        const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=imperial`;
        
        // Use fetch to make the GET request to the API
        // await pauses execution until the promise resolves
        const response = await fetch(url);
        
        // Check if the response was successful (status code 200-299)
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        // Convert the response to JSON format
        // This is also asynchronous, so we use await
        const data = await response.json();
        return data;
    } catch (error) {
        // If there's an error, throw it so we can handle it elsewhere
        console.error('Error in getCurrentWeather:', error);
        throw error;
    }
}

/**
 * Function to get 5-day forecast for a city
 * @param {string} city - The name of the city to search for
 * @returns {Promise} - Promise that resolves to forecast data
 */
export async function getForecast(city) {
    try {
        // Build the forecast API URL
        const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=imperial`;
        
        // Fetch the forecast data from the API
        const response = await fetch(url);
        
        // Check if request was successful
        if (!response.ok) {
            throw new Error('Forecast not available');
        }
        
        // Return the JSON data
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getForecast:', error);
        throw error;
    }
}