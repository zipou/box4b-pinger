import {ping, checkSocketOpen} from "../../../app/helpers/network";

describe('Ping Test', () => {
  test('Ping alive host must return OK', () => {
    return ping({
      host : "8.8.8.8",
      timeout: 0.5,
      pingCount: 3,
    })
    .then(result => {
      expect(true).toBe(true);
    })
    .catch(error => {
      expect(true).toBe(false);
    })
  })

  test('Ping dead host must return raise Error', () => {
    return ping({
      host : "10.10.10.10",
      timeout: 0.5,
      pingCount: 3,
    })
    .then(result => {
      expect(true).toBe(false);
    })
    .catch(error => {
      expect(true).toBe(true);
    })
  })
})

describe('Socket Test', () => {
  test('Test alive Socket must return OK and close', () => {
    return checkSocketOpen({
      host : "172.217.22.131", // Google.fr
      timeout: 1000,
      port: 80
    })
    .then(result => {
      expect(true).toBe(true);
    })
    .catch(error => {
      expect(true).toBe(false);
    })
  })

  test('Test alive Socket with low timeout must raise an error and close', () => {
    return checkSocketOpen({
      host : "172.217.22.131", // Google.fr
      timeout: 1,
      port: 80
    })
    .then(result => {
      expect(true).toBe(false);
    })
    .catch(error => {
      expect(true).toBe(true);
    })
  })


  test('Test dead Socket with default timeout must raise an error and close', () => {
    return checkSocketOpen({
      host : "10.10.10.10", // Google.fr
      port: 80
    })
    .then(result => {
      expect(true).toBe(false);
    })
    .catch(error => {
      expect(true).toBe(true);
    })
  })

  test('Test dead Socket with high timeout must raise an error and close', () => {
    return checkSocketOpen({
      host : "10.10.10.10", // Google.fr
      timeout: 5000,
      port: 80
    })
    .then(result => {
      expect(true).toBe(false);
    })
    .catch(error => {
      expect(true).toBe(true);
    })
  })

})