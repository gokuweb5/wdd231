const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('primary-nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        nav.classList.toggle('open');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !expanded);
    });
}

// Footer dates
const yearEl = document.getElementById('currentyear');
const modifiedEl = document.getElementById('lastModified');

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modifiedEl) modifiedEl.textContent = `Last Modification: ${document.lastModified}`;
