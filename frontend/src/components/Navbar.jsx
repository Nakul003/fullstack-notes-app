import React from 'react'
import { useThemeStore } from '../store/themeStore.js'
import logo1 from "../assets/logo1.svg"
import logo2 from "../assets/logo2.svg"
import { SignedIn, SignOutButton, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { LogOut, Moon, Sun } from "lucide-react"
import { motion } from 'motion/react'

const NavbarV1 = () => {

    const { colorTheme, setTheme } = useThemeStore()

    return (
        <>
            <motion.nav initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }} className="p-4 w-full bg-slate-500/20">
                <div className='flex justify-between'>
                    <Link to={"/"}>
                        <img src={colorTheme === "dark" ? logo1 : logo2} className='cursor-pointer' alt="logoImage" />
                    </Link>
                    <ul className='flex gap-4'>
                        <motion.li whileHover={{ y: -3 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </motion.li>
                        <motion.li whileHover={{ y: -3 }} transition={{ duration: 0.3, ease: "easeOut" }} className='cursor-pointer' onClick={() => { colorTheme === "dark" ? setTheme("light") : setTheme("dark") }}>{colorTheme === "dark" ? <Sun /> : <Moon />}</motion.li>
                        <motion.li whileHover={{ y: -3 }} transition={{ duration: 0.3, ease: "easeOut" }} className='cursor-pointer' >
                            <SignOutButton>
                                <LogOut />
                            </SignOutButton>
                        </motion.li>
                    </ul>
                </div>
            </motion.nav>
        </>
    )
}

export default NavbarV1