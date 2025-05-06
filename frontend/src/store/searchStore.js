import { create } from "zustand";

export const useSearchStore = create((set)=>({
    
    searchContent:"",
    
    setSearchContent:(search)=>set({searchContent:search})
}))