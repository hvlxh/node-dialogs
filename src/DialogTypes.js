class ButtonTypes {
    static AbortRetryIgnore = "ABORT_RETRY_IGNORE"
    static CancelTryContinue = "CANCEL_TRY_CONTINUE"
    static Ok = "OK"
    static OkCancel = "OK_CANCEL"
    static RetryCancel = "RETRY_CANCEL"
    static YesNo = "YES_NO"
    static YesNoCancel = "YES_NO_CANCEL"
}

class IconTypes {
    static Information = "INFORMATION"
    static Error = "ERROR"
    static Stop = "ERROR"
    static Warning = "WARNING"
    static Exclamation = "WARNING"
    static Question = "QUESTION"
}

class DefaultButtonTypes {
    static One = "DEFAULT_1"
    static Two = "DEFAULT_2"
    static Three = "DEFAULT_3"
    static Four = "DEFAULT_4" 
}

class ButtonClickedTypes {
    static Ok = 1
    static Cancel = 2
    static Abort = 3
    static Retry = 4
    static Ignore = 5
    static Yes = 6
    static No = 7
    static TryAgain = 10
    static Continue = 11
}

module.exports = {
    ButtonTypes,
    DefaultButtonTypes,
    IconTypes,
    ButtonClickedTypes
}