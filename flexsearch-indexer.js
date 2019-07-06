'use strict'

// core
const fs = require('fs')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)

// npm
const level = require('level')
const { create } = require("flexsearch")

const db = level('dbdbdoo', { valueEncoding: 'json' })
const index = create(
  // fast score speed match default balance* memory*
  {
    // memory
    encode: "extra",
    tokenize: "strict",
    threshold: 0,
    resolution: 1,

    /*
    // balance
    encode: "balance",
    tokenize: "strict",
    threshold: 0,
    resolution: 3,
    depth: 3,
    */

    doc: {
      id: "_ID",
      field: [
        "nom-machine",
        "sous-type",
        "type",
        "nom"
      ]
    }
  },
)

const oy = []

const doit = async () => {
  if (true) {
    const now = Date.now()
    const cnt = await readFile('flex-index-doc-v3-memory-c.json', 'utf8') // flex-index-doc-v3-balance-c.json
    const now2 = Date.now()
    console.error('READFILE', now2 - now, cnt && cnt.length)

    index.import(cnt)
    return console.error('IMPORT', Date.now() - now2)
  }

  const stream = db.createReadStream({
    gt: "file:"
  })
  for await (const { key, value: { json } } of stream) {
    oy.push(key)
    index.add({ ...json, _ID: oy.length - 1 })
  }

  return index.export()
}

doit()
  .then((bah) => {
    if (bah) return console.log(JSON.stringify(bah, null, '  '))
    const ok = index.search('montreal')
    console.log(JSON.stringify(ok, null, '  '))
  })
  .catch(console.error)
