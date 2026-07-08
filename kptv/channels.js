const channelsData = [
  // FOOTBALL / SPORTS CHANNELS (NATIVE KPTV PLAYER)
  { 
    name: "Red Bull TV", desc: "Live Action Sports", cat: "football", icon: "TSN1", type: "native", 
    mpd: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
    fallbackUrl: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8"
  },
  { 
    name: "30A Golf", desc: "Live Golf", cat: "football", icon: "TSN4", type: "native", 
    mpd: "https://30a-tv.com/feeds/vidaa/golf.m3u8",
    fallbackUrl: "https://30a-tv.com/feeds/vidaa/golf.m3u8"
  },
  { 
    name: "A Spor", desc: "Turkish Sports", cat: "football", icon: "FOX1", type: "native", 
    mpd: "https://rnttwmjcin.turknet.ercdn.net/lcpmvefbyo/aspor/aspor.m3u8",
    fallbackUrl: "https://rnttwmjcin.turknet.ercdn.net/lcpmvefbyo/aspor/aspor.m3u8"
  },
  { 
    name: "Test Stream", desc: "Mux Fallback", cat: "football", icon: "ITV", type: "native", 
    mpd: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    fallbackUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  },
  
  // Replaced dead DRM/DASH streams with working HLS (.m3u8) public/test streams for iPad compatibility
  { 
    name: "NASA TV", desc: "Public Live Stream", cat: "football", icon: "FIFA", type: "native", 
    mpd: "https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8",
    fallbackUrl: "https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8" 
  },
  { 
    name: "Apple BipBop", desc: "Advanced Test Stream", cat: "football", icon: "FIFA2", type: "native", 
    mpd: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8",
    fallbackUrl: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8"
  },
  { 
    name: "Akamai Test", desc: "Live Test Network", cat: "football", icon: "DSP", type: "native", 
    mpd: "https://akamai-axtest.akamaized.net/routes/lapd-v1-tga/www_bintu_pub/ch3/abr_hls/master.m3u8",
    fallbackUrl: "https://akamai-axtest.akamaized.net/routes/lapd-v1-tga/www_bintu_pub/ch3/abr_hls/master.m3u8"
  },
  { 
    name: "Bloomberg TV", desc: "Live News Stream", cat: "football", icon: "M6", type: "native", 
    mpd: "https://live.bloomberg.tv/hls/live/590314/bplay/1/index.m3u8",
    fallbackUrl: "https://live.bloomberg.tv/hls/live/590314/bplay/1/index.m3u8"
  },
  { 
    name: "Caminandes", desc: "Open Source Movie Test", cat: "football", icon: "SPTV", type: "native", 
    mpd: "https://test-streams.mux.dev/pts_shift/master.m3u8",
    fallbackUrl: "https://test-streams.mux.dev/pts_shift/master.m3u8"
  },
  { 
    name: "Tears of Steel", desc: "Blender Foundation Test", cat: "football", icon: "TVE", type: "native", 
    mpd: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    fallbackUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('kptv-theme') || 'dark';
  document.body.dataset.theme = savedTheme;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.body.dataset.theme;
      const next = current === 'dark' ? 'light' : 'dark';
      document.body.dataset.theme = next;
      localStorage.setItem('kptv-theme', next);
    });
  }

  // Grid Render Logic
  const footballGrid = document.getElementById('footballGrid');
  if (footballGrid) {
    channelsData.forEach(channel => {
      const card = document.createElement('a');
      card.className = 'channel-card';
      
      let link = '';
      if (channel.type === 'native') {
        link = `kptv-player.html?id=${channel.icon}`;
      } else {
        link = `channel-player.html?id=${channel.icon}`;
      }
      card.href = link;

      card.innerHTML = `
        <div class="channel-icon">${channel.icon}</div>
        <div class="channel-info">
          <h3>${channel.name}</h3>
          <p>${channel.desc}</p>
        </div>
        <div class="live-indicator">LIVE</div>
      `;
      footballGrid.appendChild(card);
    });
  }

  // Search Logic
  const searchInput = document.getElementById('searchInput');
  if (searchInput && footballGrid) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const cards = footballGrid.querySelectorAll('.channel-card');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(term) ? 'flex' : 'none';
      });
    });
  }
});
