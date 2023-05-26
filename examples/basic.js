const {
  Dialog,
  DialogBtnTypes,
  DialogType,
  DialogTypes,
} = require('better-dialog')

const type = DialogType(DialogTypes.Information, DialogBtnTypes.OKOnly)
const dialog = new Dialog()
  .setTitle('better-dialog')
  .setText('This is an example to use better-dialog!')
  .setType(type)

dialog.run()
