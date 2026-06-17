// Thank you page - display form submission data from URL params

function init() {
    const params = new URLSearchParams(window.location.search);
    const container = document.getElementById('form-summary');

    if (!container || params.size === 0) return;

    const name = params.get('name') || '';
    const email = params.get('email') || '';
    const service = params.get('service') || '';
    const budget = params.get('budget') || '';
    const message = params.get('message') || '';
    const timestamp = params.get('timestamp') || '';

    let formattedDate = '';
    if (timestamp) {
        formattedDate = new Date(timestamp).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    }

    container.innerHTML = `
        <h3>Submission Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
        ${formattedDate ? `<p><strong>Submitted:</strong> ${formattedDate}</p>` : ''}
    `;

    // Clear saved form data from localStorage
    localStorage.removeItem('mv-contact-draft');
}

init();

// Footer dates
const yearEl = document.getElementById('currentyear');
const modifiedEl = document.getElementById('lastModified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modifiedEl) modifiedEl.textContent = `Last Modification: ${document.lastModified}`;
