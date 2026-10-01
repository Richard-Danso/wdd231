import { fetchItems } from '../modules/fetch-data.js';
import { openModalWithDetails } from '../modules/modal.js';

document.addEventListener('DOMContentLoaded', async () => {
    const catalogContainer = document.getElementById('catalog-container');
    const items = await fetchItems();

    function renderCatalog(filteredItems) {
        if (!catalogContainer) return;
        catalogContainer.innerHTML = '';

        filteredItems.forEach(item => {
            const card = document.createElement('article');
            card.classList.add('item-card');
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="180">
                <h3>${item.name}</h3>
                <p>Category: ${item.category}</p>
                <p><strong>$${item.price.toFixed(2)}</strong></p>
                <button class="btn view-details" data-id="${item.id}">View Details</button>
            `;
            catalogContainer.appendChild(card);
        });

        // Add listener for modal buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const selectedItem = items.find(i => i.id === id);
                if (selectedItem) openModalWithDetails(selectedItem);
            });
        });
    }

    // Initial render of all 15 items
    renderCatalog(items);

    // Array Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const category = e.target.getAttribute('data-category');
            if (category === 'all') {
                renderCatalog(items);
            } else {
                const filtered = items.filter(item => item.category === category);
                renderCatalog(filtered);
            }
        });
    });
});