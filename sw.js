// Service Worker for Focus PWA
const VERSION = 'v7';
const SHELL_CACHE = `focus-shell-${VERSION}`;
const ASSET_CACHE = `focus-assets-${VERSION}`;
const FONT_CACHE = `focus-fonts-${VERSION}`;
const CURRENT_CACHES = [SHELL_CACHE, ASSET_CACHE, FONT_CACHE];

// The app shell is served network-first, so these are the offline fallback
// rather than the primary source. Bumping VERSION is no longer required to
// ship an update — it only clears stale entries.
const SHELL_URLS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json'
];

const ASSET_URLS = [
    './icon-192.png',
    './icon-512.png',
    './icon-maskable-512.png'
];

const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

// Install event - prime the caches
self.addEventListener('install', (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_URLS)),
            caches.open(ASSET_CACHE).then((cache) => cache.addAll(ASSET_URLS))
        ]).catch((error) => {
            console.log('Cache install failed:', error);
        })
    );
    self.skipWaiting();
});

// Activate event - clean up caches from older versions
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => !CURRENT_CACHES.includes(cacheName))
                    .map((cacheName) => {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

function isShellRequest(request, url) {
    if (request.mode === 'navigate') return true;
    if (url.origin !== self.location.origin) return false;
    return /\.(html|css|js|json)$/.test(url.pathname) || url.pathname.endsWith('/');
}

function putInCache(cacheName, request, response) {
    // Opaque and error responses are not worth storing; failures here are
    // never fatal to the request itself.
    if (!response || response.status === 0 || response.status === 206) return;

    caches.open(cacheName)
        .then((cache) => cache.put(request, response))
        .catch((error) => console.log('Cache write failed:', error));
}

// Network-first: always try for a fresh shell, fall back to cache offline.
async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response && response.ok && response.type === 'basic') {
            putInCache(SHELL_CACHE, request, response.clone());
        }
        return response;
    } catch (error) {
        const cached = await caches.match(request);
        if (cached) return cached;

        // Any navigation can fall back to the app shell
        if (request.mode === 'navigate') {
            const shell = await caches.match('./index.html');
            if (shell) return shell;
        }
        throw error;
    }
}

// Cache-first with background refresh: right for content-addressed assets.
async function staleWhileRevalidate(request, cacheName, event) {
    const cached = await caches.match(request);

    const network = fetch(request)
        .then((response) => {
            if (response && (response.ok || response.type === 'opaque')) {
                putInCache(cacheName, request, response.clone());
            }
            return response;
        })
        .catch(() => null);

    if (cached) {
        // Keep the worker alive until the refresh lands
        event.waitUntil(network);
        return cached;
    }

    const response = await network;
    if (response) return response;
    throw new Error(`Unavailable offline: ${request.url}`);
}

self.addEventListener('fetch', (event) => {
    const request = event.request;

    // cache.put() rejects on anything but GET
    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    if (FONT_HOSTS.includes(url.hostname)) {
        // Cached so an offline launch keeps its typography
        event.respondWith(staleWhileRevalidate(request, FONT_CACHE, event));
        return;
    }

    if (url.origin !== self.location.origin) return;

    if (isShellRequest(request, url)) {
        event.respondWith(networkFirst(request));
        return;
    }

    event.respondWith(staleWhileRevalidate(request, ASSET_CACHE, event));
});

// Listen for messages from the app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
