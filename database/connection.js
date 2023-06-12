const mysql = require("mysql2");
const { CONSTANT_VARIABLES } = require("../config/config");

const connection = mysql.createPool({
  host: CONSTANT_VARIABLES.HOST,
  user: CONSTANT_VARIABLES.DB_USERNAME,
  password: CONSTANT_VARIABLES.DB_PASSWORD,
  database: CONSTANT_VARIABLES.DB_NAME,
  debug: false,
  multipleStatements: true,
});

connection.getConnection(function (err, connection) {
  // Use the connection
  if (err) {
    console.log("DB Error" + err);
  } else {
    console.log("Database is Connected..!!");
  }
});

module.exports = { connection };
