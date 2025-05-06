import React from 'react';
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from 'react';
import { axiosInstance } from './axiosInstance';
import { Loader } from "lucide-react"

const AuthProvider = ({children}) => {

    const {getToken} = useAuth();
    const [loading, setLoading] = useState(true);

    const updateToken = (token) => {
        if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        else delete axiosInstance.defaults.headers.common["Authorization"];
    }

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await getToken(); 
                updateToken(token) 
            } catch (error) {
                updateToken(null)
                console.log("Error in getToken function",error);
            } finally{
                setLoading(false)
            }
        }
        generateToken()
    }, [useAuth])
    
    if (loading) {
        return(
        <div className='h-screen w-full flex justify-center items-center'>
            <Loader className='w-8 h-8 text-black animate-spin' />
        </div> ) 
    }

  return (
    <>{children}</>
  )
}

export default AuthProvider