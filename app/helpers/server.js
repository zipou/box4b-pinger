import http from "http"
import express from "express"
import { findAll, getLastCheck } from "./datastore";

const app = express();

const URL_ROOT  = "/"

app.get(URL_ROOT, (req, res) => {

  let body = `<div className="container" style='display:flex; flex-direction: row; justifiy-content:center; align-items: center; '>`
  return getLastCheck()
  .then(lastCheck => {
    return findAll()
    .then(targetList => {
      targetList.map(target => {
        const {name, host, alive} = target
        body = `${body}
        <div style="display:flex; flex-direction: row; padding: 10px; justifiy-content:center; align-items: center; width: 33%;">
          <div style='width: 30px; height:30px; border-radius:50%; background-color:${(alive) ? "#5cb85c": "#b30c0c"}'></div>
          <div style="padding-left: 10px;">${name} ${(alive) ? "" : "DOWN :("}</div>
        </div>`
      })

      body = `${body}</div>`

      let css = `
        @import url('https://fonts.googleapis.com/css?family=Lato');

        body {
          font-family: 'Lato', sans-serif;
        }

        button {
          font-family: 'Lato', sans-serif;
          font-size: 18px;
          padding: 5px 9px;
          border-radius: 5px;
          color: #fff;
          background-color: #5bc0de;
          border-color: #46b8da;
          cursor: pointer;
        }

      `


      let html = `<html>
        <head>
          <style type='text/css'>${css}</style>
        </head>
        <body>
          ${body}
          <div style="padding: 10px;">
            <div style="padding-bottom: 10px;">Last checked on ${lastCheck.toLocaleDateString()}  ${lastCheck.toLocaleTimeString()}</div>
            <div><a href="${URL_ROOT}"><button>Refresh</button></a></div>
          </div>
        </body>
      </html>`
      res.end(html)
    })
  })
})

export const launchServer = () => {
  const PORT = process.env.PORT || 8080
  const server = http.createServer(app);
  server.listen(PORT)
  console.log(`Server is up and running on port ${PORT}`)
  return Promise.resolve(true)
}