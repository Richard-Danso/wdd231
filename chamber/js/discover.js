import { itemsOfInterest } from '../data/items.mjs';

document.addEventListener('DOMContentLoaded', () => {
  renderCards(itemsOfInterest);
  handleVisitorMessage();
  setFooterDates();
});

/**
 * Dynamic Card Generation
 */
function renderCards(items) {
  const container = document.getElementById('discover-cards');
  container.innerHTML = '';

  items.forEach((item, index) => {
    const card = document.createElement('article');
    card.classList.add('card', `card-${index + 1}`);

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button">Learn More</button>
    `;

    container.appendChild(card);
  });
}

/**
 * LocalStorage Visitor Date Math Logic
 */
function handleVisitorMessage() {
  const visitorBanner = document.getElementById('visitor-message');
  const lastVisit = localStorage.getItem('lastVisitTimestamp');
  const currentTimestamp = Date.now();

  const msInDay = 86400000; // 1000 * 60 * 60 * 24

  if (!lastVisit) {
    // First visit
    visitorBanner.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDifference = currentTimestamp - parseInt(lastVisit, 10);

    if (timeDifference < msInDay) {
      // Less than 24 hours
      visitorBanner.textContent = "Back so soon! Awesome!";
    } else {
      // 1 or more days
      const daysBetween = Math.floor(timeDifference / msInDay);
      if (daysBetween === 1) {
        visitorBanner.textContent = "You last visited 1 day ago.";
      } else {
        visitorBanner.textContent = `You last visited ${daysBetween} days ago.`;
      }
    }
  }

  // Store current visit timestamp in LocalStorage
  localStorage.setItem('lastVisitTimestamp', currentTimestamp.toString());
}

/**
 * Footer Dates Maintenance
 */
function setFooterDates() {
  const yearSpan = document.getElementById('currentyear');
  const lastModP = document.getElementById('lastModified');

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  if (lastModP) {
    lastModP.textContent = `Last Modification: ${document.lastModified}`;
  }
}