const run = require('./run')

class Dialog {
  title
  text
  type

  constructor(options) {
    if (typeof options === 'object')
      Object.entries(options).forEach(([k, v]) => (this[k] = v))
  }

  setTitle(title) {
    this.title = title

    return this
  }

  setText(text) {
    this.text = text

    return this
  }

  setType(type) {
    this.type = type

    return this
  }

  async run() {
    if (typeof this.type === 'undefined') {
      throw new Error('Type is not provided')
    } else if (typeof this.title === 'undefined') {
      throw new Error('Title is not provided')
    } else if (typeof this.text === 'undefined') {
      throw new Error('Text is not provided')
    }

    const value = await run(this.type, this.title, this.text)
    return parseFloat(value)
  }
}

module.exports = { Dialog }
