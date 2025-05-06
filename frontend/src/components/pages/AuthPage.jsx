import React from 'react'
import { SignedOut, SignIn} from '@clerk/clerk-react'
import { dark, light } from '@clerk/themes'
import { useThemeStore } from "../../store/themeStore.js"
import logo1 from "../../assets/logo1.svg"
import logo2 from "../../assets/logo2.svg"

const AuthPage = () => {
  const { colorTheme } = useThemeStore()

  const setColorTheme = () => {
    if (colorTheme === "dark") return dark

    else return light
  }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center p-8'>
      <SignedOut>
        <img src={colorTheme === "dark" ? logo1 : logo2} alt="logoImage" />
        <div className='mt-4 mb-4 text-center flex flex-col gap-4'>
          <p className='text-2xl font-bold text-white'>Hi👋, Welcome to Notes !</p>
          <p className='text-base '>Please Login to Continue</p>
        </div>
        <SignIn appearance={{baseTheme:setColorTheme()}} />
      </SignedOut>
    </div>
  )
}

export default AuthPage