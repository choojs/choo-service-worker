/* eslint-env serviceworker */
self.addEventListener('install', function (event) {
  self.skipWaiting()
  sendMessage(event, 'render')
})

self.addEventListener('activate', function (event) {
  sendMessage(event, 'render')
})

self.addEventListener('sync', function (event) {
  sendMessage(event, 'render')
  self.registration.showNotification(event.tag)
})
self.onmessage = function (e) {
  if (e.data === 'ping') {
    sendMessage(e, 'Message sent from the service worker')
  } else {
    self.registration.showNotification(e.data)
  }
}
self.addEventListener('fetch', function (event) {
  event.respondWith(async function () {
    // Respond from the cache if we can
    const cachedResponse = await caches.match(event.request)
    if (cachedResponse) return cachedResponse

    // Use the preloaded response, if it's there
    const response = await event.preloadResponse
    if (response) return response

    // Else try the network.
    return fetch(event.request) /* global fetch */
  }())
})
function sendMessage (e, msg) {
  if (e.source && typeof e.source.postMessage === 'function') {
    e.source.postMessage(msg)
  } else if (self.clients) {
    clients.matchAll().then(function (clients) {
      for (var client of clients) {
        client.postMessage(msg)
      }
    })
  } else if (e.data.port) {
    e.data.port.postMessage(msg)
  }
}
