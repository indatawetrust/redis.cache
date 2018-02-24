[![Build Status](https://travis-ci.org/indatawetrust/valuecache.svg?branch=master)](https://travis-ci.org/indatawetrust/valuecache)

#### features
- promise supports
- ttl support
- delete and get elements in the form of arrays
- json format data storage and retrieval

#### install
```
npm i --save valuecache
```

#### usage
```js

const valuecache = require('valuecache')

const cache = valuecache({
  // redis configuration ..
})

(async () => {
  
  await cache.set('foo', 'bar')
  
  await cache.set('data', {
    foo: "bar"
  })
  
  await cache.get('data')
  
  // { "foo": "bar" }
  
  await cache.get('data')
  
  // "bar"
  
  await cache.get(['foo', 'data'])
  
  [{ "foo": "bar" }, "bar"]
  
  await cache.del(['foo', 'data'])

})()

```
