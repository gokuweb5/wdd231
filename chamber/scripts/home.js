// ===== Weather Section =====
// San Martín, El Salvador coordinates
const lat = 13.72;
const lon = -89.05;
const apiKey = '296e68bfee051c2973340999e02d6795';

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

const weatherTemp = document.querySelector('#weather-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const forecastContainer = document.querySelector('#forecast');

async function fetchWeather() {
    try {
        const response = await fetch(currentUrl);
        if (response.ok) {
            const data = await response.json();
            weatherTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;
            const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            weatherIcon.setAttribute('src', iconSrc);
            weatherIcon.setAttribute('alt', data.weather[0].description);
            weatherDesc.textContent = data.weather[0].description;
        }
    } catch (error) {
        console.log('Weather error:', error);
    }
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        }
    } catch (error) {
        console.log('Forecast error:', error);
    }
}

function displayForecast(data) {
    // Get one forecast per day (noon) for the next 3 days
    const today = new Date().getDate();
    const dailyForecasts = [];

    for (const item of data.list) {
        const date = new Date(item.dt * 1000);
        const day = date.getDate();
        const hour = date.getHours();

        if (day !== today && hour >= 11 && hour <= 13 && dailyForecasts.length < 3) {
            const alreadyHasDay = dailyForecasts.some(f => new Date(f.dt * 1000).getDate() === day);
            if (!alreadyHasDay) {
                dailyForecasts.push(item);
            }
        }
    }

    forecastContainer.innerHTML = dailyForecasts.map(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        return `
            <div class="forecast-day">
                <p class="forecast-label">${dayName}</p>
                <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="${day.weather[0].description}" width="50" height="50" loading="lazy">
                <p class="forecast-temp">${day.main.temp.toFixed(0)}&deg;F</p>
            </div>
        `;
    }).join('');
}

// ===== Spotlights Section =====
const spotlightContainer = document.querySelector('#spotlight-cards');

async function fetchSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (response.ok) {
            const members = await response.json();
            displaySpotlights(members);
        }
    } catch (error) {
        console.log('Spotlights error:', error);
    }
}

function displaySpotlights(members) {
    // Filter gold (3) and silver (2) members only
    const qualified = members.filter(m => m.membershipLevel >= 2);

    // Randomly select 2 or 3
    const count = Math.min(3, qualified.length);
    const shuffled = qualified.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    spotlightContainer.innerHTML = selected.map(member => `
        <article class="spotlight-card">
            <img src="${member.image}" alt="${member.name} logo" width="80" height="80" loading="lazy">
            <h3>${member.name}</h3>
            <p class="spotlight-phone">${member.phone}</p>
            <p class="spotlight-address">${member.address}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Visit ${member.name}</a>
            <p class="spotlight-level">${member.membershipLevel === 3 ? 'Gold' : 'Silver'} Member</p>
        </article>
    `).join('');
}

// Initialize
fetchWeather();
fetchForecast();
fetchSpotlights();
