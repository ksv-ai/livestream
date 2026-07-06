const channelsData = [
  // =====================
  // CRICKET CHANNELS (Currently Hidden)
  // =====================
  // { name: "Willow TV", desc: "Live Cricket USA", cat: "cricket", icon: "WTV", url: "https://yonotv.pages.dev/wtv", type: "external" },
  // { name: "Sky Sports Cricket", desc: "UK Cricket Broadcasts", cat: "cricket", icon: "SKY", url: "https://wikisport.club/embed/skycric.php", type: "external" },
  // { name: "FanCode", desc: "Live Matches India", cat: "cricket", icon: "FC", url: "https://yonotv.pages.dev/fc2", type: "external" },
  // { name: "Star Sports Hindi", desc: "Hindi Live Broadcast", cat: "cricket", icon: "STAR", url: "https://yonotv-now.pages.dev/plyrr?src=https://newcdn.tamils.click/live/mylive.m3u8", type: "external" },
  // { name: "FanCode English 1", desc: "Live Matches (Server 1)", cat: "cricket", icon: "FCE1", url: "https://yonotv-now.pages.dev/jwplyrr?src=https://np-mc-fblive.fancode.com/mumbai/142294_english_hls_060959847276553_1ta-di_h264/index.m3u8", type: "external" },
  // { name: "FanCode English 2", desc: "Live Matches (Server 2)", cat: "cricket", icon: "FCE2", url: "https://yonotv-now.pages.dev/jwplyrr?src=https://in-mc-fblive.fancode.com/mumbai/142294_english_hls_060959847276553_1ta-di_h264/index.m3u8", type: "external" },

  // =====================
  // FOOTBALL CHANNELS (NATIVE KPTV DRM PLAYER)
  // =====================
  { name: "TSN 1", desc: "Live Matches", cat: "football", icon: "TSN1", type: "native", mpd: "https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/w0rehjjrwe/out/v1/69a2a7041395406b970598f61680e7cf/cenc.mpd", kid: "14eeabf30c14b7fbf3008c03099ce011", key: "17d2ac8dbc5429bd70af3433aa12158d" },
  { name: "TSN 4", desc: "Live Matches", cat: "football", icon: "TSN4", type: "native", mpd: "https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/ihys8nw4wv/out/v1/fde190f369484bc6b6117cc16cd82a9f/cenc.mpd", kid: "abc5b2883121012850ebda05b528c5ec", key: "e5250924f4b738905f7163a0134587a7" },
  { name: "Fox Sports 1", desc: "US Sports & Soccer", cat: "football", icon: "FOX1", type: "native", mpd: "https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/enc/ajfoeddkbz/out/v1/b78800b9b2304879b15843f455836829/cenc.mpd", kid: "f6564ec2aee819046328a0e153be574d", key: "ff46a8a1031eb27ef22576a077c98ab7" },
  { name: "ITV 1", desc: "UK Free-to-Air", cat: "football", icon: "ITV", type: "native", mpd: "https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/0eiyyz8qzm/out/v1/dd17af8835fe4bd087d1a4e359b635d7/cenc.mpd", kid: "30089c52924f037b225b82c616fee2a5", key: "f55dc8b66ed4fc6753d6035ae7e17144" },
  { name: "FIFA TV", desc: "Official FIFA Stream", cat: "football", icon: "FIFA", type: "native", mpd: "https://qp-pldt-live-bpk-ucd-prod.akamaized.net/bpk-tv/fifa_ppv1/default/index.mpd", kid: "2c338a117d434ce4bbe3569231af90f1", key: "a9633d901ee8a3f4f58ac314b5c5f4fb" },
  { name: "FIFA Live", desc: "FIFA Match Server", cat: "football", icon: "FIFA2", type: "native", mpd: "https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/72sjo8hygl/out/v1/3079be34d72a4985852d299a02406a0c/cenc.mpd", kid: "d185684e2330de5bea436daa094a5e86", key: "014f0116154f5bf0050e03a6b0a23157" },
  { name: "DSports", desc: "Latin America Football", cat: "football", icon: "DSP", type: "native", mpd: "https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/x0srg3jjpz/out/v1/f779c49314394d61886d63f58d9d52e4/cenc.mpd", kid: "4f4c3a9912ea752e88f4497864a1bc8b", key: "278128004fe8c6ffb2cd2a0c154a241a" },
  { name: "M6", desc: "French Broadcasts", cat: "football", icon: "M6", type: "native", mpd: "https://edge-fastly-m6web.live.6cloud.fr/out/v1/6play/6play-m6/cmaf_cenc00/dash-short-hd.mpd", kid: "0182ed7af02734ecb17a2f55eec98f99", key: "60346785b1095596de621031e9daf3ec" },
  { name: "SporTV", desc: "Brazilian Sports Network", cat: "football", icon: "SPTV", type: "native", mpd: "https://otte.cache.aiv-cdn.net/bom-nitro/live/clients/dash/enc/w8kwdfmlgs/out/v1/3aa321e477504937a439b602e078eb18/cenc.mpd", kid: "51c0ef23b17297e5c01cd7f36dd0a6ce", key: "8823f713ba6fdb9bbe0a2ad82d309a4b" },
  { name: "TVE 1", desc: "Spanish Broadcast", cat: "football", icon: "TVE", type: "native", mpd: "https://otte.cache.aiv-cdn.net/iad-nitro/live/clients/dash/enc/c7di7zkdor/out/v1/f7d5b356e048494a8325563e8916d50b/cenc.mpd", kid: "745cd6ec34a58f2f7ac2af35dc3da6d2", key: "ae008f1e47e6567fe4201a6ff8f1ae54" },

  // =====================
  // ALTERNATIVE FOOTBALL SERVERS (Currently Hidden)
  // =====================
  // { name: "beIN Sports 1", desc: "Premium Football, UCL", cat: "football", icon: "beIN", url: "https://a.kora-sia.com/albaplayer/bein-1/", type: "external" },
  // { name: "beIN Sports Max 1", desc: "Extra Coverage", cat: "football", icon: "MAX1", url: "https://new.poiy.online/albaplayer/max1/", type: "external" },
  // { name: "Live123 Server 1", desc: "Football Backup Stream", cat: "football", icon: "L123", url: "https://yonotv-now.pages.dev/plyrr?src=https://hls.live123.fans/live/4459802.m3u8", type: "external" },
  // { name: "InPlyr Stream", desc: "High Definition Backup", cat: "football", icon: "INP", url: "https://yonotv-now.pages.dev/plyrr?src=https://live.inplyr.com/room/327159.m3u8", type: "external" },
  // { name: "Koepgd Stream", desc: "Alternative Live Server", cat: "football", icon: "KOE", url: "https://yonotv-now.pages.dev/cplyrr?src=https://live05.koepgd.app/live/24561735.m3u8", type: "external" },
  // { name: "SportsOnline HD1", desc: "Premium HD Network", cat: "football", icon: "SPO", url: "https://ww2.sporttsonline.click/channels/hd/hd1.php", type: "external" },
  // { name: "ViaTV Premium", desc: "Live Volleyball & Sports", cat: "football", icon: "VIA", url: "https://yonotv-now.pages.dev/jwplyrr?src=https://webott.viatv.com.np/v0t1/Hpremium/playlist.m3u8", type: "external" }
];

document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle Logic ---
  const themeToggle = document.getElementById('themeToggle');
  
  // Check local storage for saved theme, default to dark if nothing saved
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // --- Grid Rendering Logic ---
  renderGrid(channelsData);

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = channelsData.filter(c => c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
      renderGrid(filtered);
    });
  }
});

function renderGrid(data) {
  const fGrid = document.getElementById('footballGrid');
  const cGrid = document.getElementById('cricketGrid');

  if (fGrid) fGrid.innerHTML = '';
  if (cGrid) cGrid.innerHTML = '';

  data.forEach(c => {
    const card = createCard(c);
    if (c.cat === 'football' && fGrid) {
      fGrid.appendChild(card);
    } else if (c.cat === 'cricket' && cGrid) {
      cGrid.appendChild(card);
    }
  });

  const fData = data.filter(c => c.cat === 'football');
  const cData = data.filter(c => c.cat === 'cricket');

  if (fGrid && fGrid.parentElement) fGrid.parentElement.style.display = fData.length ? 'block' : 'none';
  if (cGrid && cGrid.parentElement) cGrid.parentElement.style.display = cData.length ? 'block' : 'none';
}

function createCard(c) {
  const a = document.createElement('a');
  a.className = 'channel-card';

  if (c.type === 'native') {
    // Pass just the short ID to keep the URL clean
    a.href = `kptv-player.html?id=${encodeURIComponent(c.icon)}`;
    a.target = '_self';
  } else {
    // Keep external links opening in a new tab to avoid frame-busting
    a.href = c.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }

  a.innerHTML = `
    <div class="ch-icon">${c.icon}</div>
    <div class="ch-info">
      <div class="ch-name">${c.name}</div>
      <div class="ch-desc">${c.desc}</div>
    </div>
    <div class="play-btn">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
    </div>
  `;
  return a;
}
