import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { useNoteStore } from '../../store/noteStore.js'
import { Tag } from 'lucide-react'
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const TagPage = () => {

    const { notes, setCurrentNote, isLoading } = useNoteStore();

    if (isLoading) return (
        <div className='h-screen flex flex-col justify-between overflow-y-hidden'>
            <Navbar />
            <h1 className='font-bold text-3xl p-4 lg:text-xl lg:w-2/3 lg:mx-auto'>Tags</h1>
            <div className='flex-1 p-4 overflow-y-scroll'>
                <div className='flex flex-col gap-8 lg:w-2/3 lg:mx-auto transition-all duration-100 w-full'>
                    <div className='w-full h-28 skeleton rounded-lg'></div>
                    <div className='w-full h-28 skeleton rounded-lg'></div>
                    <div className='w-full h-28 skeleton rounded-lg'></div>
                    <div className='w-full h-28 skeleton rounded-lg'></div>
                    <div className='w-full h-28 skeleton rounded-lg'></div>
                </div>
            </div>
            <Footer />
        </div>
    )


    return (
        <div className="h-screen flex flex-col  justify-between overflow-hidden">
            <Navbar />
            <motion.h2 initial={{y:50, opacity:0}}
        animate={{y:0, opacity:1 }} transition={{duration:0.8, ease:"easeOut",delay:0.25}} className='text-3xl font-bold mb-4 p-4 lg:text-xl lg:w-2/3 lg:mx-auto'>Tags</motion.h2>
            <motion.div initial={{y:100, opacity:0}}
        animate={{y:0, opacity:1 }} transition={{duration:0.8, ease:"easeOut",delay:0.25}} className='flex flex-1 flex-col p-4 gap-6 overflow-y-scroll'>
                {
                    notes?.length !== 0 ?
                        notes?.map((note, idx) => {

                            return (
                                <div key={idx} className='flex flex-col gap-6'>
                                    <Link to={"/note"} className='flex transition-all duration-100 flex-col gap-4  justify-center p-4  rounded-lg cursor-pointer bg-slate-500/60  w-full  h-auto lg:w-2/3 lg:mx-auto hover:bg-slate-500/40' onClick={() => { setCurrentNote(note) }}>
                                        <div className='flex gap-4'>

                                            {note.tags.map((tag, idx) => {
                                                return (
                                                    <span key={idx} className='bg-slate-500/80  text-xl px-2 py-1 text-center  font-semibold flex gap-2 items-center tracking-wider rounded-md '><Tag className='w-4  h-4' />{tag}</span>
                                                )
                                            })}
                                        </div>

                                        <span className='text-lg '>{note.tags.length > 1 ? "Tags" : "Tag"} for {note.title} note</span>
                                    </Link>
                                </div>
                            )
                        }) :
                        <p className='text-sm lg:w-2/3 rounded-md lg:mx-auto'>Your tags will show here.</p>}
            </motion.div>
            <Footer />
        </div>
    )
}

export default TagPage