// db.js
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

let { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Configuración de la conexión a la base de datos
if (DB_NAME && DB_USER && DB_PASSWORD && DB_HOST) {
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres",
    logging: true,
  });

  const Note = require("./models/Note.model")(sequelize);

  module.exports = { Note, sequelize };
} else {
  console.error("Las variables de entorno de la base de datos no están completamente definidas.");
  process.exit(1);
}
