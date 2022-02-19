// const mysql2 = require('promise-mysql')
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
  connection.query(
    "SELECT * FROM role",
    function (err, results, fields) {
      console.log("err", err);
      console.log(results)
    }
  );
async function getDepartments() {
  const departments=await connection.query(
    "SELECT * FROM department",
    function (err, results, fields) {
      console.log("err", err);
      return results
     
    }
  );
  return departments
}
//   connection.query(
//     "INSERT INTO department(id,name) VALUES (5,'mens clothing')",
//     function (err, results, fields) {
//       console.log("err", err);
//     }
//   );
//   connection.query(
//     "INSERT INTO role(id,title,salary,department_id) VALUES (7,'hr',60,12)",
//     function (err, results, fields) {
//       console.log("err", err);
//     }
//   );
  module.exports.getDepartments=getDepartments