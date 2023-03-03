const express=require("express")

const {notesModel}=require("./models/notes.route")

const notesRouter=express.Router()

notesRouter.get("/",async (req,res)=>{
    const notes= await notesModel.find()
    res.send(notes)
})

notesRouter.post("/top",async(req,res)=>{
    const payload=req.body
    try{
        const new_note = new notesModel(payload)
        await new_note.save()
        res.send({"Msg":"Note Creted Sucessfully"})

    }catch(err){
        console.log(err)
        res.send({"err":"SOmething went wrong"})
    }
})

notesRouter.patch("/update",async (req,res)=>{
    const noteID=req.params.noteID
    const no_if_comments=req.body.no_if_comments

    const note=await notesModel.findOne({_id:noteID})

    if(no_if_comments!==note.no_if_comments){
        res.send("Not Authorised")
    }else{
        await notesModel.findByIDAndUpdate({_id:noteID},payload)
        res.send({"msg":"Note Updated SUcessfully"})
    }
})

notesRouter.delete("/delete",async (req,res)=>{
    const noteID=req.params.noteID
    const no_if_comments=req.body.no_if_comments

    const note=await notesModel.findOne({_id:noteID})

    if(no_if_comments!==note.no_if_comments){
        res.send("Not Authorised")
    }else{
        await notesModel.findByIDAndUpdate({_id:noteID},payload)
        res.send({"msg":"Note deleted SUcessfully"})
    }
})

module.exports={
    notesRouter
}