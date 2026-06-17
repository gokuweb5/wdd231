// GitHub API module
const GITHUB_USER = 'gokuweb5';
const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`;

export async function fetchGitHubRepos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}

export function renderRepoCards(repos, container) {
    if (!container) return;

    container.innerHTML = repos.map(repo => {
        const language = repo.language || 'N/A';
        const description = repo.description || 'No description available';
        const stars = repo.stargazers_count || 0;
        const updated = new Date(repo.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });

        return `
            <article class="repo-card" data-url="${repo.html_url}" tabindex="0" role="button" aria-label="View ${repo.name} on GitHub">
                <h3>${repo.name}</h3>
                <p>${description}</p>
                <div class="repo-meta">
                    <span>⚡ ${language}</span>
                    <span>⭐ ${stars}</span>
                    <span>📅 ${updated}</span>
                </div>
            </article>
        `;
    }).join('');

    // Add click handlers to open repo in new tab
    container.querySelectorAll('.repo-card').forEach(card => {
        card.addEventListener('click', () => {
            window.open(card.dataset.url, '_blank', 'noopener');
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') window.open(card.dataset.url, '_blank', 'noopener');
        });
    });
}
