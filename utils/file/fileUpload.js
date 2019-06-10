const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const path = require('path')

// require('axios-debug')(axios)

function fileUpload(url, filePath, data, projectToken, projectSecret) {
  const form = new FormData()
  form.append('file', fs.createReadStream(path.resolve(filePath)))

  Object.keys(data).forEach(key => {
    form.append(key, data[key])
  })

  return axios.post(url, form, {
    headers: form.getHeaders(),
  })
}

module.exports = fileUpload
