const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    title :String,
   body : String,
   device : String,
    no_if_comments : Number
})


const notesModel=mongoose.model("note",noteSchema)


module.exports={
    notesModel
}