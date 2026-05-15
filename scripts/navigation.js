const hamburger = document.getElementById('hamburger');
const primaryNav = document.getElementById('primary-nav');

if (hamburger && primaryNav) {
    hamburger.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute(
            'aria-label',
            isOpen ? 'Close navigation menu' : 'Open navigation menu'
        );
    });
}
