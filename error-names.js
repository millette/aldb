'use strict'

// npm
const level = require('level')

const db = level('dbdbdoo', { valueEncoding: 'json' })

const doit = async () => {
  const stream = db.createKeyStream({
    lt: "error:\ufff0"
  })
  for await (const key of stream) {
    console.log('collections/' + key.split(':').slice(1).join(':') + '.json')
  }
}

doit().then(console.log).catch(console.error)
