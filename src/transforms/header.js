export const transformHeaders = (headers) => {
  return headers.map(header => {
    const headerObject = {}
    let value = ''

    if (header.prefix) {
      value += header.prefix
    }

    if (header.transform && typeof header.transform === 'function') {
      if (header.args) {
        value += header.transform.apply(header.value, Object.values(header.args))
      } else {
        header.transform.apply(header.value)
      }
    } else {
      value += header.value
    }

    headerObject[header.key] = value

    return headerObject
  })
  .reduce((accumulator, value) => Object.assign(accumulator, value))
}
