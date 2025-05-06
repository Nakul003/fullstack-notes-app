import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import SearchBar from '../SearchBar'
import { useNoteStore } from '../../store/noteStore.js'
import { Link } from 'react-router-dom'
import { useSearchStore } from '../../store/searchStore'
import { motion } from 'motion/react'

const SearchPage = () => {

  const { notes, setCurrentNote } = useNoteStore();
  const {searchContent} = useSearchStore();


  return (
    <div className='h-screen flex flex-col w-full justify-between items-center overflow-y-hidden'>
      <Navbar />
      <div className='flex relative w-[95%] mx-auto flex-1 flex-col mt-4 p-2 overflow-hidden'>
          <SearchBar />
        <motion.div initial={{y:100, opacity:0}}
        animate={{y:0, opacity:1 }} transition={{duration:0.8, ease:"easeOut",delay:0.25}} className={`flex mt-8 mb-2 flex-col p-4 gap-8 ${searchContent.trim()==="" ? "overflow-y-hidden" : "overflow-y-scroll"}`}>
          {
            searchContent.trim() === "" ?
              <div className='text-xl lg:text-sm lg:w-2/3 lg:mx-auto'>Start typing to search your notes...</div>
              : (notes?.filter((note) =>
                note.title.toLowerCase().includes(searchContent.toLowerCase()) ||
                note.content.toLowerCase().includes(searchContent.toLowerCase()) ||
                note.tags.some(tag => tag.toLowerCase().includes(searchContent.toLowerCase())))
                ?.length > 0
                ?
                notes.filter((note) =>
                  note.title.toLowerCase().includes(searchContent.toLowerCase()) ||
                  note.content.toLowerCase().includes(searchContent.toLowerCase()) ||
                  note.tags.some(tag => tag.toLowerCase().includes(searchContent.toLowerCase()))
                ).map((note, idx) => (
                  <Link key={idx} onClick={() => { setCurrentNote(note) }} to={"/note"} className='lg:w-2/3 lg:mx-auto transition-all duration-100 w-full bg-slate-500/60 rounded-lg hover:bg-slate-500/40'>
                    <div className=' flex flex-col gap-2  py-2 px-4 ' >
                      <h2 className='text-xl font-semibold'>{note.title}</h2>
                      <div className='flex gap-3'>
                        {note.tags.map((tag, idx) => (
                          <span key={idx} className='bg-slate-500/80 text-white py-1 px-2 rounded-lg'>{tag}</span>
                        ))}
                      </div>
                      <p>{note?.createdAt.split("T")[0]}</p>
                    </div>
                  </Link>
                )) : <div className='text-xl lg:text-sm lg:w-2/3 lg:mx-auto'>No matching notes found.</div>
              )
          }
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

export default SearchPage

