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
      ],
      "conditions": [
        ["OS=='mac'", {
          "xcode_settings": {
            "OTHER_CFLAGS": [
              "-ObjC",
              "-stdlib=libc++"
            ],
            "OTHER_CPLUSPLUSFLAGS": [
              "-std=c++14"
            ]
          }
        }],
        ["OS!='win'", {
          "cflags": [
            "-std=c++14"
          ]
        }]
      ],
      "configurations": {
        "Debug": {
          "defines": ["DEBUG"]
        },
        "Release": {
          "defines": ["NDEBUG"],
          "msvs_settings": {
            "VCCLCompilerTool": {
              "RuntimeLibrary": 2
            }
          }
        }
      }
    }
  ]
}
