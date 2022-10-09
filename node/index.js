var mysql = require("mysql")
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "test",
  password: "123456",
  database: "test"
})

connection.connect()

connection.query("SELECT * FROM userinfo", function (error, results, fields) {
  if (error) return console.log(error)
  console.log(results)
})

connection.end()
