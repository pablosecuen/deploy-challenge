// noteRoutes.js
const express = require("express");
const { validateNote, noteFilters } = require("../middlewares/Note.middleware");
const {
  handleGetNotes,
  handleCreateNote,
  handleUpdateNote,
  handleDeleteNote,
} = require("../handlers/Note.handlers");
const router = express.Router();

// GET /notes endpoint for listing the notes
router.get("/", noteFilters, handleGetNotes);

// POST /notes endpoint to create a note if passing validations of middleware
router.post("/", validateNote, handleCreateNote);

// PATCH /notes to update a note archived status and making a logic erase
router.patch("/:id", handleUpdateNote);

// DELETE /notes to destroy and erase complete object from db
router.delete("/:id", handleDeleteNote);

module.exports = router;
