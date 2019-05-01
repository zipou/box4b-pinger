import {Socket} from "net"
import {client as WebSocketClient} from 'websocket'
import {runCommand} from "../libs/System";
import { getWsRoot } from "./config";

export const ping = ({host, timeout = 0.5, pingCount = 3}) => {
  return new Promise((resolve, reject) => {
    let result = false
    const command = `ping -i 0.1 -c ${pingCount} -W ${timeout} ${host}`
    // console.log(command)
    runCommand(command)
    .then(() => {
      result = true
      // console.log(`Ping OK ${host}`)
      resolve(true)
    })
    .catch(() => {
      reject(true)
    })
    setTimeout(() => {
      if (!result) {
        // console.log(`Timeout exceeded ${host}`)
        reject("Timeout exceeded")
      }
    }, 500)
  })
}


export const checkSocketOpen = ({host, port, timeout = 1000}) => {
  return new Promise((resolve, reject) => {
    const socket = new Socket();

		const onError = () => {
      socket.destroy();
			reject();
		};

    socket.setTimeout(timeout)
    socket.on('error', onError)
    socket.on('timeout', onError);

    socket.connect(port, host, () => {
      socket.end();
			resolve(true);
		});

  })
}

export const startLatencyCheck = (probe) => {
  const {id} = probe
  const wsUrl = `ws://${getWsRoot()}?token=${id}`
  console.log(`Connecting to ${wsUrl}`)

  let client = new WebSocketClient();

  const connect = () => {
    client.connect(wsUrl)
  }

  client.on('connectFailed', function(error) {
      console.log('Connect Error: ' + error.toString());
      console.log(`Trying to reconnect in 5 seconds`)
      setTimeout(() => {
        connect()
      }, 5000)
  });

  client.on('connect', function(connection) {
      console.log('WebSocket Client Connected');
      connection.on('error', function(error) {
          console.log("Connection Error: " + error.toString());
      });
      connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
        console.log(`Trying to reconnect in 5 seconds`)
        setTimeout(() => {
          connect()
        }, 5000)
      });
      connection.on('message', function(message) {
          if (message.type === 'utf8') {
            // console.log("Received: '" + message.utf8Data + "' sending back...");
            connection.sendUTF(message.utf8Data)
          }
      });
  });

  connect();
}