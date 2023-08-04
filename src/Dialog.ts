// @ts-ignore
import { showDialog } from '../build/Release/dialog.node';
import { ButtonTypes, IconTypes, DefaultButtonTypes, ButtonClickedTypes} from './DialogTypes'

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

    /**
     * Set the title of the dialog.
     * 
     * @param title An parameter to set the title.
     * @returns The Dialog class
     */
    setTitle(title: string): Dialog {
        this.title = title

        return this;
    }

    /**
     * Set the message of the dialog.
     * 
     * @param message An parameter to set the message
     * @returns The Dialog class
     */
    setMessage(message: string): Dialog {
        this.message = message

        return this;
    }

    /**
     * Set the button type of the dialog.
     * 
     * @param buttonType An parameter to set the button type of the dialog.
     * @returns The Dialog class
     */
    setButtonType(buttonType: ButtonTypes): Dialog {
        this.buttonType = buttonType

        return this;
    }

    /**
     * Set the default button type of the dialog.
     * 
     * @param defaultButtonType An parameter to set the default button type of the dialog.
     * @returns The Dialog class
     */
    setDefaultButtonType(defaultButtonType: DefaultButtonTypes): Dialog {
        this.defaultButtonType = defaultButtonType

        return this;
    }

    /**
     * Set the icon type of the dialog
     * 
     * @param iconType An parameter to set the icon type of the dialog.
     * @returns The Dialog class.
     */
    setIconType(iconType: IconTypes): Dialog {
        this.iconType = iconType

        return this;
    }

    /**
     * Run this function to show the dialog.
     * 
     * @returns Shows the dialog.
     */
    run(): Promise<ButtonClickedTypes> {
        if(typeof this.message != 'string') throw new Error('"message" is undefined')
        if(typeof this.title != 'string') throw new Error('"title" is undefined')
        const { message, title, buttonType, defaultButtonType, iconType } = this

        return new Promise<ButtonClickedTypes>((resolve) => {
            const value = showDialog(title, message, buttonType, defaultButtonType, iconType)
            resolve(value)
        })
    }
}