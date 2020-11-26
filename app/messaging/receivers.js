const messagingConfig = require('../config/messaging')
const { MessageReceiver } = require('ffc-messaging')

let eligibilityReceiver

async function stop () {
  await eligibilityReceiver.closeConnection()
}

process.on('SIGTERM', async () => {
  await stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await stop()
  process.exit(0)
})

module.exports = {
  startEligibilityChanged: async function (messageAction) {
    eligibilityReceiver = new MessageReceiver(messagingConfig.eligibilityChangedSubscription, messageAction)
    await eligibilityReceiver.connect()
  }
}
