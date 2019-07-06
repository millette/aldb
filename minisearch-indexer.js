'use strict'

// core
const fs = require('fs')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)

// npm
const level = require('level')
const MiniSearch = require("minisearch")

const db = level('dbdbdoo', { valueEncoding: 'json' })

const opts = {
  fields: [
    "nom-machine",
    "sous-type",
    "type",
    "nom"
  ]
}

/*
const index = new MiniSearch(opts)
*/

let index

const oy = []

const doit = async () => {
  if (true) {
    const now = Date.now()
    const cnt = await readFile('mini-index-v2.json', 'utf8') // mini-index-v1.json
    const now2 = Date.now()
    console.error('READFILE', now2 - now, cnt && cnt.length)

    index = MiniSearch.loadJSON(cnt, opts)
    return console.error('IMPORT', Date.now() - now2)
  }

  const stream = db.createReadStream({
    gt: "file:"
  })
  for await (const { key, value: { json } } of stream) {
    oy.push(key)
    const id = oy.length - 1
    try {
        index.add({ ...json, id })
    } catch (e) {
      console.error('ERROR', id, key, e)
    }
  }
  return index.toJSON()
}

doit()
  .then((bah) => {
    if (bah) return console.log(JSON.stringify(bah, null, '  '))

    const now = Date.now()
    const ok = index.search('montreal')
    console.log(Date.now() - now, JSON.stringify(ok, null, '  '))
  })
  .catch(console.error)
