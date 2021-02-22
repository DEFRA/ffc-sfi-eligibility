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
  startEligibilityChanged: async function (dummyAction) {
    const updateAction = msg => dummyAction(msg, eligibilityReceiver)
    eligibilityReceiver = new MessageReceiver(messagingConfig.eligibilityChangedSubscription, updateAction)
    await eligibilityReceiver.subscribe()
  }
}
