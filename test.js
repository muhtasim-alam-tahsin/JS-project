//const apiKey = 'https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e';
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const weatherContainer = document.getElementById('weatherContainer');



function getCurrentDate() {
    return new Date().toLocaleDateString('en-us', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e`
        );
        const data = await response.json();

        //
        if (data.cod === 200) {
            displayWeather(data)
        }
         else {
            alert('City not found.');
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Failed to fetch weather data.');
    }
}

function displayWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('currentDate').textContent = getCurrentDate();
    document.getElementById('temperature').textContent = `${data.main.temp}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    weatherContainer.style.display = 'block';
}


searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city !== '') {
        fetchWeather(city);
    }
});