require('dotenv').config({ silent: true })
const server = require('../../server')
const FarmsDB = require('./unit/db-farm')
const FarmModel = require('./unit/model-farm')

let count = 0

const done = () => {
  count++
  if (count === 2) return closeServer()
}

const closeServer = () => {
  setTimeout(() => {
    server.close()
    process.exit()
  }, 2000)
}

server.emitter.on('ready', () => {
  FarmsDB(server, done)
  FarmModel(server, done)
})
