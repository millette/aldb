'use strict'

// core
const fs = require('fs')
const { promisify } = require('util')

// npm
const level = require('level')
const fastGlob = require('fast-glob')

const db = level('dbdbdoo', { valueEncoding: 'json' })

const readFile = promisify(fs.readFile)

const doit = async () => {
  const counts = {
    entries: 0,
    oks: 0,
    errors: 0,
  }
  const i = setInterval(() => {
    console.error(new Date(), counts)
  }, 5000)
  const stream = fastGlob.stream('**/*.json', { stats: true, cwd: 'collections' })
  for await (const { path, stats: { size, mtime, ctime } } of stream) {
    ++counts.entries
    const content = await readFile('collections/' + path)
    const key = path.slice(0, -5)
    try {
      await db.put('file:' + key, {
        size,
        mtime,
        ctime,
        json: JSON.parse(content)
      })
      ++counts.oks
    } catch (error) {
      await db.put('error:' + key, {
        size,
        mtime,
        ctime,
        error: error.message,
        content: content.toString('utf8')
      })
      ++counts.errors
    }
  }
  clearInterval(i)
  return counts
}

doit().then(console.log).catch(console.error)
