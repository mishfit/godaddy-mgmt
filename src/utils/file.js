import fs from 'fs'

export const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, `${JSON.stringify(data, null, 2)}\n`, function (e) {
      if (e) {
        reject(e)
      }
    })
  })
}
