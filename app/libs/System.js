import fs from 'fs'
import os from 'os'
import {exec} from 'child_process';

export const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      }
      resolve(stdout,stderr)
    })
  })
}
