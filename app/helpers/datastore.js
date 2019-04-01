import Datastore from "nedb-promise"

export const db = new Datastore({
  inMemoryOnly: true,
});

export const loadList = (targetList) => {
  return db.insert(targetList)
}

export const findAll = () => {
  return db.find({})
  .then(list => {
    return list.sort((el1, el2) => el1.name.localeCompare(el2.name))
  })
}