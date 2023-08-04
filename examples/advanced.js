const { Dialog, ButtonTypes, IconTypes, DefaultButtonTypes, ButtonClickedTypes } = require('../build')

async function please() {
    const dialog = new Dialog({
        title: "please",
        message: "please",
        buttonType: ButtonTypes.YesNo,
        defaultButtonType: DefaultButtonTypes.One,
        iconType: IconTypes.Question
    })

    const value = await dialog.run()
    if (value === ButtonClickedTypes.No) {
        please()
    } else {
      dialog
        .setTitle('Alright')
        .setMessage('Yay thanks')
        .setIconType(IconTypes.Information)
        .setButtonType(ButtonTypes.Ok)
        .run()        
    }
}

async function main() {
    const dialog = new Dialog({
        title: "An normal question",
        message: "Do you love me?",
        buttonType: ButtonTypes.YesNo,
        defaultButtonType: DefaultButtonTypes.One,
        iconType: IconTypes.Question
    })

    const value = await dialog.run()
    if (value === ButtonClickedTypes.No) {
        please()
    } else {
      dialog
        .setTitle('Alright')
        .setMessage('Yay thanks (no excuses)')
        .setIconType(IconTypes.Information)
        .setButtonType(ButtonTypes.Ok)
        .run()        
    }
}

main()