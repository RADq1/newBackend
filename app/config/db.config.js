module.exports = {
  HOST: "localhost",
  USER: "admin",
  PASSWORD: "password",
  DB: "mygraduateapp",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
