const messagingConfig = require('../config/messaging')
const { MessageSender } = require('ffc-messaging')
const { log } = require('../services/logger')

const eligibilitySender = new MessageSender(messagingConfig.updateEligibilityQueue)

const createMessage = (eligibilityData) => ({
  body: eligibilityData,
  type: messagingConfig.updateEligibilityMessageType,
  source: messagingConfig.messageSource
})

async function stop () {
  await eligibilitySender.closeConnection()
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
  updateEligibility: async function (eligibilityData) {
    const msg = createMessage(eligibilityData)
    log('sending message', msg)
    await eligibilitySender.sendMessage(msg)
  }
}
