require("dotenv").config();
const mysql: any = require("mysql");
// import { hash } from 'bcrypt'

const pool: any = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

// async function query(sql, values) {
//   return new Promise((resolve, reject) => {
//     pool.query(sql, values, (error, results) => {
//       if (error) {
//         return reject(error);
//       }
//       resolve(results);
//     });
//   });
// }

// export default User
// module.exports = { pool, query };
// module.exports = { pool };
export default pool;
