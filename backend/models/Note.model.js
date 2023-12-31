// Model notes

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = function defineNoteModel(sequelize) {
  const Note = sequelize.define("Note", {
    ID: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(3000),
      allowNull: false,
      defaultValue: "",
    },
    category: {
      type: DataTypes.STRING(3000),
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING(3000),
      allowNull: false,
      defaultValue: "",
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });

  return Note;
};
