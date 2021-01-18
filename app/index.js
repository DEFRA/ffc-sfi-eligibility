const server = require('./server')
const { log } = require('./services/logger')

const init = async () => {
  await server.start()
  log(`Server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  log(err)
  process.exit(1)
})

init()
