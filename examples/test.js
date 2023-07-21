const { Dialog, ButtonClickedTypes } = require('../index')

const dialog = new Dialog({
    title: "Title", 
    message: "Hello"
})

const value = dialog.run()
if(value === ButtonClickedTypes.Ok) {
    dialog.run()
}