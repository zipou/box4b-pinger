import http from "http"
import express from "express"
import { findAll } from "./datastore";

const app = express();

const URL_ROOT  = "/"

app.get(URL_ROOT, (req, res) => {


  let body = ``
  findAll()
  .then(targetList => {
    targetList.map(target => {
      const {name, host, alive} = target
      body = `${body}
      <div style="display:flex; flex-direction: row; padding: 10px; justifiy-content:center; align-items: center;">
        <div style='width: 30px; height:30px; border-radius:50%; background-color:${(alive) ? "#5cb85c": "#b30c0c"}'></div>
        <div style="padding-left: 10px;">${name} ${(alive) ? "" : "DOWN :("}</div>
      </div>`
    })

    let css = `
      @import url('https://fonts.googleapis.com/css?family=Lato');

      body {
        font-family: 'Lato', sans-serif;
      }
    `


    let html = `<html>
      <head>
        <style type='text/css'>${css}</style>
      </head>
      <body>
        ${body}
        <a href="${URL_ROOT}"><button>Refresh</button></a>
      </body>
    </html>`
    res.end(html)
  })
})

export const launchServer = () => {
  const PORT = 8085
  const server = http.createServer(app);
  server.listen(PORT)
  console.log(`Server is up and running on port ${PORT}`)
  return Promise.resolve(true)
}