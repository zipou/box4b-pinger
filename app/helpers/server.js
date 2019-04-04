import http from "http"
import express from "express"
import { findAll, getLastCheck } from "./datastore";
import { startCheck } from "./check";

const app = express();

const URL_ROOT  = "/"
const STATIC_PATH = `${__dirname}/../static`
app.use(express.static(STATIC_PATH))
app.get(URL_ROOT, (req, res) => {

  let body = `<div class="container">`
  return startCheck()
  .then(() => {
    return getLastCheck()
  })
  .then(lastCheck => {
    return findAll()
    .then(targetList => {
      targetList.map(target => {
        const {name, host, alive} = target
        body = `${body}
        <div class="item-container">
          <div class="icon" style='background-color:${(alive) ? "#5cb85c": "#b30c0c"}'></div>
          <div style="padding-left: 10px;">${name} ${(alive) ? "" : "DOWN :("}</div>
        </div>`
      })

      body = `${body}</div>`

      let css = `
        @import url('https://fonts.googleapis.com/css?family=Lato');

        body {
          font-family: 'Lato', sans-serif;
          background-color: #003956;
          color: white;
        }

        button {
          font-family: 'Lato', sans-serif;
          font-size: 16px;
          padding: 5px 9px;
          border-radius: 5px;
          color: #fff;
          background-color: #5bc0de;
          border-color: #46b8da;
          cursor: pointer;
        }

        .container {
          display:flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
        }

        .item-container {
          display:flex;
          flex-direction: row;
          padding: 10px;
          justify-content:flex-start;
          align-items: center;
          min-width: 400px;
          flex-wrap: wrap;
        }

        .icon {
          width: 30px;
          height:30px;
          border-radius:50%;
        }

      `


      let html = `<html>
        <head>
          <style type='text/css'>${css}</style>
        </head>
        <body>
          <div style="">
            <img src='/logo.png' style="width: 200px;" />
          <div>
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