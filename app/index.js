const server = require('./server')

const init = async () => {
  await server.start()
  console.log('Server running on %s', server.info.uri)

  const messageHandler = message => console.log(message.body)

  require('./messaging/senders').updateEligibility({ test: 'testing eligibility' })
  require('./messaging/receivers').startEligibilityChanged(messageHandler)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
