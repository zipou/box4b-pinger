import {db, findAll, updateLastCheck} from './datastore'
import {ping, checkSocketOpen} from './network'

export const startCheck = () => {
  return findAll()
  .then(targetList => {
    return Promise.all(targetList.map(target => {
      const {name, host, type} = target
      if (!host) reject(`Missing host for socket in target ${name}`)
      return updateLastCheck()
      .then(() => {
        return new Promise((resolve, reject) => {
          switch(type) {
            case "ping": {
              resolve(ping({
                host,
              }))
              break;
            }
            case "socket": {
              const {port} = target
              if (!port) reject(`Missing port for socket in target ${name}`)
              resolve(checkSocketOpen({
                host,
                port,
              }))
              break;
            }
            default: {
              console.log(`Missing type for socket in target ${name}`)
              reject()
              break;
            }
          }
        })
      })
      .then(() => {
        // console.log(`Host ${host} is fine`)
        return db.update(target, { $set: { alive: true }})
      })
      .catch(() => {
        // console.log(`Host ${host} is down`)
        return db.update(target, { $set: { alive: false }})
      })
    }))
  })
}