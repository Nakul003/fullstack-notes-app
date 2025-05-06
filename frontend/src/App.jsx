import React, { useEffect } from 'react'
import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router-dom"
import AuthPage from "./components/pages/AuthPage"
import { useThemeStore } from './store/themeStore';
import { Toaster } from "react-hot-toast"
import { useUserStore } from './store/userStore';
import HomePage from './components/pages/HomePage';
import SearchPage from './components/pages/SearchPage';
import NotePage from './components/pages/NotePage';
import ArchivedPage from "./components/pages/ArchivedPage"
import TagPage from './components/pages/TagPage';
import { useNoteStore } from './store/noteStore';

const App = () => {

  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const { colorTheme } = useThemeStore()
  const { saveUserToDb } = useUserStore()
  const { getNotes } = useNoteStore();

  useEffect(() => {
    if (user) {
      saveUserToDb({ id: user.id, name: user.fullName })
    }
  }, [useUserStore])

  useEffect(() => {
    getNotes(user?.id)
  }, [user])

  return (
    <main data-theme={colorTheme} className={` ${colorTheme === "dark" ? "text-white transition-all duration-100" : "black  transition-all duration-100"}`}>
      <Routes>
        <Route path='/' element={isSignedIn ? <HomePage /> : <Navigate to={"/auth"} />} />
        <Route path='/auth' element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} />} />
        <Route path='/search' element={isSignedIn ? <SearchPage /> : <Navigate to={"/auth"} />} />
        <Route path='/note' element={isSignedIn ? <NotePage /> : <Navigate to={"/auth"} />} />
        <Route path='/archived' element={isSignedIn ? <ArchivedPage /> : <Navigate to={"/auth"} />} />
        <Route path='/tags' element={isSignedIn ? <TagPage /> : <Navigate to={"/auth"} />} />
      </Routes>
      
      <Toaster />
    </main>
  )
}

export default App


