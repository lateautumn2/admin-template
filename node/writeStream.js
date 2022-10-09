const fs = require("fs")
let data = "这是要写入的东西"

let writeStream = fs.createWriteStream("index.js")
writeStream.write(data, "utf8")
writeStream.end()

writeStream.on("finish", () => {
  console.log("写入完成！")
  // Console：写入完成
})
