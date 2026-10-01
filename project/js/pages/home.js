import { fetchItems } from '../modules/fetch-data.js';
import { openModalWithDetails } from '../modules/modal.js';

document.addEventListener('DOMContentLoaded', async () => {
    const featuredContainer = document.getElementById('featured-items');
    const items = await fetchItems();

    // Filter featured items for home page
    const featuredItems = items.filter(item => item.featured);

    if (featuredContainer) {
        featuredItems.forEach(item => {
            const card = document.createElement('article');
            card.classList.add('item-card');
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="180">
                <h3>${item.name}</h3>
                <p><strong>$${item.price.toFixed(2)}</strong></p>
                <button class="btn view-details" data-id="${item.id}">Quick View</button>
            `;
            featuredContainer.appendChild(card);
        });

        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const item = items.find(i => i.id === id);
                if (item) openModalWithDetails(item);
            });
        });
    }

    // Local Storage Example
    localStorage.setItem('lastVisit', new Date().toISOString());
});