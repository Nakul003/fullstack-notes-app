import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";


export const useUserStore =  create((set)=>({

    saveUserToDb: async (data) => {
        try {
            if (data) {
                await axiosInstance.post("/auth/callback",data);
            }
        } catch (error) {
            console.log("Error in saveUserToDb function", error.message);
        }
    }

})) 