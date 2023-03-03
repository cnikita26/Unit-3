const express=require("express")

//const{json}=require("express")

const fs=require("fs")

const app=express()

const {moviesroute}=require("./movies.middle.js")
const {seriesroute}=require("./series.middle.js")

app.use(express.json())

app.use((req,res,next)=>{
    logger(req,res)
    next()
})

app.use("/movies",moviesroute)
app.use("/series",seriesroute)

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.listen(9000,()=>console.log("Port is on"))

function logger(req,res){
    fs.appendFileSync("./logs.txt",`Method:${req.method} | Route:${req.path} | user-agent:${req.get("User-Agent")}\n`)
}