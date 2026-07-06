const channelsData = [
  // =====================
  // CRICKET CHANNELS
  // =====================
  { name: "Willow TV", desc: "Live Cricket USA", cat: "cricket", icon: "WTV", url: "https://yonotv.pages.dev/wtv" },
  { name: "Sky Sports Cricket", desc: "UK Cricket Broadcasts", cat: "cricket", icon: "SKY", url: "https://wikisport.club/embed/skycric.php" },
  { name: "FanCode", desc: "Live Matches India", cat: "cricket", icon: "FC", url: "https://yonotv.pages.dev/fc2" },
  { name: "Star Sports Hindi", desc: "Hindi Live Broadcast", cat: "cricket", icon: "STAR", url: "https://yonotv-now.pages.dev/plyrr?src=https://newcdn.tamils.click/live/mylive.m3u8" },
  { name: "FanCode English 1", desc: "Live Matches (Server 1)", cat: "cricket", icon: "FCE1", url: "https://yonotv-now.pages.dev/jwplyrr?src=https://np-mc-fblive.fancode.com/mumbai/142294_english_hls_060959847276553_1ta-di_h264/index.m3u8" },
  { name: "FanCode English 2", desc: "Live Matches (Server 2)", cat: "cricket", icon: "FCE2", url: "https://yonotv-now.pages.dev/jwplyrr?src=https://in-mc-fblive.fancode.com/mumbai/142294_english_hls_060959847276553_1ta-di_h264/index.m3u8" },

  // =====================
  // FOOTBALL CHANNELS
  // =====================
  { name: "beIN Sports 1", desc: "Premium Football, UCL", cat: "football", icon: "beIN", url: "https://a.kora-sia.com/albaplayer/bein-1/" },
  { name: "beIN Sports Max 1", desc: "Extra Coverage", cat: "football", icon: "MAX1", url: "https://new.poiy.online/albaplayer/max1/" },
  { name: "Fox Sports 1", desc: "US Sports & Soccer", cat: "football", icon: "FOX1", url: "https://yonotv-now.pages.dev/fox1" },
  { name: "TSN 1", desc: "Live Matches", cat: "football", icon: "TSN1", url: "https://yonotv-now.pages.dev/tsn1" },
  { name: "TSN 4", desc: "Live Matches", cat: "football", icon: "TSN4", url: "https://yonotv-now.pages.dev/tsn4" },
  { name: "ITV 1", desc: "UK Free-to-Air", cat: "football", icon: "ITV", url: "https://yonotv-now.pages.dev/itv1" },
  { name: "DSports", desc: "Latin America Football", cat: "football", icon: "DSP", url: "https://yonotv-now.pages.dev/dsports" },
  { name: "M6", desc: "French Broadcasts", cat: "football", icon: "M6", url: "https://yonotv-now.pages.dev/m6" },
  { name: "FIFA TV", desc: "Official FIFA Stream", cat: "football", icon: "FIFA", url: "https://yonotv-now.pages.dev/fifawtv" },
  { name: "FIFA Live", desc: "FIFA Match Server", cat: "football", icon: "FIFA2", url: "https://yonotv-now.pages.dev/fifa" },
  { name: "SporTV", desc: "Brazilian Sports Network", cat: "football", icon: "SPTV", url: "https://yonotv-now.pages.dev/sportv" },
  { name: "TVE 1", desc: "Spanish Broadcast", cat: "football", icon: "TVE", url: "https://yonotv-now.pages.dev/tve1" },
  
  // =====================
  // ALTERNATIVE FOOTBALL SERVERS (For Backup/Stability)
  // =====================
  { name: "Live123 Server 1", desc: "Football Backup Stream", cat: "football", icon: "L123", url: "https://yonotv-now.pages.dev/plyrr?src=https://hls.live123.fans/live/4459802.m3u8" },
  { name: "Live123 Server 2", desc: "Football Backup Stream", cat: "football", icon: "L123", url: "https://yonotv-now.pages.dev/plyrr?src=https://hls.live123.fans/live/4459803.m3u8" },
  { name: "InPlyr Stream", desc: "High Definition Backup", cat: "football", icon: "INP", url: "https://yonotv-now.pages.dev/plyrr?src=https://live.inplyr.com/room/327159.m3u8" },
  { name: "Koepgd Stream", desc: "Alternative Live Server", cat: "football", icon: "KOE", url: "https://yonotv-now.pages.dev/cplyrr?src=https://live05.koepgd.app/live/24561735.m3u8" },
  { name: "SportsOnline HD1", desc: "Premium HD Network", cat: "football", icon: "SPO", url: "https://ww2.sporttsonline.click/channels/hd/hd1.php" },

  // =====================
  // OTHER SPORTS
  // =====================
  { name: "ViaTV Premium", desc: "Live Volleyball & Sports", cat: "football", icon: "VIA", url: "https://yonotv-now.pages.dev/jwplyrr?src=https://webott.viatv.com.np/v0t1/Hpremium/playlist.m3u8" },
  { name: "MaxDigital TV", desc: "Mixed Sports Content", cat: "football", icon: "MAX", url: "https://yonotv-now.pages.dev/jwplyrr?src=https://proxy.yonotvlive.workers.dev/http://maxotts.maxdigitaltv.com/x-media/C707/master.m3u8" }
];

document.addEventListener('DOMContentLoaded', () => {
  renderGrid(channelsData);

  document.getElementById('searchInput').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = channelsData.filter(c => c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
    renderGrid(filtered);
  });
});

function renderGrid(data) {
  const fGrid = document.getElementById('footballGrid');
  const cGrid = document.getElementById('cricketGrid');
  
  fGrid.innerHTML = '';
  cGrid.innerHTML = '';

  const fData = data.filter(c => c.cat === 'football');
  const cData = data.filter(c => c.cat === 'cricket');

  fGrid.parentElement.style.display = fData.length ? 'block' : 'none';
  cGrid.parentElement.style.display = cData.length ? 'block' : 'none';

  fData.forEach(c => fGrid.appendChild(createCard(c)));
  cData.forEach(c => cGrid.appendChild(createCard(c)));
}

function createCard(c) {
  const a = document.createElement('a');
  a.className = 'channel-card';
  // Open directly in a new tab to prevent iframe breaking and CORS issues
  a.href = c.url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  
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
