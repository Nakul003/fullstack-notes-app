import React from 'react'
import Navbar from '../Navbar.jsx'
import Footer from '../Footer.jsx'
import { Plus } from 'lucide-react'
import { Link } from "react-router-dom"
import { useNoteStore } from '../../store/noteStore.js'
import { motion } from "motion/react"


const HomePage = () => {

  const { notes, setCurrentNote, isLoading } = useNoteStore();


  if (isLoading) return (
    <div className="h-screen flex flex-col justify-between overflow-y-hidden">
      <Navbar />
      <h1 className='font-bold p-4 text-3xl lg:text-xl lg:w-2/3 lg:mx-auto'>Notes</h1>
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
    <div className='h-screen flex flex-col justify-between overflow-y-hidden'>
      <Navbar />
      <motion.h1 initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }} className='font-bold text-3xl p-4 lg:text-xl lg:w-2/3 lg:mx-auto'>Notes</motion.h1>
      <div className='flex-1 p-4 overflow-y-scroll '>
        <motion.div initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }} className='flex flex-col gap-8 '>

          {
            notes?.length !== 0 ?
              notes?.filter(note => note.archived === false)
                .map((note, idx) => {
                  return (
                    <Link key={idx} onClick={() => { setCurrentNote(note) }} to={"/note"} className=" lg:w-2/3 lg:mx-auto transition-all duration-100 w-full bg-slate-500/60 rounded-lg hover:bg-slate-500/40" >
                      <div className='flex flex-col gap-2 py-2 px-4 '>
                        <h2 className='text-xl font-semibold'>{note.title}</h2>
                        <div className='flex gap-3'>
                          {note.tags.map((tag, idx) => (
                            <span key={idx} className='bg-slate-500/80 text-white py-1 px-2 rounded-lg '>{tag}</span>
                          ))}
                        </div>
                        <p>{note?.createdAt.split("T")[0]}</p>
                      </div>
                    </Link>
                  )
                }) : <div className='text-base p-2 lg:w-2/3 lg:mx-auto'>No notes to show yet.</div>}

        </motion.div>

        <Link to={"/note"} onClick={() => { setCurrentNote(null) }} >
          <div className='absolute bottom-20 right-4 sm:bottom-28 cursor-pointer'>
            <div className='rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-600/80 transition-all duration-100 flex items-center justify-center'>
              <Plus className='font-bold w-8 h-8' />
            </div>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage