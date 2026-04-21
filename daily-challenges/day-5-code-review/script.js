const API_KEY = 'caacf8cd7e57099f4ef05e63797a25c6'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const loading = document.getElementById('loading');
const errorEl = document.getElementById('error'); // renamed to avoid conflict
const weatherDisplay = document.getElementById('weather-display');

// Elements to update
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const pressure = document.getElementById('pressure');

async function getWeather(city) {
    const units = isCelcius ? 'metric' : 'imperial';
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    try {
        showLoading();
        hideError();

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            }
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        displayWeather(data);
        saveToHistory(city);
    } catch (err) {
        showError(err.message);
    } finally {
        hideLoading();
    }
}

async function getForecast(city) {
    const units = isCelcius ? 'metric' : 'imperial';
    const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`;

    try {
        showLoading();
        hideError();

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            }
            throw new Error('Failed to fetch forecast data');
        }

        const data = await response.json();
        displayForecast(data);
    } catch (err) {
        showError(err.message);
    } finally {
        hideLoading();
    }
}

function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    temperature.textContent = `${Math.round(data.main.temp)}°${isCelcius ? 'C' : 'F'}`;
    description.textContent = data.weather[0].description;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°${isCelcius ? 'C' : 'F'}`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;
    weatherDisplay.classList.remove('hidden');
    setBackground(data.weather[0].main);
}

function setBackground(condition) {
    const body = document.body;
    switch (condition.toLowerCase()) {
        case 'clear':
            body.style.backgroundColor = '#87CEEB';
            break;
        case 'clouds':
            body.style.backgroundColor = '#A9A9A9';
            break;
        case 'rain':
            body.style.backgroundColor = '#4682B4';
            break;
        default:
            body.style.backgroundColor = '#87CEEB';
    }
}

function displayForecast(data) {
    const forecastCards = document.getElementById('forecast-cards');
    forecastCards.innerHTML = '';

    const daily = {};
    data.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!daily[date]) {
            daily[date] = item;
        }
    });

    Object.keys(daily)
        .slice(0, 5)
        .forEach((date) => {
            const day = daily[date];
            const card = document.createElement('div');
            card.classList.add('forecast-card');

            card.innerHTML = `
        <h3>${new Date(day.dt * 1000).toLocaleDateString()}</h3>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather icon">
        <p>${Math.round(day.main.temp)}°${isCelcius ? 'C' : 'F'}</p>
        <p>${day.weather[0].description}</p>
      `;

            forecastCards.appendChild(card);
        });

    document.getElementById('forecast').classList.remove('hidden');
}

function showLoading() {
    loading.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function hideError() {
    errorEl.classList.add('hidden');
}

function displayHistory(history) {
    const searchHistoryList = document.getElementById('search-history');
    searchHistoryList.innerHTML = '';
    history.forEach((city) => {
        const li = document.createElement('li');
        li.textContent = city;
        li.addEventListener('click', () => {
            getWeather(city);
            getForecast(city);
        });
        searchHistoryList.appendChild(li);
    });
}

function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

    if (history[0]?.toLowerCase() === city.toLowerCase()) {
        return;
    }

    history = history.filter((c) => c.toLowerCase() !== city.toLowerCase());
    history.unshift(city);
    history = history.slice(0, 5);

    localStorage.setItem('searchHistory', JSON.stringify(history));
    displayHistory(history);
}

function loadHistory() {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    displayHistory(history);
}

let isCelcius = true;
const unitToggle = document.getElementById('unit-toggle');
unitToggle.addEventListener('click', () => {
    isCelcius = !isCelcius;
    unitToggle.textContent = isCelcius ? 'Switch to °F' : 'Switch to °C';
    const currentCity = cityName.textContent.split(',')[0];
    if (currentCity) {
        getWeather(currentCity);
        getForecast(currentCity);
    }
});

document.getElementById('geo-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, handleGeoError);
    } else {
        showError('Geolocation is not supported by this browser.');
    }
});

function handleGeoError() {
    showError('Unable to retrieve your location.');
}

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const units = isCelcius ? 'metric' : 'imperial';
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            displayWeather(data);
            saveToHistory(data.name);
            getForecast(data.name);
        })
        .catch(() => showError('Failed to fetch location weather data.'));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city).then(() => {
            getForecast(city);
        });
        cityInput.value = '';
    }
});

loadHistory();
