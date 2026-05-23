const membersContainer = document.getElementById('members');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');
const memberCount = document.getElementById('member-count');

const LEVELS = {
    1: { label: 'Member', cls: 'member' },
    2: { label: 'Silver', cls: 'silver' },
    3: { label: 'Gold', cls: 'gold' }
};

async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} while loading members.json`);
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error loading members:', error);
        if (membersContainer) {
            membersContainer.innerHTML =
                '<p role="alert">Unable to load the members list. Please try again later.</p>';
        }
    }
}

function displayMembers(members) {
    if (!membersContainer) return;

    membersContainer.innerHTML = '';

    members.forEach(member => {
        const levelInfo = LEVELS[member.membershipLevel] || LEVELS[1];

        const card = document.createElement('article');
        card.className = `member-card ${levelInfo.cls}`;

        card.innerHTML = `
            <div class="top">
                <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="70" height="70">
                <div>
                    <h2>${member.name}</h2>
                    <p class="tagline">${member.tagline ?? ''}</p>
                </div>
            </div>
            <span class="level">${levelInfo.label}</span>
            <dl>
                <dt>Address</dt><dd>${member.address}</dd>
                <dt>Phone</dt><dd><a href="tel:${member.phone.replace(/\s+/g, '')}">${member.phone}</a></dd>
                <dt>Category</dt><dd>${member.category ?? '—'}</dd>
                <dt>Since</dt><dd>${member.established ?? '—'}</dd>
            </dl>
            <p class="description">${member.description ?? ''}</p>
            <a class="website" href="${member.website}" target="_blank" rel="noopener">Visit website</a>
        `;

        membersContainer.appendChild(card);
    });

    if (memberCount) {
        memberCount.textContent = members.length;
    }
}

function setView(view) {
    if (!membersContainer) return;
    membersContainer.classList.remove('grid', 'list');
    membersContainer.classList.add(view);

    if (gridBtn && listBtn) {
        gridBtn.classList.toggle('active', view === 'grid');
        listBtn.classList.toggle('active', view === 'list');
        gridBtn.setAttribute('aria-pressed', String(view === 'grid'));
        listBtn.setAttribute('aria-pressed', String(view === 'list'));
    }
}

if (gridBtn) gridBtn.addEventListener('click', () => setView('grid'));
if (listBtn) listBtn.addEventListener('click', () => setView('list'));

getMembers();
