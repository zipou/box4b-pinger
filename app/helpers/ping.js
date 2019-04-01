import {db, findAll} from './datastore'
import {ping} from './network'

export const startPing = () => {
  return findAll()
  .then(targetList => {
    return Promise.all(targetList.map(target => {
      const {host} = target
      return ping({
        host,
      })
      .then(() => {
        console.log(`Host ${host} is fine`)
        return db.update(target, { $set: { alive: true }})
      })
      .catch(() => {
        console.log(`Host ${host} is down`)
        return db.update(target, { $set: { alive: false }})
      })
    }))
  })
}