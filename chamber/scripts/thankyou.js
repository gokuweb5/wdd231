// Parse URL parameters and display form data
const params = new URLSearchParams(window.location.search);

const membershipLabels = {
    'np': 'Non Profit Membership',
    'bronze': 'Bronze Membership',
    'silver': 'Silver Membership',
    'gold': 'Gold Membership'
};

document.getElementById('first-name').textContent = params.get('first-name') || '';
document.getElementById('last-name').textContent = params.get('last-name') || '';
document.getElementById('email').textContent = params.get('email') || '';
document.getElementById('phone').textContent = params.get('phone') || '';
document.getElementById('organization').textContent = params.get('organization') || '';

const membershipValue = params.get('membership') || '';
document.getElementById('membership').textContent = membershipLabels[membershipValue] || membershipValue;

const timestamp = params.get('timestamp');
if (timestamp) {
    const date = new Date(timestamp);
    document.getElementById('timestamp').textContent = date.toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
    });
}
