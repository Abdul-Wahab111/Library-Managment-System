
const sql = require('mssql');

const config = {
  server: 'localhost\\SQLEXPRESS', 
  database: 'LibraryDB', 
  options: {
    encrypt: false, 
    trustServerCertificate: true 
  },
  driver: 'msnodesqlv8', 
  connectionTimeout: 15000, 
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.log('Database Connection Failed! Bad Config: ', err);
    throw err;
  });

module.exports = {
  sql, poolPromise
};
