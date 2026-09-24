// This site uses no service worker. Browsers that still have one registered for this origin
// (left over from an earlier project) fetch this file on update: it clears their caches,
// unregisters itself and reloads open tabs so they get fresh files.
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(keys.map(key => caches.delete(key)))
    await self.registration.unregister()
    const windows = await self.clients.matchAll({ type: 'window' })
    windows.forEach(client => client.navigate(client.url))
  })())
})
