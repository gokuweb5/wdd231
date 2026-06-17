// Contact page module

function init() {
    const form = document.getElementById('contact-form');
    const timestampField = document.getElementById('timestamp');

    // Set timestamp when form loads
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Load saved form data from localStorage
    loadFormData();

    // Save form data on input change
    if (form) {
        form.addEventListener('input', saveFormData);
    }
}

function saveFormData() {
    const formData = {
        name: document.getElementById('name')?.value || '',
        email: document.getElementById('email')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        service: document.getElementById('service')?.value || '',
        budget: document.getElementById('budget')?.value || ''
    };
    localStorage.setItem('mv-contact-draft', JSON.stringify(formData));
}

function loadFormData() {
    const saved = localStorage.getItem('mv-contact-draft');
    if (!saved) return;

    try {
        const data = JSON.parse(saved);
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');
        const serviceField = document.getElementById('service');
        const budgetField = document.getElementById('budget');

        if (nameField && data.name) nameField.value = data.name;
        if (emailField && data.email) emailField.value = data.email;
        if (phoneField && data.phone) phoneField.value = data.phone;
        if (serviceField && data.service) serviceField.value = data.service;
        if (budgetField && data.budget) budgetField.value = data.budget;
    } catch (e) {
        console.error('Error loading saved form data:', e);
    }
}

init();
