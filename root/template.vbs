Set arguments = WScript.Arguments

If arguments.Count < 3 Then
    WScript.Echo "Invalid number of arguments provided."
    WScript.Quit(1)
End If

msgType = arguments(0)
msgTitle = arguments(1)
msgText = arguments(2)

response = MsgBox(msgText, msgType, msgTitle)

If response = vbOK Then
    WScript.Echo "1"
ElseIf response = vbCancel Then
    WScript.Echo "0"
ElseIf response = vbYes Then
    WScript.Echo "0.1"
ElseIf response = vbNo Then
    WScript.Echo "0.0"
ElseIf response = vbAbort Then
    WScript.Echo "1.0"
ElseIf response = vbRetry Then
    WScript.Echo "1.1"
ElseIf response = vbIgnore Then
    WScript.Echo "1.2"
Else 
    WScript.Echo "-1"
End If