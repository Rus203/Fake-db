const { Sequelize } = require("sequelize");

const { HOST, DIALECT, DATABASE, USER, PASSWORD, PORT } = process.env;

exports.initConnection = async () => {
  try {
    const connection = new Sequelize(DATABASE, USER, PASSWORD, {
      host: HOST,
      dialect: DIALECT,
      port: PORT,
      logging: false,
    });

    await connection.authenticate();

    return connection;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
