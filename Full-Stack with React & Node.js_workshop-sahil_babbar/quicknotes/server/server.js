import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
