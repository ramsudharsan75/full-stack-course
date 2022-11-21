const info = (...params) => process.env.NODE_ENV !== 'test' ? console.log(...params) : null
// const error = (...params) => process.env.NODE_ENV !== 'test' ? console.error(...params) : null
const error = (...params) => console.error(...params)

module.exports = { info, error }
