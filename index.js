var mutate = require('xtend/mutable')
var assert = require('assert')

module.exports = serviceWorker

var events = serviceWorker.events = {
  INSTALLED: 'sw:installed',
  UPDATED: 'sw:updated',
  REDUNDANT: 'sw:redundant',
  ERROR: 'log:error'
}

function serviceWorker (name, opts) {
  name = name || '/sw.js'
  opts = opts || {}

  assert.equal(typeof name, 'string', 'choo-service-worker: name should be type string')
  assert.equal(typeof opts, 'object', 'choo-service-worker: opts should be type object')

  return function (state, emitter) {
    assert.equal(typeof state, 'object', 'choo-service-worker: state should be type object')
    assert.equal(typeof emitter, 'object', 'choo-service-worker: emitter should be type object')

    emitter.on(state.events.DOMCONTENTLOADED, function () {
      opts = mutate({ scope: '/' }, opts)
      if (navigator.serviceWorker && navigator.onLine) {
        navigator.serviceWorker.register(name, opts)
          .then(function (registration) {
            registration.onupdatefound = function () {
              var installingWorker = registration.installing
              installingWorker.onstatechange = function () {
                switch (installingWorker.state) {
                  case 'installed':
                    if (navigator.serviceWorker.controller) {
                      emitter.emit(events.UPDATED, registration)
                    } else {
                      emitter.emit(events.INSTALLED, registration)
                    }
                    break
                  case 'redundant':
                    emitter.emit(events.REDUNDANT, registration)
                    break
                }
              }
            }
          }).catch(function (err) {
            emitter.emit(events.ERROR, err)
          })
      }
    })
  }
}
