const { Dialog, ButtonTypes, IconTypes } = require('../build')

async function main() {
    const dialog = new Dialog("Test", "Hello!", ButtonTypes.Ok, IconTypes.Information)
    const value = await dialog.run()
    console.log(value)
}

main()