import Mock from "mockjs"

//获取验证码
Mock.mock("login/code", "get", {
  code: 200,
  message: "获取成功!",
  data: "@word(4)"
})
//登录
Mock.mock("users/login", "post", (options) => {
  console.log(options)
  // 如果需要在返回的对象中再使用mock的语法，则需要再使用Mock.mock
  return Mock.mock({
    code: 200,
    data: {
      token: "@word(15)"
    },
    message: "登陆成功"
  })
})
//获取用户信息
Mock.mock("users/info", "post", (options) => {
  console.log(options)
  return Mock.mock({
    code: 200,
    data: {
      roles: ["admin"],
      userName: "admin"
    },
    message: "获取成功!"
  })
})

// 获取图表列表
Mock.mock("/api/chartList", "get", {
  code: 200,
  message: "获取成功！",
  data: {
    "pie|5-10": [
      {
        id: "@increment(1)", // 自增的Id值
        date: "@Date",
        num: "@natural(10, 100)",
        avgNum: "@natural(10, 100)"
      }
    ],
    "line|5-10": [
      {
        id: "@increment(1)", // 自增的Id值
        date: "@Date",
        num: "@natural(10, 100)",
        avgNum: "@natural(10, 100)"
      }
    ],
    "line2|5-10": [
      {
        id: "@increment(1)", // 自增的Id值
        date: "@Date",
        num: "@natural(10, 100)",
        avgNum: "@natural(10, 100)"
      }
    ],
    "line3|5-10": [
      {
        id: "@increment(1)", // 自增的Id值
        date: "@Date",
        num: "@natural(10, 100)",
        avgNum: "@natural(10, 100)"
      }
    ],
    "line4|5-10": [
      {
        id: "@increment(1)", // 自增的Id值
        date: "@Date",
        num: "@natural(10, 100)",
        avgNum: "@natural(10, 100)"
      }
    ],
    "bar|5-10": [
      {
        id: "@increment(1)", // 自增的Id值
        date: "@Date",
        num: "@natural(10, 100)",
        avgNum: "@natural(10, 100)"
      }
    ]
  }
})
