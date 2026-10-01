document.addEventListener('DOMContentLoaded', () => {
  // 1. Set current ISO date/time into hidden input
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // 2. Control Dialog Modals
  const triggers = document.querySelectorAll('.modal-trigger');
  const closeBtns = document.querySelectorAll('.close-btn');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-target');
      const dialog = document.getElementById(modalId);
      if (dialog) {
        dialog.showModal();
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const dialog = btn.closest('dialog');
      if (dialog) {
        dialog.close();
      }
    });
  });
});