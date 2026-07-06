const fs = require('fs');
const path = require('path');

const ids = ['fifa1', 'fifa2', 'fifa3', 'fifa4', 'fifa5', 'fifa6', 'fifa7', 'fifa8'];
const outDir = path.join(__dirname, 'data');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

async function run() {
    for (const id of ids) {
        try {
            console.log(`Fetching ${id}.json...`);
            const res = await fetch(`https://yonotv-data.pages.dev/${id}.json`);
            if (!res.ok) {
                console.log(`Skipping ${id} (Not found)`);
                continue;
            }
            const data = await res.json();
            
            // Filter out ad links and rewrite to our custom player
            if (data.telecast_links) {
                data.telecast_links = data.telecast_links.filter(link => {
                    return !link.url.endsWith('/ADS') && !link.url.includes('ADS');
                }).map(link => {
                    // Replace the Yonotv player wrapper with our local player wrapper using hash to prevent redirect loss
                    if (link.url.includes('page.html?src=')) {
                        link.url = link.url.replace('https://yonotv-now.pages.dev/page.html?src=', 'player.html#src=');
                    }
                    return link;
                });
            }
            
            // Save modified json
            fs.writeFileSync(path.join(outDir, `${id}.json`), JSON.stringify(data, null, 4));
            console.log(`Saved ${id}.json (Filtered ${data.telecast_links ? data.telecast_links.length : 0} clean links)`);
        } catch (e) {
            console.error(`Error processing ${id}:`, e.message);
        }
    }
}

run();
