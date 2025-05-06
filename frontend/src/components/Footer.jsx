import React from 'react'
import { Home, LucideArchiveRestore, Search, Tag } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "motion/react"

const Footer = () => {
    const location = useLocation();
    return (
        <motion.footer initial={{y:100, opacity:0}}
        animate={{y:0, opacity:1}} transition={{duration:0.6, ease:"easeOut"}} className='py-4 px-2 w-full rounded-t-xl bg-slate-500/20 lg:h-auto'>
            <div className='flex justify-around'>
                <Link to={"/"}>
                    <motion.div whileHover={{y:-5}} transition={{duration:0.3, ease:"easeOut"}} className={`flex flex-col items-center gap-2 py-2 px-4 rounded-md ${ location.pathname==="/" ? "bg-slate-100/90 text-blue-600/90" : ""}`}>
                        <Home className='lg:w-5 lg:h-5'/>
                        <span className='hidden sm:block lg:text-xs'>Home</span>
                    </motion.div>
                </Link>
                <Link to={"/search"}>
                    <motion.div whileHover={{y:-5}} transition={{duration:0.3, ease:"easeOut"}} className={`flex flex-col items-center gap-2 py-2 px-4 rounded-md ${ location.pathname==="/search" ? "bg-slate-100/90 text-blue-600/90" : ""}`}>
                        <Search className='lg:w-5 lg:h-5'/>
                        <span className='hidden sm:block lg:text-xs'>Search</span>
                    </motion.div>
                </Link>
                <Link to={"/archived"}>
                    <motion.div whileHover={{y:-5}} transition={{duration:0.3, ease:"easeOut"}} className={`flex flex-col items-center gap-2 py-2 px-4 rounded-md ${ location.pathname==="/archived" ? "bg-slate-100/90 text-blue-600/90" : ""}`}>
                        <LucideArchiveRestore className='lg:w-5 lg:h-5'/>
                        <span className='hidden sm:block lg:text-xs'>Archived</span>
                    </motion.div>
                </Link>
                <Link to={"/tags"}>
                    <motion.div whileHover={{y:-5}} transition={{duration:0.3, ease:"easeOut"}} className={`flex flex-col items-center gap-2 py-2 px-4 rounded-md ${ location.pathname==="/tags" ? "bg-slate-100/90 text-blue-600/90" : ""}`}>
                        <Tag className='lg:w-5 lg:h-5'/>
                        <span className='hidden sm:block lg:text-xs'>Tags</span>
                    </motion.div>
                </Link>
            </div>
        </motion.footer>
    )
}

export default Footer