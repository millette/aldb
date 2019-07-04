'use strict'

// npm
const level = require('level')

const db = level('dbdbdoo', { valueEncoding: 'json' })

const doit = async () => {
  const stream = db.createReadStream({
    lt: "error:\ufff0"
  })
  for await (const { key, value } of stream) {
    const fn = 'collections/' + key.split(':').slice(1).join(':') + '.json'
    console.log(JSON.stringify(
      {
        fn,
        value
      },
      null,
      "  "
    ))
  }
}

doit().then(console.log).catch(console.error)
