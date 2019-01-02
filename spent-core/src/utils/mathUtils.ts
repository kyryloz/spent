const generate = require('nanoid/generate') // tslint:disable-line

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export const generateId = () => {
  const id = generate(alphabet, 12)
  const left = id.substr(0, 6)
  const right = id.substr(6, 12)

  return `${left}-${right}`
}
