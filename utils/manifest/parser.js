'use strict'

const fs = require('fs')
const path = require('path')
const schemaValidator = require('./schemaValidator')

function manifestParser(manifestPath) {
  const data = fs.readFileSync(path.resolve(manifestPath), 'utf8')

  const manifest = parseManifest(data)

  const { error } = schemaValidator(manifest)
  if (error) {
    throw new Error(`There are errors in provided manifest: ${error}`)
  }

  return manifest
}

function parseManifest(data) {
  try {
    const manifest = JSON.parse(data)
    return manifest
  } catch (error) {
    throw new Error(`There was an error while parsing the manifest to a JSON: ${error.message}`)
  }
}

module.exports = manifestParser
