// Kill-switch service worker: unregisters itself and any previously registered SWs.
// This clears the offline cache that was created by a previous deployment.
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', () => {
  self.registration.unregister().then(() => {
    return self.clients.matchAll({ type: 'all' })
  }).then((clients) => {
    clients.forEach((client) => client.navigate(client.url))
  })
})
