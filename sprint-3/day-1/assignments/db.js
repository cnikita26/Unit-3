const mongoose=require('mongoose')
const connection=mongoose.connect("mongodb://127.0.0.1:27017/asgs3d3")

const movieSchema=mongoose.Schema({
    title:String,
    rating:Number,
    actor:String,


})
const MovieModel=mongoose.model("movieapp",movieSchema)



module.exports={connection,MovieModel}