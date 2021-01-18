const server = require('./server')
const { log, logError } = require('./services/logger')

const init = async () => {
  await server.start()
  log(`Server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  logError(err)
  process.exit(1)
})

init()
