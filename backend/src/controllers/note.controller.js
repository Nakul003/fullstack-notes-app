import Notes from "../models/note.model.js"

export const saveNoteToDb = async (req,res) => {
  try {
    const { id, title, tags, content, archived } = req.body

    if (title && tags && content) {
        const newNote = await Notes.create({
            userId:id,
            title,
            tags,
            content,
            archived,
        })
        res.status(201).json({success:true, noteData:newNote})
    }
  } catch (error) {
    console.log("Error in saveNoteToDb controller",error);
    res.status(500).json({success:false, message:"Internal server error"})
  }  
};

export const getNoteFromDb = async (req,res) => {

  try {
    const { id } = req.params
    const notes = await Notes.find({userId:id});
    res.status(200).json({success:true,notes:notes});
  } catch (error) {
    console.log("Error in getNoteFromDb controller",error);
    res.status(500).json({success:false,message:"Internal Server Error"})
  }
};

export const deleteNoteFromDb = async (req,res) => {

  const { deletedNoteId } = req.params
  try {
    await Notes.findByIdAndDelete({_id:deletedNoteId});
    res.status(200).json({success:true});
  } catch (error) {
    console.log("Error in deleteNoteFromDb controller",error);
    res.status(500).json({success:false,message:"Internal Server Error"})
  }
};

export const updateNoteTypeInDb = async (req, res) => {
  const { updatedNoteId, value } = req.params
  try {
      await Notes.findByIdAndUpdate({_id:updatedNoteId},{
        archived:value,
      });            
    res.status(200).json({success:true});
  } catch (error) {
    console.log("Error in updateNoteInDb controller",error);
    res.status(500).json({success:false,message:"Internal Server Error"})
  }
};

export const updateNoteInDb = async (req, res) => {
  const { updatedNoteId } = req.params
  const { title, tags, content } = req.body
  try {      
      await Notes.findByIdAndUpdate({_id:updatedNoteId},{
        title,
        tags,
        content
      });      
    res.status(200).json({success:true});
  } catch (error) {
    console.log("Error in updateNoteInDb controller",error);
    res.status(500).json({success:false,message:"Internal Server Error"})
  }
};

