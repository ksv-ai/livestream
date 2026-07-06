const fs = require('fs');
const path = require('path');

const ids = ['fifa1', 'fifa2', 'fifa3', 'fifa4', 'fifa5', 'fifa6', 'fifa7', 'fifa8'];
const outFile = path.join(__dirname, 'data.js');

async function run() {
    const allData = {};

    for (const id of ids) {
        try {
            console.log(`Fetching ${id}.json...`);
            const res = await fetch(`https://yonotv-data.pages.dev/${id}.json`);
            if (!res.ok) {
                console.log(`Skipping ${id} (Not found)`);
                continue;
            }
            const data = await res.json();

            // Filter out ad links
            if (data.telecast_links) {
                data.telecast_links = data.telecast_links.filter(link => {
                    return !link.url.endsWith('/ADS') && !link.url.includes('ADS');
                });
            }

            allData[id] = data;
            console.log(`Processed ${id} (Filtered ${data.telecast_links ? data.telecast_links.length : 0} clean links)`);
        } catch (e) {
            console.error(`Error processing ${id}:`, e.message);
        }
    }

    // Write the data as a JavaScript file so it can be loaded directly from a local HTML file without a server
    const jsContent = `window.KP_DATA = ${JSON.stringify(allData, null, 4)};\n`;
    fs.writeFileSync(outFile, jsContent);
    console.log(`\nSuccessfully saved all data to data.js!`);
}

run();
