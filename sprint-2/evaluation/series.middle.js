const express=require("express")

const fs=require("fs")

const seriesroute=express.Router()

seriesroute.use(express.json())

seriesroute.get("/",(req,res)=>{
    let movie=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    res.send(movie.series)
})

seriesroute.get("/:id",(req,res)=>{
    let movie=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    for(let i=0;i<movie.series.length;i++){
        if(movie.series[i].series_id==req.params.id){
            res.send(movie.series[i])
        }
    }
})

seriesroute.post("/addseries",(req,res)=>{
    let movie=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    movie.series.push(req.body)
    fs.writeFileSync("./db.json",JSON.stringify(movie)) 
    res.send("updated")
})

//middlewares

seriesroute.use("/addseries/:id",(req,res,next)=>{
    if(validator(req,res)){
        next()
    }else{
        res.status(404).send("You are not authorised to do this operation")
    }
})
seriesroute.use("/:id",(req,res,next)=>{
    if(validator(req,res)){
        next()
    }else{
        res.status(404).send("You are not authorised to do this operation")
    }
})

seriesroute.patch("/addseries/:id",(req,res)=>{
    let movie=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    for(let i=0;i<movie.series.length;i++){
        if(movie.series[i].series_id==req.params.id){
            if(req.body.series_id){movie.series[i].series_id=req.body.series_id}
            if(req.body.genre){movie.series[i].genre=req.body.genre}
            if(req.body.name){movie.series[i].name=req.body.name}
            if(req.body.director){movie.series[i].director=req.body.director}
        }
    }

    fs.writeFileSync("./db.json",JSON.stringify(movie))
    res.send("Update done")
})

seriesroute.delete("/:id",(req,res)=>{
    let movie=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    for(let i=0;i<movie.series.length;i++){
        if(movie.series[i].series_id===req.params.id){
            movie.series.splice(i,1)
        }
    }
    fs.writeFileSync("./db.json",JSON.stringify(movie))
    res.send("delete done")

})

function validator(req,res){
    if(req.query.password==5567 && req.query.role=="admin"){
        return true
    }else{
        return false
    }
}

module.exports={seriesroute}