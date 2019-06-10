const path = require('path')
const fileUpload = require('../file/fileUpload')

function processFeatures(url, rootDir, features, projectToken, projectSecret) {
  const promises = []

  features.forEach(feature => {
    const filePath = path.resolve(rootDir, feature.name)
    const data = {
      name: feature.name,
      version: feature.version,
      extension: 'vue',
    }
    
    const uploadPromise = fileUpload(url, filePath, data, projectToken, projectSecret).then(
      response => {
        return {
          feature,
        }
      },
      response => {
        return {
          error: response.response.data.payload,
          feature,
        }
      }
    )

    promises.push(uploadPromise)
  })

  return promises
}

module.exports = processFeatures