// Main page module - GitHub API + Testimonials
import { fetchGitHubRepos, renderRepoCards } from './github.js';
import { loadTestimonials } from './testimonials.js';

async function init() {
    // Load GitHub repos preview (latest 6)
    const repos = await fetchGitHubRepos();
    if (repos.length > 0) {
        const container = document.getElementById('github-repos');
        const latestSix = repos.slice(0, 6);
        renderRepoCards(latestSix, container);
    }

    // Load testimonials
    loadTestimonials();

    // Save visit to localStorage
    const visits = JSON.parse(localStorage.getItem('mv-visits') || '0');
    localStorage.setItem('mv-visits', JSON.stringify(visits + 1));
}

init();
