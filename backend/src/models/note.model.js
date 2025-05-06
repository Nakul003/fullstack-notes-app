import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },

    title:{
        type:String,
        required:true,
    },

    tags:[{
        type:String,
        required:true}],

    content:{
        type:String,
        required:true,
    },

    archived:{
        type:Boolean,
        required:true,
    },
},{timestamps:true});

const Notes = mongoose.model("Notes",noteSchema);

export default Notes;