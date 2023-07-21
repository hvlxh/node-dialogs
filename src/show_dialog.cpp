#include <node_api.h>
#include <string.h> // For strcmp

#include <windows.h> // Required for Windows MessageBox

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

  // Parse button type
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

  // Parse icon type
  UINT icon = MB_ICONINFORMATION;
  if (strcmp(iconType, "ERROR") == 0) {
    icon = MB_ICONERROR;
  } else if (strcmp(iconType, "WARNING") == 0) {
    icon = MB_ICONWARNING;
  } else if (strcmp(iconType, "QUESTION") == 0) {
    icon = MB_ICONQUESTION;
  }

  // Parse default button type
  UINT defaultButton = 0;
  if (strcmp(defaultButtonType, "DEFAULT_2") == 0) {
    defaultButton = MB_DEFBUTTON2;
  } else if (strcmp(defaultButtonType, "DEFAULT_3") == 0) {
    defaultButton = MB_DEFBUTTON3;
  } else if (strcmp(defaultButtonType, "DEFAULT_4") == 0) {
    defaultButton = MB_DEFBUTTON4;
  }

  // Display the MessageBox
  int result = MessageBox(nullptr, message, title, buttons | icon | defaultButton);
  napi_value resultValue;
  napi_create_int32(env, result, &resultValue);

  // Cleanup
  delete[] title;
  delete[] message;
  delete[] buttonType;
  delete[] iconType;
  delete[] defaultButtonType;

  return resultValue; // Since we are not returning any value, we use nullptr
}

napi_value Init(napi_env env, napi_value exports) {
  napi_value fn;
  napi_create_function(env, "showDialog", NAPI_AUTO_LENGTH, ShowDialog, nullptr, &fn);
  napi_set_named_property(env, exports, "showDialog", fn);
  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
