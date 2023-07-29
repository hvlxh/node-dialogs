const { Dialog, ButtonClickedTypes } = require('../build/native')

const dialog = new Dialog({
    title: "Title", 
    message: "Hello"
})

const value = dialog.run()
if(value === ButtonClickedTypes.Ok) {
    dialog.run()
}