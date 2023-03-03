const express=require("express")
const {json}=require("express")
const fs=require("fs")
const app=express()
app.use(express.json())

//app.get
app.get("/",(req,res)=>{
    const data=JSON.parse( fs.readFileSync("./db.json","utf-8"))
    res.json(data.student)
    console.log(data.student)
})

//App.post
app.post("/",(req,res)=>{
    const data=JSON.parse( fs.readFileSync("./db.json","utf-8"))
    data.student.push(req.body)
    console.log(req.body)
    fs.writeFileSync("./db.json",JSON.stringify(data))
    res.send("posted")

})
//app.put()
app.put("/",(req,res)=>{
    const data=JSON.parse( fs.readFileSync("./db.json","utf-8"))
    for(let i=0;i<data.student.length;i++){
        if(data.student[i].id==req.body.id ){
            data.student[i].sub=req.body.sub
            console.log( data.student[i].sub)
        }
    }
 fs.writeFileSync("./db.json",JSON.stringify(data))
 res.send("patched ")

})
//app.delete
app.delete("/",(req,res)=>{
    const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    for(let i=0;i<data.student.length;i++){
        if(data.student[i].id==req.body.id){
            data.student.splice(i,1)
        }
    }
    fs.writeFileSync("./db.json",JSON.stringify(data))
    res.send("the sub u wanteds to delete , has been deleted")

})




app.listen(4444,()=>console.log("listeing to the port"))
