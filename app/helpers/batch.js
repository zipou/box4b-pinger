import {registerJob, CRON_EVERY_DAY_PATTERN, CRON_EVERY_MINUTE_PATTERN} from '../libs/Cron'
import {startPing} from './ping'

export const launchBatch = () => {
  return registerJob({
    name: "Pinger Batch",
    pattern: CRON_EVERY_MINUTE_PATTERN,
    func: () => {
      return startPing()
    }
  })
}