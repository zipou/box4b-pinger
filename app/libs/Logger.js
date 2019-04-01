export const debug = (message) => {
  // console.log(message)
}
export const info = (message) => {
  console.log(message)
}
export const warn = (message) => {
  console.log(message)
}
export const error = (error) => {
  console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)))
}

export default debug;