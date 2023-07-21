declare module "node-dialogs" {
    interface DialogOptions {
        title: string
        message: string
        buttonType: string
        iconType: string
        defaultButtonType: string
    }

    export enum ButtonTypes {
        AbortRetryIgnore = "ABORT_RETRY_IGNORE",
        CancelTryContinue = "CANCEL_TRY_CONTINUE",
        Ok = "OK",
        OkCancel = "OK_CANCEL",
        RetryCancel = "RETRY_CANCEL",
        YesNo = "YES_NO",
        YesNoCancel = "YES_NO_CANCEL",
    }
    
    export enum IconTypes {
        Information = "INFORMATION",
        Error = "ERROR",
        Stop = "ERROR",
        Warning = "WARNING",
        Exclamation = "WARNING",
        Question = "QUESTION",
    }
    
    export enum DefaultButtonTypes {
        One = "DEFAULT_1",
        Two = "DEFAULT_2",
        Three = "DEFAULT_3",
        Four = "DEFAULT_4", 
    }
    
    export enum ButtonClickedTypes {
        Ok = 1,
        Cancel = 2,
        Abort = 3,
        Retry = 4,
        Ignore = 5,
        Yes = 6,
        No = 7,
        TryAgain = 10,
        Continue = 11,
    }

    export class Dialog {
        private title: string
        private message: string
        private buttonType: string
        private iconType: string
        private defaultButtonType: string

        constructor(title: string | DialogOptions, message: string, buttonType: string, iconType: string, defaultButtonType: string)
        run(): ButtonClickedTypes
        setTitle(title: string): Dialog
        setMessage(message: string): Dialog
        setButtonType(buttonType: string): Dialog
        setIconType(iconType: string): Dialog
        setDefaultButtonType(defaultButtonType: string): Dialog
    }
}