const express=require('express')
const {connection,MovieModel}=require("./db")
const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome From Nikita")
})
app.get("/show",async(req,res)=>{
   // const params=req.query
    try{
        const users=await MovieModel.find()
        res.send(users)
    }
    catch(err){
        console.log(err)
        res.send("err:something went wrong")
    }
    
})
app.get('/viewtitleasc',async(req,res)=>{
    const params=req.query
    try{
        const users=await MovieModel.sort("title:1")
        res.send(users)
        console.log(users)
    }
    catch(err){
        console.log(err)
        res.send("err:something went wrong")
    }
    //console.log(params)
})

app.post("/addMovie",async(req,res)=>{
   
    try{
        const payload= req.body
        const movie= new MovieModel(payload)
        await movie.save()
         console.log(payload)
         res.send("created succesfully")
    }
    catch(err){
        console.log(err)
        res.send("something went wrong")
    }
})

app.put('/updatemovie/:userId',async(req,res)=>{
    const userId=req.params.userId
    const payload=req.body;
    try{
const query=await MovieModel.findByIdAndUpdate({_id:userId},payload)
console.log(query)
res.send("updated")
    }
    catch(err){
        console.log(err)
        res.send("something went wrong")
    }
})


app.delete("/deletemovie/:userId",async(req,res)=>{
    const userId=req.params.userId

    try{
      await MovieModel.findByIdAndDelete({_id:userId})
      console.log(userId)
       res.send("deleted...")
      
    }
    catch(err){
        console.log(err)
        res.send("somethin went wrong")
    }
})













app.listen(9000,async()=>{
    try{
await connection
console.log("connected mongo db")
    }
    catch(err){
        console.log("error found")
        console.log(err)
    }
    console.log("connected to port 9000....")
})

