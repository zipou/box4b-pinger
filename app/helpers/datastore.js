import Datastore from "nedb-promise"

export const db = new Datastore({
  inMemoryOnly: true,
});

export let params = {
  lastCheck: new Date(),
}

export const updateLastCheck = () => {
  params["lastCheck"] = new Date();
  return Promise.resolve(true)
}

export const getLastCheck = () => {
  return Promise.resolve(params["lastCheck"]);
}

export const loadList = (targetList) => {
  return db.insert(targetList)
}

export const findAll = () => {
  return db.find({})
  .then(list => {
    return list.sort((el1, el2) => el1.name.localeCompare(el2.name))
  })
}