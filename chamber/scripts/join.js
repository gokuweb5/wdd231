// Set timestamp when page loads
document.getElementById('timestamp').value = new Date().toISOString();

// Modal functionality
const learnMoreButtons = document.querySelectorAll('.learn-more');
const closeButtons = document.querySelectorAll('.close-modal');

learnMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.showModal();
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        if (modal) {
            modal.close();
        }
    });
});

// Close modal when clicking outside
document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    });
});
