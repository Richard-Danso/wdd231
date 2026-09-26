// OpenWeatherMap API Config
const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your actual OpenWeatherMap API Key
const lat = '43.8260'; // Example latitude (Rexburg, ID)
const lon = '-111.7897'; // Example longitude

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// Fetch Weather Data
async function fetchWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            console.error('Weather data error:', await response.text());
        }
    } catch (error) {
        console.error('Error fetching current weather:', error);
    }
}

function displayCurrentWeather(data) {
    const tempElement = document.getElementById('current-temp');
    const descElement = document.getElementById('weather-desc');
    const iconElement = document.getElementById('weather-icon');

    tempElement.textContent = Math.round(data.main.temp);
    const description = data.weather[0].description;
    descElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    
    const iconCode = data.weather[0].icon;
    iconElement.setAttribute('src', `https://openweathermap.org/img/wn/${iconCode}@2x.png`);
    iconElement.setAttribute('alt', description);
}

// Fetch 3-Day Forecast
async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        }
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    // Filter forecast items taken around 12:00 PM for the next 3 days
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    dailyForecasts.forEach(dayData => {
        const date = new Date(dayData.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-day');
        forecastCard.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <p>${Math.round(dayData.main.temp)}&deg;F</p>
        `;
        forecastContainer.appendChild(forecastCard);
    });
}

// Fetch and Render Member Spotlights (Gold and Silver only)
const membersUrl = 'data/members.json';

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const members = await response.json();
            displaySpotlights(members);
        }
    } catch (error) {
        console.error('Error fetching member spotlights:', error);
    }
}

function displaySpotlights(members) {
    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = '';

    // Filter for Silver (2) or Gold (3) membership levels
    const qualifiedMembers = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3 || m.membershipLevel === 'Silver' || m.membershipLevel === 'Gold');

    // Shuffle array randomly
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

    // Select 2 or 3 members
    const selected = shuffled.slice(0, 3);

    selected.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');

        const levelName = (member.membershipLevel === 3 || member.membershipLevel === 'Gold') ? 'Gold Member' : 'Silver Member';

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
            <p><em>${levelName}</em></p>
        `;
        spotlightContainer.appendChild(card);
    });
}

// Initialize Page Data
fetchWeather();
fetchForecast();
fetchSpotlights();