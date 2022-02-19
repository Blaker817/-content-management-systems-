const mysql2 = require('mysql2')
const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "cms",
    password: "Rowan40!"
  });
//   connection.query(
//     "INSERT INTO department(id,name) VALUES (2,'sports')",
//     function (err, results, fields) {
//       console.log("err", err);
//     }
//   );
//   connection.query(
//     "SELECT * FROM department",
//     function (err, results, fields) {
//       console.log("err", err);
//       console.log(results)
//     }
//   );
  connection.end()