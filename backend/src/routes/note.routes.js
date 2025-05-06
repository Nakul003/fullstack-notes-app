import { Router } from "express";
import { saveNoteToDb, getNoteFromDb, deleteNoteFromDb, updateNoteTypeInDb, updateNoteInDb } from "../controllers/note.controller.js";
import { protectRoute } from "../middleware/protectRoutes.js";

const router = Router();

router.post("/saveNote",protectRoute, saveNoteToDb);
router.get("/getNotes/:id",protectRoute, getNoteFromDb);
router.delete("/deleteNote/:deletedNoteId",protectRoute, deleteNoteFromDb);
router.put("/updateNoteType/:updatedNoteId/:value",protectRoute, updateNoteTypeInDb);
router.put("/updateNote/:updatedNoteId",protectRoute, updateNoteInDb);

export default router;
