// script.js
document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name.');
    }
});

function fetchWeatherData(city) {
    const apiKey = 'f7c0a6847f2c6df72c3672fccf938b1f';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            updateWeatherInfo(data);
            updateBackground(data.weather[0].main);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function updateWeatherInfo(data) {
    const weatherInfo = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>${data.weather[0].description}</p>
    `;
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = weatherInfo;
    weatherInfoDiv.classList.add('visible');
}

function updateBackground(weather) {
    let gradient;
    switch (weather.toLowerCase()) {
        case 'clear':
            gradient = 'linear-gradient(to right, #f7971e, #ffd200)';
            break;
        case 'clouds':
            gradient = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
            break;
        case 'rain':
            gradient = 'linear-gradient(to right, #00c6ff, #0072ff)';
            break;
        case 'snow':
            gradient = 'linear-gradient(to right, #e6dada, #274046)';
            break;
        case 'thunderstorm':
            gradient = 'linear-gradient(to right, #373b44, #4286f4)';
            break;
        default:
            gradient = 'linear-gradient(to right, #6dd5ed, #2193b0)';
            break;
    }
    document.body.style.background = gradient;
}