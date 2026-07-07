addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // 1️⃣ CORS pre‑flight handling
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400',
      }
    });
  }

  // 2️⃣ Extract target URL (expected format: /proxy/https://example.com/stream.m3u8)
  const targetPath = url.pathname.replace('/proxy/', '');
  const targetUrl = targetPath + url.search;

  if (!targetUrl.startsWith('http')) {
    return new Response(
      "Invalid URL – usage: /proxy/https://target‑stream.com/...",
      { status: 400 }
    );
  }

  // 3️⃣ Spoof Referer/Origin headers required by upstream server
  const spoofedHeaders = new Headers(request.headers);
  spoofedHeaders.set('Referer', 'https://yonotv-now.pages.dev/');
  spoofedHeaders.set('Origin', 'https://yonotv-now.pages.dev/');
  spoofedHeaders.set(
    'User-Agent',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  // 4️⃣ Fetch the upstream stream
  const upstream = await fetch(targetUrl, {
    method: request.method,
    headers: spoofedHeaders,
    redirect: 'follow',
  });

  // 5️⃣ Add CORS header for the front‑end
  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.set('Access-Control-Allow-Origin', '*');

  // 6️⃣ If the response is an HLS playlist, rewrite every chunk URL
  const ct = upstream.headers.get('Content-Type') || '';
  if (ct.includes('mpegurl') || targetUrl.includes('.m3u8')) {
    const text = await upstream.text();
    const rewritten = text.split('\n').map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('http')) {
        // Absolute URL – route through the proxy again
        return `${url.origin}/proxy/${trimmed}`;
      }
      if (trimmed && !trimmed.startsWith('#')) {
        // Relative URL – resolve against original playlist URL then proxy
        try {
          const abs = new URL(trimmed, targetUrl).toString();
          return `${url.origin}/proxy/${abs}`;
        } catch (_) {
          return trimmed;
        }
      }
      return trimmed; // comments, empty lines, etc.
    });
    // Return a string response – no type clash with ReadableStream
    return new Response(rewritten.join('\n'), {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });
  }

  // 7️⃣ Not a playlist – forward the original body (ReadableStream) unchanged
  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}
