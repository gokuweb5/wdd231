const yearEl = document.getElementById('currentyear');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

const lastModifiedEl = document.getElementById('lastModified');
if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
}
