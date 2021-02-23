const messagingConfig = require('../config/messaging')
const { MessageReceiver } = require('ffc-messaging')
const { log } = require('../services/logger')

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
  startEligibilityChanged: async function () {
    const updateAction = msg => log('Received eligibility message', msg)
    eligibilityReceiver = new MessageReceiver(messagingConfig.eligibilityChangedSubscription, updateAction)
    await eligibilityReceiver.subscribe()
  }
}
