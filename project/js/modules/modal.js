export function setupModal() {
    const modal = document.getElementById('item-modal');
    const closeBtn = document.getElementById('close-modal');

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.close());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.close();
        });
    }
}

export function openModalWithDetails(item) {
    const modal = document.getElementById('item-modal');
    const modalBody = document.getElementById('modal-body');

    if (modal && modalBody) {
        modalBody.innerHTML = `
            <h2>${item.name}</h2>
            <img src="${item.image}" alt="${item.name}" style="width:100%; height:200px; object-fit:cover;">
            <p><strong>Category:</strong> ${item.category.toUpperCase()}</p>
            <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
            <p>${item.description}</p>
        `;
        modal.showModal();
    }
}