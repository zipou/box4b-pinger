import list from "../list.json"
import {fetchConfig} from "./helpers/config";
import {loadList} from "./helpers/datastore";
import {ping, startLatencyCheck} from "./helpers/network";
import {db} from "./helpers/datastore"
import {launchBatch} from "./helpers/batch";
import {launchServer} from './helpers/server'
import {startCheck} from './helpers/check'

export default () => {
  return fetchConfig()
  .then(probe => {
    const {options} = probe
    const optionsParsed = options && JSON.parse(options)
    //Loading List into database
    return loadList(optionsParsed)
    .then(() => {
      return startLatencyCheck(probe)
    })
  })
  .then(() => {
    return launchServer()
  })
}