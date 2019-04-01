import {CronJob} from "cron";
import * as Logger from './Logger'
export const TIMEZONE_EUROPE_PARIS = "Europe/Paris";
export const CRON_EVERY_TWO_HOUR_PATTERN = "0 */2 * * *";
export const CRON_EVERY_TWELVE_HOURS = "0 */12 * * *";
export const CRON_EVERY_DAY_PATTERN = "30 0 * * *";
export const CRON_EVERY_MINUTE_PATTERN = "*/1 * * * *";

let triggerList = {};

export const registerJob = ({name, pattern, func}) => {
  Logger.debug(`Registering Job ${name}`)
  triggerList[name] = false;
  const job = new CronJob(pattern, () => {
    if (triggerList[name]) {
      Logger.error(`Job ${name} is already running. Stopping`)
      return;
    }

    Logger.debug(`Job ${name} is starting`)
    triggerList[name] = true;
    func()
    .then(() => {
      Logger.debug(`Job ${name} is finished`)
      triggerList[name] = false;
    })

  }, true, TIMEZONE_EUROPE_PARIS);
  job.start();
}
