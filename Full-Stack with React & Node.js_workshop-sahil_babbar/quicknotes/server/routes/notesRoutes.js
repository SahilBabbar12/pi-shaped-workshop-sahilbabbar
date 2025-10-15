import express from "express";
const router = express.Router();

let notes = [];
let id = 1;

router.get("/", (req, res) => res.json(notes));

router.post("/", (req, res) => {
  const { text } = req.body;
  const newNote = { id: id++, text };
  notes.push(newNote);
  res.status(201).json(newNote);
});

router.delete("/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter((n) => n.id !== noteId);
  res.status(204).send();
});

export default router;
