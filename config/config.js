const CONSTANT_VARIABLES = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DB_USERNAME: process.env.USERNAME,
  DB_PASSWORD: process.env.PASSWORD,
  DB_NAME: process.env.DATABASE_NAME,
  SESSION_SECRET: process.env.SESSION_SECRET,
  CONNECTION: process.env.CONNECTION,
  JWT_SECRET: process.env.JWT_SECRET,
};
// console.log("🚀 ~ file: config.js:50 ~ CONSTANT_VARIABLES:", CONSTANT_VARIABLES, process.env.NODE_ENV)

module.exports = { CONSTANT_VARIABLES };
