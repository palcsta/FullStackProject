const logger = require('./utils/logger')

let failqueue = []
const cooldown = 22000 //milliseconds
const maxFails = 4

const insert = (reqFingerprint,reqIp) => {
  const failobj = {time:Date.now(),fingerprint:reqFingerprint,ip:reqIp}
  failqueue.push(failobj)
}

const check = (reqFingerprint, reqIp) => {
  failqueue = failqueue.filter(f => Date.now()-f.time<cooldown)
  const failsForThisRequester = failqueue.filter(c => (c.fingerprint === reqFingerprint||c.ip === req.ip)).length
  if(failsForThisRequester > maxFails) logger.info(`${reqFingerprint}-${reqIp} rate-limiting temp ban. ${failsForThisRequester} fails (max ${maxFails})`)
  return failsForThisRequester > maxFails
}

module.exports = { failqueueInsert:insert, failqueueCheck:check }

