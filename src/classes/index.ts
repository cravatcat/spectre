export const schema = [
  {
    "type": "Form",
    "props": {
      "layout": "vertical",
      "size": "middle",
      "labelAlign": "left",
      "initialValues": {
        "gender": "secret",
        "role": "user"
      }
    },
    "items": [
      {
        "type": "Input",
        "name": "username",
        "label": "用户名",
        "itemProps": {
          "rules": [{ "required": true, "message": "请输入用户名" }],
          "tooltip": "这是您的唯一标识"
        },
        "componentProps": {
          "placeholder": "请输入...",
          "allowClear": true
        }
      },
      {
        "type": "Select",
        "name": "role",
        "label": "用户角色",
        "itemProps": {
          "rules": [{ "required": true, "message": "请选择角色" }]
        },
        "componentProps": {
          "placeholder": "请选择角色",
          "options": [
            { "label": "管理员 (Admin)", "value": "admin" },
            { "label": "开发者 (Dev)", "value": "developer" },
            { "label": "普通用户 (User)", "value": "user" }
          ]
        }
      },
      {
        "type": "Radio",
        "name": "gender",
        "label": "性别",
        "componentProps": {
          "options": [
            { "label": "男", "value": "male" },
            { "label": "女", "value": "female" },
            { "label": "保密", "value": "secret" }
          ]
        }
      },
      {
        "type": "Checkbox",
        "name": "interests",
        "label": "兴趣爱好",
        "itemProps": {
          "rules": [{ "required": true, "message": "至少选择一项兴趣" }]
        },
        "componentProps": {
          "options": [
            { "label": "编程 (Coding)", "value": "coding" },
            { "label": "阅读 (Reading)", "value": "reading" },
            { "label": "游戏 (Gaming)", "value": "gaming" }
          ]
        }
      },
      {
        "type": "TreeSelect",
        "name": "department",
        "label": "所属部门",
        "itemProps": {
          "tooltip": "请选择您的组织架构"
        },
        "componentProps": {
          "placeholder": "请选择部门",
          "treeDefaultExpandAll": true,
          "treeData": [
            {
              "label": "总部",
              "value": "hq",
              "children": [
                {
                  "label": "研发中心",
                  "value": "rd",
                  "children": [
                    { "label": "前端组", "value": "rd-fe" },
                    { "label": "后端组", "value": "rd-be" }
                  ]
                },
                {
                  "label": "市场部",
                  "value": "marketing"
                }
              ]
            }
          ]
        }
      },
      {
        "type": "Custom",
        "name": "自定义组件",
        "component": "SpecialX",
        "label": "自定义组件label",
        "itemProps": {
          "rules": [{ "required": true, "message": "xxx" }]
        }
      }
    ]
  },
  {
    "type": "非form",
    "component": "SpecialX2"
  }
]