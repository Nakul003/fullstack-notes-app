import { create } from "zustand";

export const useThemeStore = create((set)=>({
    colorTheme:localStorage.getItem("colorTheme") || "dark", 

    setTheme: (theme) => {
        localStorage.setItem("colorTheme",theme); 
        set({ colorTheme:theme })
    }
}))