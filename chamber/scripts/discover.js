import items from '../data/discover.mjs';

const cardsContainer = document.getElementById('discover-cards');

function displayItems(items) {
    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('discover-card');
        card.style.setProperty('--card-order', index + 1);

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="learn-more-btn">Learn More</button>
        `;

        cardsContainer.appendChild(card);
    });
}

displayItems(items);

// ---------- localStorage visit message ----------
function displayVisitMessage() {
    const messageBox = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    let message = '';

    if (!lastVisit) {
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const msPerDay = 1000 * 60 * 60 * 24;
        const daysBetween = Math.floor((now - Number(lastVisit)) / msPerDay);

        if (daysBetween < 1) {
            message = 'Back so soon! Awesome!';
        } else if (daysBetween === 1) {
            message = 'You last visited 1 day ago.';
        } else {
            message = `You last visited ${daysBetween} days ago.`;
        }
    }

    messageBox.textContent = message;
    localStorage.setItem('lastVisit', now);
}

displayVisitMessage();
