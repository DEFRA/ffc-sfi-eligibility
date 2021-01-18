const logger = require('bunyan').createLogger({ name: 'ffc-eligibility' })

function log (msg, ctx) {
  if (ctx) {
    logger.info({ ctx }, msg)
  } else {
    logger.info(msg)
  }
}

module.exports = {
  log
}
