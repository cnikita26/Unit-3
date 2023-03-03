const jwt=require("jsonwebtoken")


const authenticate=(req,res,next)=>{
    const token = req.headers?.authorization?.split(" ")[1]
    if(token){
        const decoded=jwt.verify(token,"hush")
        if(decoded){
            const no_if_comments=decoded.no_if_comments
            req.body.no_if_comments=no_if_comments
            next()
        }
        else{
            res.send("Please Login")
        }
    }
    else{
        res.send("Please Login")
    }
}

module.exports={authenticate}