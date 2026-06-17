// Portfolio page module
import { fetchGitHubRepos, renderRepoCards } from './github.js';

const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');
let allProjects = [];

async function init() {
    // Load GitHub repos
    const repos = await fetchGitHubRepos();
    const githubContainer = document.getElementById('github-projects');
    if (repos.length > 0) {
        renderRepoCards(repos, githubContainer);
    }

    // Load local projects from JSON
    await loadLocalProjects();

    // Setup filter buttons
    setupFilters();

    // Setup view toggle
    setupViewToggle();

    // Setup modal close
    if (modalClose) {
        modalClose.addEventListener('click', () => modal.close());
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.close();
        });
    }

    // Load view preference from localStorage
    const savedView = localStorage.getItem('mv-portfolio-view');
    if (savedView === 'list') {
        document.getElementById('list-view')?.click();
    }
}

async function loadLocalProjects() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        allProjects = await response.json();
        renderProjects(allProjects);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function renderProjects(projects) {
    const container = document.getElementById('local-projects');
    if (!container) return;

    container.innerHTML = projects.map(project => `
        <article class="project-card" data-id="${project.id}" data-category="${project.category}" tabindex="0">
            <img class="project-image" src="${project.image}" alt="${project.name} preview" loading="lazy" onerror="this.style.display='none'">
            <div class="project-body">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="tech-tags">
                    ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
                <div class="project-meta">
                    <span>📂 ${project.category}</span>
                    <span>📅 ${project.year}</span>
                </div>
            </div>
        </article>
    `).join('');

    // Add click handlers for modal
    container.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => openProjectModal(card.dataset.id));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') openProjectModal(card.dataset.id);
        });
    });
}

function openProjectModal(id) {
    const project = allProjects.find(p => p.id === parseInt(id));
    if (!project || !modal) return;

    modalBody.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="tech-tags">
            ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <p><strong>Category:</strong> ${project.category}</p>
        <p><strong>Year:</strong> ${project.year}</p>
        ${project.url !== '#' ? `<a href="${project.url}" target="_blank" rel="noopener" class="btn-secondary">Visit Project</a>` : ''}
    `;

    modal.showModal();
}

function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            if (filter === 'all') {
                renderProjects(allProjects);
            } else {
                const filtered = allProjects.filter(p => p.category === filter);
                renderProjects(filtered);
            }
        });
    });
}

function setupViewToggle() {
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');
    const containers = document.querySelectorAll('.projects-grid');

    if (gridBtn) {
        gridBtn.addEventListener('click', () => {
            gridBtn.classList.add('active');
            gridBtn.setAttribute('aria-pressed', 'true');
            listBtn?.classList.remove('active');
            listBtn?.setAttribute('aria-pressed', 'false');
            containers.forEach(c => c.style.gridTemplateColumns = '');
            localStorage.setItem('mv-portfolio-view', 'grid');
        });
    }

    if (listBtn) {
        listBtn.addEventListener('click', () => {
            listBtn.classList.add('active');
            listBtn.setAttribute('aria-pressed', 'true');
            gridBtn?.classList.remove('active');
            gridBtn?.setAttribute('aria-pressed', 'false');
            containers.forEach(c => c.style.gridTemplateColumns = '1fr');
            localStorage.setItem('mv-portfolio-view', 'list');
        });
    }
}

init();
