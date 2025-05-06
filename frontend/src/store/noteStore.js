import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance.js";
import { toast } from "react-hot-toast"
export const useNoteStore = create((set, get) => ({
    notes: null,
    isNoteSaved: false,
    isNoteSavedToArchive: false,
    isNoteUpdated: false,
    isLoading: false,
    currentNote:null,
    
    setCurrentNote: (note) => set({ currentNote: note }),

    setDeleteNote: (id) => {
        const { notes } = get();
       const updatedNotes = notes.filter((item) => {
            return item._id !== id
        })

        set({notes:updatedNotes})
    },
    setUpdateNoteType: (id,note) => {
        const { notes } = get();
       const filteredNotes = notes.filter((item) => {
            return item._id !== id
        }); 

        const updatedNotes = [note, ...filteredNotes];
        set({notes:updatedNotes})
    },

    setUpdateNote: (id,note) => {
        const { notes } = get();
       const filteredNotes = notes.filter((item) => {
            return item._id !== id
        }); 

        const updatedNotes = [note, ...filteredNotes];
        set({notes:updatedNotes})
    },
    
    getNotes: async (id) => {
        set({ isLoading: true })
        try {
            const res = await axiosInstance.get(`/note/getNotes/${id}`);
            set({ notes: res.data.notes });
        } catch (error) {
            console.log("Error in getNotes function", error.response.data.message);
        } finally {
            set({ isLoading: false });
        }
    },

    saveNote: async (note) => {
        set({ isNoteSaved: true })
        const { notes } = get()

        try {
            const res =  await axiosInstance.post("/note/saveNote", note);
            set({ notes: [res.data.noteData, ...notes] })
            toast.success("Note saved successfully")
        } catch (error) {
            console.log("Error in saveNote function", error.response.data.message);
        } finally {
            set({ isNoteSaved: false })
        }
    },

    saveNoteToArchive: async (note) => {
        set({ isNoteSavedToArchive: true })
        const { notes } = get()

        try {
            const res =  await axiosInstance.post("/note/saveNote", note);
            set({ notes: [res.data.noteData, ...notes] })
            toast.success("Note archived successfully")
        } catch (error) {
            console.log("Error in saveNote function", error.response.data.message);
        } finally {
            set({ isNoteSavedToArchive: false })
        }
    },

    deleteNoteFromDb: async (deletedNoteId) => {
        try {
            await axiosInstance.delete(`/note/deleteNote/${deletedNoteId}`)
        } catch (error) {
            console.log("Error in deleteNoteFromDb function", error);
        }
    }, 

    updateNoteType: async (updatedNoteId, value) => {
        set({ isNoteUpdated: true })
        try {
            await axiosInstance.put(`/note/updateNoteType/${updatedNoteId}/${value}`)
        } catch (error) {
            console.log("Error in updateNoteType function", error);
        } finally {
            set({ isNoteUpdated: false })
        }
    },

    updateNote: async (updatedNoteId, value) => {
        set({ isNoteUpdated: true })
        try {
            await axiosInstance.put(`/note/updateNote/${updatedNoteId}`,value)
        } catch (error) {
            console.log("Error in updateNote function", error);
        } finally {
            set({ isNoteUpdated: false })
        }
    }, 
}))