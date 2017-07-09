# choo-service-worker [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

Service worker loader for choo. Only runs in the browser, and emits events.
Does not include the worker code itself, you'll need to serve it using a tool
like `bankai`.

## Usage
```js
var sw = require('choo-service-worker')
var choo = require('choo')

var app = choo()
app.use(sw('/sw.js'))
app.mount('body')
```

## Events
### `log:error` | `sw.events.ERROR`
Emitted if the worker fails to register.

### `sw:installed` | `sw.events.INSTALLED`
Emitted when the worker correctly registers.

## API
### `plugin = sw([route], [opts])`
Register a new service worker if possible. Route defaults to `/sw.js`. If
provided, `opts` is passed directly to the worker register code. Emits events
when the worker is registered.

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/choo-service-worker.svg?style=flat-square
[3]: https://npmjs.org/package/choo-service-worker
[4]: https://img.shields.io/travis/yoshuawuyts/choo-service-worker/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/choo-service-worker
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/choo-service-worker/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/choo-service-worker
[8]: http://img.shields.io/npm/dm/choo-service-worker.svg?style=flat-square
[9]: https://npmjs.org/package/choo-service-worker
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
