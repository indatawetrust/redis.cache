import test from 'ava'
import redisCache from './index'

const cache = redisCache()

test('test #1', async t => {

  t.is(await cache.set('item1', 99999999999), true)

  t.is(await cache.get('item1'), 99999999999)

  t.is(await cache.del('item1'), true)

})

test('test #2', async t => {

  t.is(await cache.set('item2', false), true)

  t.is(await cache.get('item2'), false)

  t.is(await cache.del('item2'), true)

})

test('test #3', async t => {

  t.is(await cache.set('item3', "hello world"), true)

  t.is(await cache.get('item3'), "hello world")

  t.is(await cache.del('item3'), true)

})

test('test #4', async t => {

  t.is(await cache.set('item4', 3.14159265), true)

  t.is(await cache.get('item4'), 3.14159265)

  t.is(await cache.del('item4'), true)

})

test('test #5', async t => {

  t.is(await cache.set('item5', {
    b: {
      c: {
        d: {
          e: {
            f: true
          }
        }
      }
    }
  }), true)

  t.is((await cache.get('item5')).b.c.d.e.f, true)

  t.is(await cache.del('item5'), true)

})
