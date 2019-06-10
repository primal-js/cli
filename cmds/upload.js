const ora = require('ora')
const path = require('path')

const CONSTANTS = require('../constants')
const manifestParser = require('../utils/manifest/parser')
const validateDependencies = require('../utils/manifest/validateDependencies')
const processFeatures = require('../utils/manifest/processFeatures')

module.exports = async (args) => {
  const spinner = ora().start()

  try {
    const processPath = process.cwd()
    const manifestPath = args.manifest || args.m || CONSTANTS.DEFAULT_MANIFEST_PATH
    const manifestDir = path.dirname(manifestPath)
    const manifest = manifestParser(manifestPath)
    const projectToken = args.token || args.t || manifest.projectToken
    const rootDir = path.resolve(path.join(processPath, manifestDir, manifest.rootDir))

    validateDependencies(manifest.components)

    const url = `${CONSTANTS.API_URL}/features/upload`
    const promises = processFeatures(url, rootDir, manifest.components, projectToken, 'project-secret')

    Promise.all(promises).then(results => {
      results.forEach(result => {
        if (result.error) {
          return console.error('Error uploading feature: ', result.feature.name, result.error)
        }
        console.info('Feature upload succed: ', result.feature.name)
      })
      
    })
   
    spinner.stop()

    console.log(`Reading manifest ${manifestPath}:`)
    console.log(manifest)
    console.log(`Project token: ${projectToken}`)
  } catch (err) {
    spinner.stop()

    console.error(err)
  }
}
