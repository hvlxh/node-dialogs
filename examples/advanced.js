const {
  Dialog,
  DialogType,
  DialogTypes,
  DialogBtnTypes,
  DialogButtons,
} = require('better-dialog')

const pls = new Dialog({
  title: 'Please',
  text: 'Please',
  type: DialogType(DialogTypes.None, DialogBtnTypes.YesNo),
})

const question = new Dialog({
  title: 'Question',
  text: 'Do you like me?',
  type: DialogType(DialogTypes.Question, DialogBtnTypes.OKOnly),
})

const thx = new Dialog({
  title: 'Wow',
  text: 'Impressive... Thanks',
  type: DialogType(DialogTypes.Information, DialogBtnTypes.OKOnly),
})

async function main() {
  const ans = await question.run()
  const main = async () => {
    if (ans === DialogButtons.No) {
      const ans = await pls.run()
      if (ans === DialogButtons.No) {
        main()
      } else thx.run()
    } else thx.run()
  }

  main()
}

main()
