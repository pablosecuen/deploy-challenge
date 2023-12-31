// noteHandler.js

const { getNotes, createNote, deleteNote, updateNote } = require("../controllers/Note.controllers");

const handleGetNotes = async (req, res) => {
  try {
    const notes = await getNotes(req.noteFilters);
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleCreateNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const newNote = await createNote({ title, content, category });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleUpdateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const updatedNote = await updateNote(id, updateFields);
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleDeleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteNote(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleGetNotes, handleCreateNote, handleUpdateNote, handleDeleteNote };
