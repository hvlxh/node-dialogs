class DialogTypes {
  static None = 0
  static Error = 16
  static Question = 36
  static Warning = 48
  static Information = 64
}

class DialogBtnTypes {
  static OKOnly = 0
  static OKCancel = 1
  static AbortRetryIgnore = 2
  static YesNoCancel = 3
  static YesNo = 4
  static RetryCancel = 5
}

class DialogDefaultBtnTypes {
  static Btn1 = 0
  static Btn2 = 256
  static Btn3 = 512
}

class DialogButtons {
  static Ok = 1
  static Cancel = 0
  static Yes = 0.1
  static No = 0.0
  static Abort = 1.0
  static Retry = 1.1
  static Ignore = 1.2
  static Unknown = -1
}

function DialogType(type, btnType, defaultBtn) {
  if (typeof type === 'number' && typeof btnType === 'number') {
    return type + btnType + (defaultBtn ? defaultBtn : 0)
  } else {
    throw new Error('Types are not right')
  }
}

module.exports = {
  DialogType,
  DialogTypes,
  DialogBtnTypes,
  DialogDefaultBtnTypes,
  DialogButtons,
}
