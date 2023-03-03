const express=require("express")

const fs=require("fs")

const moviesroute=express.Router()

moviesroute.use(express.json())

moviesroute.get("/",(req,res)=>{
    let movie=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    res.send(movie.movies)
})

moviesroute.get("/:id",(req,res)=>{
    let movie=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    for(let i=0;i<movie.movies.length;i++){
        if(movie.movies[i].movie_id==req.params.id){
            res.send(movie.movies[i])
        }
    }
})

moviesroute.post("/addmovie",(req,res)=>{
    let movie=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    movie.movies.push(req.body)
    fs.writeFileSync("./db.json",JSON.stringify(movie)) 
    res.send("updated")
})

//middlewares

moviesroute.use("/addmovie/:id",(req,res,next)=>{
    if(validator(req,res)){
        next()
    }else{
        res.status(404).send("You are not authorised to do this operation")
    }
})

moviesroute.patch("/addmovie/:id",(req,res)=>{
    let movie=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    for(let i=0;i<movie.movies.length;i++){
        if(movie.movies[i].movie_id==req.params.id){
            if(req.body.movie_id){movie.movies[i].movie_id=req.body.movie_id}
            if(req.body.genre){movie.movies[i].genre=req.body.genre}
            if(req.body.name){movie.movies[i].name=req.body.name}
            if(req.body.director){movie.movies[i].director=req.body.director}
        }
    }

    fs.writeFileSync("./db.json",JSON.stringify(movie))
    res.send("Update done")
})

moviesroute.delete("/:id",(req,res)=>{
    let movie=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    for(let i=0;i<movie.movies.length;i++){
        if(movie.movies[i].movie_id===req.params.id){
            movie.movies.splice(i,1)
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

module.exports={moviesroute}