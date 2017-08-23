var html = require('choo/html')
var log = require('choo-log')
var choo = require('choo')
var sw = require('choo-service-worker')
var clear = require('choo-service-worker/clear')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(clear())
}
app.use(sw())
app.use(log())
app.use(notify)
app.route('/', mainView)
app.mount('body')

function mainView (state, emit) {
  return html`
    <body>
      <h1>Choo service worker example</h1>
      <button onclick=${onclick}>Send messagge</button>
    </body>
  `

  function onclick (e) {
    e.preventDefault()
  }
}

function notify (state, emitter) {
  state.count = 0
}