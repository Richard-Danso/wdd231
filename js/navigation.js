document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const primaryNav = document.getElementById('primary-nav').parentElement;

    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('open');
        primaryNav.classList.toggle('open');
    });
});