import React, { useEffect, useState } from 'react';
import NavbarV1 from '../Navbar';
import Footer from '../Footer';
import { ArchiveRestore, ChevronLeft, RotateCw, Tag, Timer, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNoteStore } from '../../store/noteStore';
import { useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

const NotePage = () => {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const [content, setContent] = useState('');
  const {
    saveNote,
    isNoteSaved,
    isNoteSavedToArchive,
    saveNoteToArchive,
    setCurrentNote,
    currentNote,
    setDeleteNote,
    deleteNoteFromDb,
    isNoteUpdated,
    updateNoteType,
    updateNote,
    setUpdateNoteType,
    setUpdateNote,
  } = useNoteStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const addTag = (tag) => {
    const newTag = tag.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setInputTag('');
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ' && inputTag.trim() !== '') {
      e.preventDefault();
      addTag(inputTag);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputTag(value);

    // Check if the last character is a space
    if (value.match(/\s+$/) && value.trim() !== '') {
      const tag = value.replace(/\s+$/, '').trim(); // Remove trailing spaces
      if (tag) {
        addTag(tag);
      }
    }
  };

  const removeTag = (e, indexToRemove) => {
    e.preventDefault();
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = () => {
    saveNote({ id: user.id, title: title, tags: tags, content: content, archived: false });
  };

  const handleSaveToArchive = () => {
    saveNoteToArchive({ id: user.id, title: title, tags: tags, content: content, archived: true });
  };

  const handleUpdateToArchive = (id, value) => {
    updateNoteType(id, value);
    setUpdateNoteType(id, { ...currentNote, archived: value });
    toast.success('Note archived successfully');
  };

  const handleUpdateNote = (id) => {
    updateNote(id, { title: title, tags: tags, content: content });
    setUpdateNote(id, { ...currentNote, title: title, tags: tags, content: content });
    toast.success('Note updated successfully');
  };

  const handleRestoreNote = (id, value) => {
    updateNoteType(id, value);
    setUpdateNoteType(id, { ...currentNote, archived: value });
    toast.success('Note restored successfully');
  };

  const deleteNote = (id) => {
    if (id) {
      setDeleteNote(id);
      deleteNoteFromDb(id);
    }
  };

  useEffect(() => {
    if (currentNote?.tags) {
      setTags([...currentNote.tags]);
    }
    if (currentNote?.title) {
      setTitle(currentNote.title);
    }
    if (currentNote?.content) {
      setContent(currentNote.content);
    }
  }, [currentNote]);

  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <NavbarV1 />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
        className="flex flex-col overflow-y-auto mb-4"
      >
        <div className="flex justify-between p-4 ">
          <Link
            to={!currentNote || currentNote?.archived === false ? '/' : '/archived'}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-6 h-6 text-base-content/60" />
            Go Back
          </Link>
          <div className="flex items-center gap-6">
            <button
              disabled={!title || tags.length === 0 || !content}
              className={`flex ${title && tags.length !== 0 && content ? '' : 'text-base-content/40'}`}
              onClick={() => {
                setShowDeleteModal(true);
              }}
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <Link to={'/archived'} className={`${currentNote?.archived ? 'hidden' : 'flex'}`}>
              <button
                disabled={!title || tags.length === 0 || !content || isNoteSavedToArchive || isNoteUpdated}
                className={`${title && tags.length !== 0 && content ? '' : 'text-base-content/40'}`}
                onClick={() => {
                  currentNote?._id ? handleUpdateToArchive(currentNote?._id, true) : handleSaveToArchive();
                }}
              >
                <ArchiveRestore
                  className={`w-5 h-5 ${isNoteSavedToArchive || isNoteUpdated ? 'animate-pulse' : ''}`}
                />
              </button>
            </Link>
            <Link to={'/'} className={`${!currentNote || !currentNote?.archived ? 'hidden' : 'flex'}`}>
              <button
                disabled={!title || tags.length === 0 || !content || isNoteUpdated}
                className={` ${title && tags.length !== 0 && content ? '' : 'text-base-content/40'}`}
                onClick={() => {
                  handleRestoreNote(currentNote?._id, false);
                }}
              >
                <RotateCw className={`w-5 h-5 ${isNoteUpdated ? 'animate-spin' : ''}`} />
              </button>
            </Link>

            <Link to={!currentNote || currentNote?.archived === false ? '/' : '/archived'}>
              <button
                disabled={!title || tags.length === 0 || !content || isNoteSaved || isNoteUpdated}
                className={`font-semibold ${
                  title && tags.length !== 0 && content ? '' : 'text-base-content/40'
                } ${isNoteSaved || isNoteUpdated ? 'animate-pulse' : ''}`}
                onClick={() => {
                  currentNote ? handleUpdateNote(currentNote._id) : handleSave();
                }}
              >
                {isNoteSaved || isNoteUpdated ? 'Saving...' : 'Save Note'}
              </button>
            </Link>
          </div>
        </div>

        <div className="mx-auto w-[95%] h-[1px] shrink-0 bg-base-content/20" aria-hidden></div>

        <form className="flex flex-col px-4 mt-4 gap-4">
          <input
            type="text"
            value={title}
            className="border-[2px] cursor-pointer border-transparent w-full hover:border-base-content focus:border-base-content outline-none bg-transparent font-bold text-3xl rounded-lg py-2 px-4"
            placeholder="Enter title..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <div className="px-4 flex flex-col gap-4">
            <label htmlFor="tag" className="flex group gap-6 sm:gap-24 items-center">
              <div className="flex gap-2 items-center">
                <Tag className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
                <span className="cursor-pointer">Tags</span>
              </div>

              <div className="w-full max-w-md p-4">
                <div className="flex flex-wrap gap-2 cursor-pointer p-2 py-1 border-[2px] border-transparent hover:border-base-content group-focus-within:border-base-content rounded min-h-[42px]">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-slate-500 text-white p-1 rounded-lg text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={(e) => removeTag(e, index)}
                        className="text-white hover:text-red-300 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    id="tag"
                    type="text"
                    value={inputTag}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent cursor-pointer w-full border-none focus:outline-none"
                    placeholder="Type and press space"
                  />
                </div>
              </div>
            </label>
            <div className="flex gap-8 sm:gap-16 items-center">
              <div className="flex gap-2 items-center">
                <Timer className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className='text-sm'>Last edited</span>
              </div>
              <span className='text-sm'>{currentNote?.updatedAt?.split('T')[0] || 'Not saved yet'}</span>
            </div>
          </div>
          <textarea
            cols={5}
            rows={5}
            value={content}
            className="mt-4 rounded-lg cursor-pointer py-2 px-4 font-bold text-3xl focus:border-base-content bg-transparent border-[2px] border-transparent hover:border-base-content outline-none"
            placeholder="Type your note..."
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </form>
      </motion.div>

      {showDeleteModal && (
        <dialog id="delete_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure you want to delete this note?</h3>
            <p className="py-4">This action cannot be undone.</p>
            <div className="modal-action">
              <form method="dialog" className="flex gap-4">
                <Link to={!currentNote || currentNote?.archived === false ? '/' : '/archived'}>
                  <button
                    className="btn btn-error text-white"
                    onClick={() => {
                      toast.success('Note deleted');
                      setShowDeleteModal(false);
                      setCurrentNote(null);
                      { currentNote !== null && deleteNote(currentNote._id) };
                    }}
                  >
                    Confirm
                  </button>
                </Link>
                <button
                  className="btn bg-slate-600/40"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
      <Footer />
    </div>
  );
};

export default NotePage;
