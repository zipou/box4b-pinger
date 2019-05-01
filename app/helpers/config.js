import fetch from "node-fetch"

export const fetchConfig = () => {
  const TOKEN = process.env.PROBE_TOKEN
  const URL = `http://${getApiRoot()}/hosting/probe/${TOKEN}/get`
  return fetch(URL)
  .then(response => response.json())
}

export const getApiRoot = () => {
  if (process.env.NODE_ENV === "dev") return "box4b.localhost:4001"
  return "www.box4b.fr"
}

export const getWsRoot = () => {
  if (process.env.NODE_ENV === "dev") return "box4b.localhost:1337"
  return "www.box4b.fr:1337"
}