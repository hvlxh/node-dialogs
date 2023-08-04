#include <node_api.h>
#include <string.h> // For strcmp

#ifdef _WIN32
#include <windows.h> // Required for Windows MessageBox
#elif defined(__APPLE__)
#import <Cocoa/Cocoa.h> // Required for macOS NSAlert
#else
#include <cstdlib>   // Required for system on Unix/Linux
#endif

napi_value ShowDialog(napi_env env, napi_callback_info info) {
    size_t argc = 6;
    napi_value args[6];
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    // Extract title, message, button type, icon type, and default button type strings from JavaScript
    size_t titleLength, messageLength, buttonLength, iconLength, defaultButtonLength;
    napi_get_value_string_utf8(env, args[0], nullptr, 0, &titleLength);
    napi_get_value_string_utf8(env, args[1], nullptr, 0, &messageLength);
    napi_get_value_string_utf8(env, args[2], nullptr, 0, &buttonLength);
    napi_get_value_string_utf8(env, args[3], nullptr, 0, &iconLength);
    napi_get_value_string_utf8(env, args[4], nullptr, 0, &defaultButtonLength);

    char* title = new char[titleLength + 1];
    char* message = new char[messageLength + 1];
    char* buttonType = new char[buttonLength + 1];
    char* iconType = new char[iconLength + 1];
    char* defaultButtonType = new char[defaultButtonLength + 1];

    napi_get_value_string_utf8(env, args[0], title, titleLength + 1, &titleLength);
    napi_get_value_string_utf8(env, args[1], message, messageLength + 1, &messageLength);
    napi_get_value_string_utf8(env, args[2], buttonType, buttonLength + 1, &buttonLength);
    napi_get_value_string_utf8(env, args[3], iconType, iconLength + 1, &iconLength);
    napi_get_value_string_utf8(env, args[4], defaultButtonType, defaultButtonLength + 1, &defaultButtonLength);

    #ifdef _WIN32
    // Windows code using MessageBox
    UINT buttons = MB_OK;
    if (strcmp(buttonType, "OK_CANCEL") == 0) {
        buttons = MB_OKCANCEL;
    } else if (strcmp(buttonType, "YES_NO") == 0) {
        buttons = MB_YESNO;
    } else if (strcmp(buttonType, "YES_NO_CANCEL") == 0) {
        buttons = MB_YESNOCANCEL;
    } else if (strcmp(buttonType, "RETRY_CANCEL") == 0) {
        buttons = MB_RETRYCANCEL;
    } else if (strcmp(buttonType, "ABORT_RETRY_IGNORE") == 0) {
        buttons = MB_ABORTRETRYIGNORE;
    } else if (strcmp(buttonType, "CANCEL_TRY_CONTINUE") == 0) {
        buttons = MB_CANCELTRYCONTINUE;
    }

    UINT icon = MB_ICONINFORMATION;
    if (strcmp(iconType, "ERROR") == 0) {
        icon = MB_ICONERROR;
    } else if (strcmp(iconType, "WARNING") == 0) {
        icon = MB_ICONWARNING;
    } else if (strcmp(iconType, "QUESTION") == 0) {
        icon = MB_ICONQUESTION;
    }

    UINT defaultButton = 0;
    if (strcmp(defaultButtonType, "DEFAULT_2") == 0) {
        defaultButton = MB_DEFBUTTON2;
    } else if (strcmp(defaultButtonType, "DEFAULT_3") == 0) {
        defaultButton = MB_DEFBUTTON3;
    } else if (strcmp(defaultButtonType, "DEFAULT_4") == 0) {
        defaultButton = MB_DEFBUTTON4;
    }

    int result = MessageBox(nullptr, message, title, buttons | icon | defaultButton);
    #elif defined(__APPLE__)
    // macOS code using NSAlert
    NSAlert *alert = [[NSAlert alloc] init];
    [alert setMessageText:[NSString stringWithUTF8String:title]];
    [alert setInformativeText:[NSString stringWithUTF8String:message]];

    NSAlertStyle style = NSInformationalAlertStyle;
    if (strcmp(iconType, "ERROR") == 0) {
        style = NSCriticalAlertStyle;
    } else if (strcmp(iconType, "WARNING") == 0) {
        style = NSWarningAlertStyle;
    } else if (strcmp(iconType, "QUESTION") == 0) {
        style = NSInformationalAlertStyle; // macOS doesn't have a direct NSQuestionAlertStyle
    }
    [alert setAlertStyle:style];

    NSInteger result = 0;
    if (strcmp(buttonType, "OK") == 0) {
        [alert addButtonWithTitle:@"OK"];
        result = NSAlertFirstButtonReturn;
    } else if (strcmp(buttonType, "OK_CANCEL") == 0) {
        [alert addButtonWithTitle:@"OK"];
        [alert addButtonWithTitle:@"Cancel"];
        result = [alert runModal];
    } else if (strcmp(buttonType, "YES_NO") == 0) {
        [alert addButtonWithTitle:@"Yes"];
        [alert addButtonWithTitle:@"No"];
        result = [alert runModal];
    } else if (strcmp(buttonType, "YES_NO_CANCEL") == 0) {
        [alert addButtonWithTitle:@"Yes"];
        [alert addButtonWithTitle:@"No"];
        [alert addButtonWithTitle:@"Cancel"];
        result = [alert runModal];
    } else if (strcmp(buttonType, "RETRY_CANCEL") == 0) {
        [alert addButtonWithTitle:@"Retry"];
        [alert addButtonWithTitle:@"Cancel"];
        result = [alert runModal];
    } else if (strcmp(buttonType, "ABORT_RETRY_IGNORE") == 0) {
        [alert addButtonWithTitle:@"Abort"];
        [alert addButtonWithTitle:@"Retry"];
        [alert addButtonWithTitle:@"Ignore"];
        result = [alert runModal];
    } else if (strcmp(buttonType, "CANCEL_TRY_CONTINUE") == 0) {
        [alert addButtonWithTitle:@"Cancel"];
        [alert addButtonWithTitle:@"Try Again"];
        [alert addButtonWithTitle:@"Continue"];
        result = [alert runModal];
    }
    #else
    // Unix/Linux code using zenity
    char command[512];
    snprintf(command, sizeof(command), "zenity --title=\"%s\" --text=\"%s\" --", title, message);

    if (strcmp(buttonType, "OK") == 0) {
        strcat(command, "info --ok-label=\"OK\"");
    } else if (strcmp(buttonType, "OK_CANCEL") == 0) {
        strcat(command, "question --ok-label=\"OK\" --cancel-label=\"Cancel\"");
    } else if (strcmp(buttonType, "YES_NO") == 0) {
        strcat(command, "question --ok-label=\"Yes\" --cancel-label=\"No\"");
    } else if (strcmp(buttonType, "YES_NO_CANCEL") == 0) {
        strcat(command, "question --ok-label=\"Yes\" --extra-button=\"Cancel\" --extra-button=\"No\"");
    } else if (strcmp(buttonType, "RETRY_CANCEL") == 0) {
        strcat(command, "error --ok-label=\"Retry\" --cancel-label=\"Cancel\"");
    } else if (strcmp(buttonType, "ABORT_RETRY_IGNORE") == 0) {
        strcat(command, "error --ok-label=\"Abort\" --extra-button=\"Retry\" --extra-button=\"Ignore\"");
    } else if (strcmp(buttonType, "CANCEL_TRY_CONTINUE") == 0) {
        strcat(command, "error --ok-label=\"Cancel\" --extra-button=\"Try Again\" --extra-button=\"Continue\"");
    }

    if (strcmp(iconType, "ERROR") == 0) {
        strcat(command, " --icon-name=error");
    } else if (strcmp(iconType, "WARNING") == 0) {
        strcat(command, " --icon-name=warning");
    } else if (strcmp(iconType, "QUESTION") == 0) {
        strcat(command, " --icon-name=question");
    }

    int result = system(command);
    #endif

    napi_value resultValue;
    napi_create_int32(env, result, &resultValue);

    delete[] title;
    delete[] message;
    delete[] buttonType;
    delete[] iconType;
    delete[] defaultButtonType;

    return resultValue;
}

napi_value Init(napi_env env, napi_value exports) {
  napi_value fn;
  napi_create_function(env, "showDialog", NAPI_AUTO_LENGTH, ShowDialog, nullptr, &fn);
  napi_set_named_property(env, exports, "showDialog", fn);
  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
