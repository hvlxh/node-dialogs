const { execSync } = require('child_process')
const { join } = require('path')

async function run(type, title, text) {
  let command, args
  const path = join(__dirname, '..', 'template.vbs')
  command = process.platform === 'win32' ? 'cscript' : 'wine cscript'
  args = [path, type, `"${title}"`, `"${text}"`]

  let output = execSync(`${command} ${args.join(' ')}`)
  output = output.toString()
  const versionPattern = /Windows Script Host Version \d+(\.\d+)?/

  if (versionPattern.test(output)) {
    output = output
      .replace(versionPattern, '')
      .replace(/[^\d.]/g, '')
      .replace(/^\../, '')
  }

  return output
}

module.exports = run
