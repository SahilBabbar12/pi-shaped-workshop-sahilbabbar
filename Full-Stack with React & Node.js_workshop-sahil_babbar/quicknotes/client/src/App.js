import React, { useEffect, useState } from "react";
import { getNotes, addNote, deleteNote } from "./api/notesApi";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (err) {
        setError("Failed to load notes. Please try again.", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // Add a new note
  const handleAdd = () => {
    if (!newNote.trim()) return;
    const tempId = Date.now();
    setNotes([...notes, { id: tempId, text: newNote, isNew: true }]);
    setNewNote("");
  };

  // Mark a note for deletion
  const handleDelete = (note) => {
    if (!note.isNew) {
      setDeletedNotes((prev) => [...prev, note]);
    }
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
  };

  // Save all changes
  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const newNotes = notes.filter((n) => n.isNew);
      for (const note of newNotes) {
        await addNote(note.text);
      }

      for (const note of deletedNotes) {
        await deleteNote(note.id);
      }

      const updated = await getNotes();
      setNotes(updated);
      setDeletedNotes([]);
      alert("Changes saved!");
    } catch (err) {
      console.error("Error saving changes:", err);
      setError("Failed to save changes. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Quick Notes</h1>

      {loading && <p className="info-text">Loading...</p>}

      {error && <p className="error-text">{error}</p>}

      <div className="input-section">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter note"
        />
        <button onClick={handleAdd}>+</button>
      </div>

      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note.id}>
            {note.text}
            <button className="delete-btn" onClick={() => handleDelete(note)}>
              −
            </button>
          </li>
        ))}
      </ul>

      <button className="save-btn" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default App;
