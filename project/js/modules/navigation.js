export function initNavigation() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const primaryNav = document.getElementById('primary-nav')?.querySelector('ul');

    if (hamburgerBtn && primaryNav) {
        hamburgerBtn.addEventListener('click', () => {
            primaryNav.classList.toggle('show');
        });
    }

    // Dynamic Footer Year & Modified Date
    const yearSpan = document.getElementById('year');
    const modSpan = document.getElementById('last-modified');

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modSpan) modSpan.textContent = `Last Modified: ${document.lastModified}`;
}