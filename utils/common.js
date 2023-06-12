const { CONSTANT_VARIABLES } = require("../config/config");
const { connection } = require("../database/connection");

const queryExecutor = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

module.exports = {
  queryExecutor,
};
