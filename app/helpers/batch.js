import {registerJob, CRON_EVERY_DAY_PATTERN, CRON_EVERY_MINUTE_PATTERN} from '../libs/Cron'
import {startCheck} from './check'

export const launchBatch = () => {
  registerJob({
    name: "Pinger Batch",
    pattern: CRON_EVERY_MINUTE_PATTERN,
    func: () => {
      return startCheck()
    }
  })
  return Promise.resolve(true)
}