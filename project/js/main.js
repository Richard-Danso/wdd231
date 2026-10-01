import { initNavigation } from './modules/navigation.js';
import { setupModal } from './modules/modal.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    setupModal();
});