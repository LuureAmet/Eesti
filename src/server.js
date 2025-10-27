const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

const siteRegistry = [
  {
    id: 'delfi',
    label: 'Delfi',
    url: 'https://www.delfi.ee',
    notes: 'News portal. Blocks some resources when embedded; proxy removes frame headers.'
  },
  {
    id: 'neti',
    label: 'Neti',
    url: 'https://www.neti.ee',
    notes: 'Directory style content, good candidate for filters.'
  },
  {
    id: 'facebook',
    label: 'Facebook EE',
    url: 'https://www.facebook.com',
    notes: 'Login wall will appear; many routes require authentication even when proxied.'
  },
  {
    id: 'chatgpt-room',
    label: 'ChatGPT room snapshot',
    url: 'https://chatgpt.com/g/g-p-68fa13b54f04819196b042fea6873cd1-testing-the-chatgpt-system-errors-and-faoults/c/68fb4559-a53c-8332-83dd-0d16343fc55b',
    notes: 'Public preview of shared GPT conversation.'
  },
  {
    id: 'paremklik',
    label: 'Paremklik',
    url: 'https://paremklik.ee',
    notes: 'Local news/blog example site.'
  },
  {
    id: 'kriminaalpolitsei',
    label: 'Kriminaalpolitsei (demo)',
    url: 'https://kriminaalpolitsei.ee/agents/',
    notes: 'Future controlled environment for overlays.'
  }
];

function stripFramingHeaders(proxyRes) {
  const headersToRemove = ['content-security-policy', 'x-frame-options'];
  headersToRemove.forEach((headerName) => {
    if (proxyRes.headers[headerName]) {
      delete proxyRes.headers[headerName];
    }
  });
}

siteRegistry.forEach((site) => {
  const mountPath = `/proxy/${site.id}`;
  app.use(
    mountPath,
    createProxyMiddleware({
      target: site.url,
      changeOrigin: true,
      followRedirects: true,
      ws: false,
      pathRewrite: (pathReq) => pathReq.replace(new RegExp(`^${mountPath}`), ''),
      onProxyRes: stripFramingHeaders,
      logLevel: 'warn'
    })
  );
});

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/config/sites.json', (_req, res) => {
  res.json(siteRegistry);
});

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Overlay playground running on http://localhost:${PORT}`);
});
