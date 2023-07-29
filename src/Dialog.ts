// @ts-ignore
import { showDialog } from '../build/Release/dialog';
import { ButtonTypes, IconTypes, DefaultButtonTypes} from './DialogTypes'

export class Dialog {
    private message: string;
    private title: string;
    private buttonType: ButtonTypes;
    private iconType: IconTypes;
    private defaultButtonType: DefaultButtonTypes;

    constructor(title: string | {
        title: string,
        message: string,
        buttonType: ButtonTypes,
        defaultButtonType: DefaultButtonTypes,
        iconType: IconTypes
    }, message: string, buttonType: ButtonTypes = ButtonTypes.Ok, iconType: IconTypes = IconTypes.Information, defaultButtonType: DefaultButtonTypes = DefaultButtonTypes.One) {
        if(typeof title === "object") {
            if(!title["message"]) throw new Error('"message" arg is not available');
            if(!title["title"]) throw new Error('"title" arg is not available');

            this.title = title["title"]
            this.message =  title["message"]
            this.buttonType =  title["buttonType"],
            this.defaultButtonType =  title["defaultButtonType"]
            this.iconType =  title["iconType"]
        } else if (typeof title == 'string') { 
            this.title = title
            this.message = message
            this.buttonType = buttonType,
            this.defaultButtonType = defaultButtonType,
            this.iconType = iconType
        }
    }

    setTitle(title: string) {
        this.title = title
    }

    setMessage(message: string) {
        this.message = message
    }

    setButtonType(buttonType: ButtonTypes) {
        this.buttonType = buttonType
    }

    setDefaultButtonType(defaultButtonType: DefaultButtonTypes) {
        this.defaultButtonType = defaultButtonType
    }

    setIconType(iconType: IconTypes) {
        this.iconType = iconType
    }

    run() {
        if(typeof this.message != 'string') throw new Error('"message" is undefined')
        if(typeof this.title != 'string') throw new Error('"title" is undefined')
        const { message, title, buttonType, defaultButtonType, iconType } = this

        return showDialog(message, title, buttonType, defaultButtonType, iconType)
    }
}