document.addEventListener('DOMContentLoaded', () => {
  const displayContainer = document.getElementById('submission-display');
  const params = new URLSearchParams(window.location.search);

  // Formats ISO string into human-readable local date/time
  const formatTimestamp = (rawTimestamp) => {
    if (!rawTimestamp) return 'N/A';
    const dateObj = new Date(rawTimestamp);
    return isNaN(dateObj) ? rawTimestamp : dateObj.toLocaleString();
  };

  if (!window.location.search) {
    displayContainer.innerHTML = '<p>No application submission data was found.</p>';
    return;
  }

  displayContainer.innerHTML = `
    <p><strong>First Name:</strong> ${params.get('fname') || ''}</p>
    <p><strong>Last Name:</strong> ${params.get('lname') || ''}</p>
    <p><strong>Email Address:</strong> ${params.get('email') || ''}</p>
    <p><strong>Mobile Phone:</strong> ${params.get('phone') || ''}</p>
    <p><strong>Organization Name:</strong> ${params.get('organization') || ''}</p>
    <p><strong>Timestamp of Submission:</strong> ${formatTimestamp(params.get('timestamp'))}</p>
  `;
});