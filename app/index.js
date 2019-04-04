import list from "../list.json"
import {loadList} from "./helpers/datastore";
import {ping} from "./helpers/network";
import {db} from "./helpers/datastore"
import {launchBatch} from "./helpers/batch";
import {launchServer} from './helpers/server'
import {startCheck} from './helpers/check'

export default () => {
  //Loading List into database
  return loadList(list)
  // .then(() => {
  //     return startCheck()
  // })
  // // .then(() => {
  // //     return launchBatch()
  // // })
  .then(() => {
    return launchServer()
  })
}