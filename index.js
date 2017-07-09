var mutate = require('xtend/mutable')
var assert = require('assert')

module.exports = serviceWorker

var events = serviceWorker.events = {
  INSTALL: 'sw:install',
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
      if (navigator.serviceWorker) {
        navigator.serviceWorker.register(name, opts)
          .then(function (registration) {
            emitter.emit(events.INSTALL, registration)
          }).catch(function (err) {
            emitter.emit(events.ERROR, err)
          })
      }
    })
  }
}
