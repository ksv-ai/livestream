const FIFA_IDS = ['fifa1', 'fifa2', 'fifa3', 'fifa4', 'fifa5', 'fifa6', 'fifa7', 'fifa8'];
const API_BASE = 'https://yonotv-data.pages.dev/';

// Helper to extract URL params
function getParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Global initialization based on page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('matchGrid')) {
    loadHomePage();
  } else if (document.getElementById('m-title')) {
    loadMatchPage();
  }
});

// Load Home Page Data
async function loadHomePage() {
  const grid = document.getElementById('matchGrid');
  grid.innerHTML = ''; // Clear loading

  const fetches = FIFA_IDS.map(id => fetch(`${API_BASE}${id}.json?t=${Date.now()}`).then(r => r.json()).then(d => ({id, d})).catch(() => null));
  const results = await Promise.all(fetches);

  let matchFound = false;

  results.forEach(res => {
    if (!res || !res.d) return;
    const { id, d } = res;
    
    // Check if it has valid clean links
    const cleanLinks = (d.telecast_links || []).filter(link => link.url && !link.url.endsWith('/ADS') && !link.url.includes('ADS'));
    if (cleanLinks.length === 0) return; // Skip if no real streams

    matchFound = true;
    
    const team1 = (d.team1 && d.team1.name) ? d.team1.name : 'Team A';
    const team2 = (d.team2 && d.team2.name) ? d.team2.name : 'Team B';
    const matchInfo = d.match || {};
    const title = matchInfo.title || `${team1} vs ${team2}`;
    const time = matchInfo.time || 'Live Now';
    const banner = matchInfo.banner_image || 'https://images.unsplash.com/photo-1518605368461-1ee7c519c0a6?q=80&w=1000&auto=format&fit=crop';

    const card = document.createElement('a');
    card.href = `match.html?id=${id}`;
    card.className = 'match-card';
    card.innerHTML = `
      <div class="card-image">
        <div class="card-status"><div class="dot"></div> LIVE</div>
        <img src="${banner}" alt="${title}" onerror="this.src='https://images.unsplash.com/photo-1518605368461-1ee7c519c0a6?q=80&w=1000&auto=format&fit=crop'">
      </div>
      <div class="card-content">
        <div class="card-teams">${team1} vs ${team2}</div>
        <div class="card-meta">
          <span>${time}</span>
          <span>${cleanLinks.length} Streams</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  if (!matchFound) {
    grid.innerHTML = '<div class="loading-state">No live FIFA matches found at the moment.</div>';
  }
}

// Load Match Page Data
async function loadMatchPage() {
  const matchId = getParam('id');
  if (!matchId) {
    document.getElementById('m-title').textContent = 'Match Not Found';
    return;
  }

  try {
    const res = await fetch(`${API_BASE}${matchId}.json?t=${Date.now()}`);
    if (!res.ok) throw new Error('API Error');
    const d = await res.json();

    const team1 = (d.team1 && d.team1.name) ? d.team1.name : 'Team A';
    const team2 = (d.team2 && d.team2.name) ? d.team2.name : 'Team B';
    const matchInfo = d.match || {};

    document.getElementById('m-title').textContent = `${team1} vs ${team2}`;
    document.getElementById('m-meta').textContent = `${matchInfo.stadium || 'TBA'} • ${matchInfo.time || 'Live Now'}`;

    const cleanLinks = (d.telecast_links || []).filter(link => link.url && !link.url.endsWith('/ADS') && !link.url.includes('ADS'));
    const telecastEl = document.getElementById('telecast-links');

    if (cleanLinks.length === 0) {
      telecastEl.innerHTML = '<div class="loading-state">No HD streams available currently.</div>';
      return;
    }

    telecastEl.innerHTML = cleanLinks.map((link, i) => `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="stream-link">
        <div class="stream-icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div>
          <div class="stream-title">Stream Source ${i + 1}</div>
          <div class="stream-sub">HD • External Player</div>
        </div>
      </a>
    `).join('');

  } catch (err) {
    console.error(err);
    document.getElementById('m-title').textContent = 'Error loading match data';
    document.getElementById('telecast-links').innerHTML = '';
  }
}
