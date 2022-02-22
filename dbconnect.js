const mysql = require("mysql2/promise");

//   connection.query(
//     "INSERT INTO department(id,name) VALUES (2,'sports')",
//     function (err, results, fields) {
//       console.log("err", err);
//     }
//   );

async function executeQuery(query) {
   
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "cms",
        password: "Rowan40!"
      });
    
      
      const [departments] = await connection.execute(query);
    return departments
}

module.exports.executeQuery = executeQuery