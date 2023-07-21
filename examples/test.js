const { Dialog } = require('../index')
const { ButtonClickedTypes } = require('../src/DialogTypes')

const dialog = new Dialog({
    title: "Title", 
    message: "Hello"
})
const value = dialog.run()
if(value === ButtonClickedTypes.Ok) {
    dialog.run()
}