const { showDialog } = require('../build/Release/dialog')

class Dialog {
    message;
    title;
    buttonType;
    iconType;
    defaultButtonType;

    constructor(title, message, buttonType, iconType, defaultButtonType) {
        if(typeof title === "object") {
            if(!title["message"]) throw new Error('"message" arg is not available')
            if(!title["title"]) throw new Error('"title" arg is not available')

            this.title = title["title"]
            this.message =  title["message"]
            this.buttonType =  title["buttonType"] || "OK",
            this.defaultButtonType =  title["defaultButtonType"] || "DEFAULT_1",
            this.iconType =  title["iconType"] || "INFORMATION"
        } else if (typeof message == 'string' && typeof title !== 'string') { 
            this.title = title
            this.message = message
            this.buttonType = buttonType || "OK",
            this.defaultButtonType = defaultButtonType || "DEFAULT_1",
            this.iconType = iconType || "INFORMATION"
        }
    }

    setTitle(title) {
        this.title = title
    }

    setMessage(message) {
        this.message = message
    }

    setButtonType(buttonType) {
        this.buttonType = buttonType
    }

    setDefaultButtonType(defaultButtonType) {
        this.defaultButtonType = defaultButtonType
    }

    setIconType(iconType) {
        this.iconType = iconType
    }

    run() {
        if(typeof this.message !== 'string') throw new Error('"message" is undefined')
        if(typeof this.title !== 'string') throw new Error('"title" is undefined')
        const { message, title, buttonType, defaultButtonType, iconType } = this

        return showDialog(message, title, buttonType, defaultButtonType, iconType)
    }
}

module.exports = Dialog