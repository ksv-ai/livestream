const FIFA_IDS = ['fifa1', 'fifa2', 'fifa3', 'fifa4', 'fifa5', 'fifa6', 'fifa7', 'fifa8'];
const API_BASE = 'https://yonotv-data.pages.dev/';

document.addEventListener('DOMContentLoaded', () => {
  loadMatches();

  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('playerModal').classList.remove('show');
  });

  // Close on outside click
  document.getElementById('playerModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('playerModal')) {
      document.getElementById('playerModal').classList.remove('show');
    }
  });
});

async function loadMatches() {
  const grid = document.getElementById('matchGrid');
  grid.innerHTML = '';

  const fetches = FIFA_IDS.map(id => fetch(`${API_BASE}${id}.json?t=${Date.now()}`).then(r => r.json()).then(d => ({id, d})).catch(() => null));
  const results = await Promise.all(fetches);

  let matchFound = false;
  let count = 0;

  results.forEach(res => {
    if (!res || !res.d) return;
    const { d } = res;
    
    const cleanLinks = (d.telecast_links || []).filter(link => link.url && !link.url.endsWith('/ADS') && !link.url.includes('ADS'));
    if (cleanLinks.length === 0) return;

    matchFound = true;
    count++;
    
    const team1 = (d.team1 && d.team1.name) ? d.team1.name : 'Team A';
    const team2 = (d.team2 && d.team2.name) ? d.team2.name : 'Team B';
    const matchInfo = d.match || {};
    const title = matchInfo.title || `${team1} vs ${team2}`;
    const time = matchInfo.time || 'Live Now';
    const banner = matchInfo.banner_image || 'https://images.unsplash.com/photo-1518605368461-1ee7c519c0a6?q=80&w=1000&auto=format&fit=crop';

    const card = document.createElement('div');
    card.className = 'card is-live';
    card.innerHTML = `
      <div class="card-thumb">
        <img src="${banner}" onerror="this.src='https://images.unsplash.com/photo-1518605368461-1ee7c519c0a6?q=80&w=1000&auto=format&fit=crop'">
        <div class="card-thumb-bg"></div>
        <div class="badge-live-flag"><div class="live-dot"></div> LIVE</div>
        <div class="teams-overlay">
          <div class="team-label">${team1}</div>
          <div class="vs-sep">VS</div>
          <div class="team-label">${team2}</div>
        </div>
      </div>
      <div class="card-body">
        <div class="card-name">${title}</div>
        <div class="card-foot">
          <div class="sport-chip">FIFA WORLD CUP</div>
          <div class="card-streams">${cleanLinks.length} Streams</div>
        </div>
      </div>
    `;

    // Setup modal click
    card.addEventListener('click', () => {
      openModal(title, `${matchInfo.stadium || 'TBA'} • ${time}`, cleanLinks);
    });

    grid.appendChild(card);
  });

  document.getElementById('matchCount').textContent = `${count} matches`;

  if (!matchFound) {
    grid.innerHTML = '<div style="color:var(--muted)">No live FIFA matches found.</div>';
  }
}

function openModal(title, meta, links) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMeta').textContent = meta;

  const linksContainer = document.getElementById('modalLinks');
  linksContainer.innerHTML = links.map((link, i) => `
    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="stream-btn">
      <span><svg viewBox="0 0 24 24" width="16" height="16" fill="var(--accent)" style="vertical-align:-3px;margin-right:8px;"><path d="M8 5v14l11-7z"/></svg> Stream Source ${i + 1} (HD)</span>
      <span style="font-size:12px;color:var(--muted2);">External Player →</span>
    </a>
  `).join('');

  document.getElementById('playerModal').classList.add('show');
}
