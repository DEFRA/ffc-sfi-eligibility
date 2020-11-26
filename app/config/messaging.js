const sharedConfig = {
  host: process.env.SERVICE_BUS_HOST,
  password: process.env.SERVICE_BUS_PASSWORD,
  username: process.env.SERVICE_BUS_USER,
  usePodIdentity: process.env.NODE_ENV === 'production'
}

module.exports = {
  eligibilityChangedSubscription: {
    address: process.env.ELIGIBILITY_CHANGED_SUBSCRIPTION_ADDRESS,
    topic: process.env.ELIGIBILITY_CHANGED_TOPIC_ADDRESS,
    type: 'subscription',
    ...sharedConfig
  },
  updateEligibilityQueue: {
    address: process.env.UPDATE_ELIGIBILITY_QUEUE_ADDRESS,
    type: 'queue',
    ...sharedConfig
  },
  updateEligibilityMessageType: 'uk.gov.ffc.sfi.eligibility.update',
  messageSource: 'ffc-sfi-eligibility'
}
