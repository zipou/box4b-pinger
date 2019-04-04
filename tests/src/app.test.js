import listTest from "../config/list.test.json"
import {loadList} from "../../app/helpers/datastore";
import {ping} from "../../app/helpers/network";
import {db} from "../../app/helpers/datastore"
import {launchBatch} from "../../app/helpers/batch";
import {launchServer} from '../../app/helpers/server'
import {startCheck} from '../../app/helpers/check'

beforeAll(() => {
  return loadList(listTest)
})

describe("Batch Treatment", () => {
  test("Check and Close", () => {
    expect.assertions(1)
    return startCheck()
    .then(() => {
      expect(true).toBe(true)
    })
  })
})
