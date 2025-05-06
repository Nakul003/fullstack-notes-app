import React from 'react'
import { useSearchStore } from '../store/searchStore'
import { Search } from 'lucide-react';
import { motion } from "motion/react";

const SearchBar = () => {

  const {searchContent, setSearchContent} = useSearchStore();

  return (
    <motion.div initial={{y:50, opacity:0}}
    animate={{y:0, opacity:1 }} transition={{duration:0.8, ease:"easeOut",delay:0.25}} className='lg:w-2/3 lg:mx-auto relative transition-all duration-100 w-full'>
        <Search className="absolute left-6 top-3 lg:w-5 lg:h-5 lg:left-5 lg:top-4 " />
        <input type="text" value={searchContent} className=' h-12 w-full border-[2px] bg-transparent outline-none cursor-pointer text-lg font-semibold placeholder:font-normal placeholder:text-base-content/60 border-base-content/60 hover:border-base-content rounded-md py-2 px-14 lg:text-sm' placeholder='Search by title, content, or tags' onChange={(e) => { setSearchContent(e.target.value) }} />
    </motion.div>
        
    
  )
}

export default SearchBar