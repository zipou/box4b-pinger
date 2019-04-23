import {Socket} from "net"
import { runCommand } from "../libs/System";

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