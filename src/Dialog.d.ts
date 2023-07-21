import { ButtonClickedTypes } from "./DialogTypes"

interface DialogOptions {
    title: string
    message: string
    buttonType: string
    iconType: string
    defaultButtonType: string
}

class Dialog {
    private title: string
    private message: string
    private buttonType: string
    private iconType: string
    private defaultButtonType: string

    constructor(title: string | DialogOptions, message: string, buttonType: string, iconType: string, defaultButtonType: string)
    run(): ButtonClickedTypes
}