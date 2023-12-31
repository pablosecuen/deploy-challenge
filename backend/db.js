// db.js
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

let { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Database config
if (DB_NAME && DB_USER && DB_PASSWORD && DB_HOST) {
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });

  const Note = require("./models/Note.model")(sequelize);

  module.exports = { Note, sequelize };
} else {
  console.error("local variables are not defined");
  process.exit(1);
}
