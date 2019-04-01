import { runCommand } from "../libs/System";

export const ping = ({host, timeout = 0.5, pingCount = 3}) => {
  const command = `ping -i 0.1 -c ${pingCount} -W ${timeout} ${host}`
  // console.log(command)
  return runCommand(command)
}