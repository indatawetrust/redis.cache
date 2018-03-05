const redis = require("redis");

module.exports = opts => {

  const client = redis.createClient(opts)

  const fn = {
    client,
    arrayToPromise: (array, fn) => {

      return Promise.all(array.map(key => {

        return fn(key)

      }))

    },
    set: (key, value, ttl) => {

      return new Promise((resolve, reject) => {

        value = typeof value == "object" ? JSON.stringify(value) : value

        if (ttl) {

          client.setex(key, ttl, value, err => {

            if (err) {
              reject(new Error(err))
            } else {
              resolve(true)
            }

          })

        } else {
          
           client.set(key, value, err => {

            if (err) {
              reject(new Error(err))
            } else {
              resolve(true)
            }

          })         

        }

      })

    },
    get: key => {

      const keys = Array.isArray(key) ? key : [key]

      return fn.arrayToPromise(keys, key => new Promise((resolve, reject) => {

        client.get(key, (err, value) => {

          if (err) {
            reject(new Error(err))
          } else {
            try {
              resolve(JSON.parse(value))
            } catch (e) {
              resolve(value)
            }
          }

        })

      })).then(data => {

        return data.length <= 1 ? data[0] : data

      })

    },
    del: key => {

      const keys = Array.isArray(key) ? key : [key]

      return fn.arrayToPromise(keys, key => new Promise((resolve, reject) => {

        client.del(key, (err, response) => {

          if (!err) {
            resolve(true)
          } else {
            reject(new Error(err))
          }

        })

      })).then(data => {

        return data.length <= 1 ? (data[0] || true) : data

      })

    }

  }

  return fn

}
