module.exports = {
   port: process.env.PORT || 5000,
   database: {
      connectionLimit: 100,
      host: 'localhost',
      user: 'root',
      password: '12345',
      database: 'alseco'
  }
}