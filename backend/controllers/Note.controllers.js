// noteController.js

const { Note } = require("../db");

const getNotes = async (noteFilters) => {
  return await Note.findAll({ where: noteFilters });
};

const createNote = async ({ title, content, category }) => {
  return await Note.create({ title, content, category });
};

const updateNote = async (id, updateFields) => {
  const note = await Note.findByPk(id);
  if (!note) {
    throw new Error("Nota no encontrada");
  }

  return await note.update(updateFields);
};

const deleteNote = async (id) => {
  const note = await Note.findByPk(id);
  if (!note) {
    throw new Error("Nota no encontrada");
  }

  return await note.destroy();
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
