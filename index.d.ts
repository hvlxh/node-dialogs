declare module "better-dialog" {  
  export interface DialogOptions {
    title: string;
    text: string;
    type: DialogTypes
  }

  export class Dialog {
    private title: string
    private text: string
    private type: DialogTypes

    constructor(options: DialogOptions)

    setTitle(title: string): Dialog
    setText(text: string): Dialog
    setType(type: DialogTypes): Dialog

    run(): Promise<DialogButtons>
  }


  export enum DialogTypes {
    None = 0,
    Error = 16,
    Question = 36,
    Warning = 48,
    Information = 64
  }

  export enum DialogBtnTypes {
    OKOnly = 0,
    OKCancel = 1,
    AbortRetryIgnore = 2,
    YesNoCancel = 3,
    YesNo = 4,
    RetryCancel = 5
  }

  export enum DialogDefaultBtnTypes {
    Btn1 = 0,
    Btn2 = 256,
    Btn3 = 512
  }

  export enum DialogButtons {
    Ok = 1,
    Cancel = 0,
    Yes = 0.1,
    No = 0.0,
    Abort = 1.0,
    Retry = 1.1,
    Ignore = 1.2,
    Unknown = -1
  }

  export function DialogType(type: DialogTypes, btnType: DialogBtnTypes, defaultBtn: DialogDefaultBtnTypes): number
}