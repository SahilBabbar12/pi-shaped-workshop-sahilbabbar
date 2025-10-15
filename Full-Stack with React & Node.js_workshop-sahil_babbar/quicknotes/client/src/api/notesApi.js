import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getNotes = async () => (await api.get("/notes")).data;
export const addNote = async (text) => (await api.post("/notes", { text })).data;
export const deleteNote = async (id) => await api.delete(`/notes/${id}`);
