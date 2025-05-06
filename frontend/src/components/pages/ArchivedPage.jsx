import React from 'react'
import Navbar from "../Navbar"
import Footer from "../Footer"
import { useNoteStore } from '../../store/noteStore';
import { Link } from 'react-router-dom';
import { motion } from "motion/react"

const ArchivedPage = () => {

  const { notes, setCurrentNote, isLoading } = useNoteStore();

  if (isLoading) return (
    <div className='h-screen flex flex-col justify-between overflow-y-hidden'>
      <Navbar />
          <h1 className='font-bold text-3xl p-4 lg:text-xl lg:w-2/3 lg:mx-auto'>Archived Notes</h1>
          <p className='text-sm p-4  lg:w-2/3 lg:mx-auto'>All your archived notes are stored here. You can restore or delete them anytime.</p>
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
    <div className="h-screen flex flex-col justify-between overflow-y-hidden">
      <Navbar />
      <motion.div initial={{y:50, opacity:0}}
        animate={{y:0, opacity:1 }} transition={{duration:0.8, ease:"easeOut",delay:0.25}} className="flex flex-col p-4 gap-6 lg:w-2/3 lg:mx-auto">
        <h2 className='text-3xl font-bold lg:text-xl'>Archived Notes</h2>
        <p className='text-sm'>All your archived notes are stored here. You can restore or delete them anytime.</p>
      </motion.div>
      <motion.div initial={{y:100, opacity:0}}
        animate={{y:0, opacity:1 }} transition={{duration:0.8, ease:"easeOut",delay:0.25}} className='flex flex-1 flex-col p-4 gap-6 overflow-y-scroll'>
        {
          notes?.length !== 0 ?
            notes?.filter(note => note.archived === true)
              .map((note, idx) => {
                return (
                  <Link key={idx} onClick={() => { setCurrentNote(note) }} to={"/note"} className=" lg:w-2/3 lg:mx-auto transition-all duration-100 w-full bg-slate-500/60 rounded-lg hover:bg-slate-500/40">

                    <div className='flex flex-col  gap-2 py-2 px-4 '>
                      <h2 className='text-xl font-semibold'>{note.title}</h2>
                      <div className='flex gap-3'>
                        {note.tags.map((tag, idx) => (
                          <span key={idx} className='bg-slate-500/80 text-white py-1 px-2 rounded-lg'>{tag}</span>
                        ))}
                      </div>
                      <p>{note?.createdAt.split("T")[0]}</p>
                    </div>
                  </Link>
                )
              }) :
            <div className='bg-slate-500/20 text-sm p-2 lg:w-2/3 rounded-md lg:mx-auto'>
              <p>You haven't archived a note yet. Start a new note to capture your thoughts and ideas.</p>
            </div>}
      </motion.div>
      <Footer />
    </div> 
  )
}

export default ArchivedPage