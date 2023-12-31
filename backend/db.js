const dotenv = require("dotenv");
dotenv.config();

let { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

if (DB_NAME && DB_USER && DB_PASSWORD && DB_HOST) {
  const { Sequelize } = require("sequelize");

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
  console.error("Local variables are not defined");
  process.exit(1);
}
