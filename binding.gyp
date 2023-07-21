{
  "targets": [
    {
      "target_name": "dialog",
      "sources": ["src/show_dialog.cpp"],
      "defines": ["NAPI_CPP_EXCEPTIONS"],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ]
    }
  ]
}
