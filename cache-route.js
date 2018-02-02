var mcache = require('memory-cache')

/**
 * Express.js middleware to cache route
 * responses in memory.
 */
module.exports = (duration) => {
  return (request, response, next) => {
    let key = '__express__' + request.originalUrl || request.url
    let cached_response = mcache.get(key)
    if (cached_response) {
      response.send(cached_response)
      return
    } else {
      response.sendResponse = response.send
      response.send = (body) => {
        mcache.put(key, body, duration);
        response.sendResponse(body)
      }
      next()
    }
  }
}