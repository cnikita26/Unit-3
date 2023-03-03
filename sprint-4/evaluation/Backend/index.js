const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cors=require("cors")


const {connection}=require("./configs/db")
const {UserModel}=require("./models/user.model")
const {notesRouter}=require("./routes/notes.route")
const {authenticate}=require("./middlewares/authentication")

const app=express()
app.use(express.json())

app.use(cors({
    origin:"*"
}))

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.post("/register", async (req,res)=>{
    console.log(req.body)

    const {email,password}=req.body;
    const userPresent=await UserModel.findOne({email})

    if(userPresent?.email){
        res.send("User already exist, please login")
    }else{
        try{
            bcrypt.hash(password,4,async function(err,hash){
                const user = new UserModel({email,password:hash})
                await user.save()
                res.send("Registered Sucessfully")
            });
        }
        
        catch(err){
            console.log(err)
            res.send("Something Went Wrong ,Please try again later")
        }
    }
    
});


app.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user =await UserModel.find({email})

        if(user.length>0){
            const hashed_password=user[0].password;
            bcrypt.compare(password,hashed_password,function(err,result){
                if(result){
                    const token = jwt.sign({"no_if_comments":user[0].no_if_comments}, "hush");
                    res.send({"Msg":"Login Sucessfully","token":token})
                }else{
                    res.send("Login Failed")
                }
            })
        }else{
            res.send("Login Failed")
        }
    }catch{
        res.send("SOmething Went Wrong,Please try again later")
    }
    
})

app.get("/about",(req,res)=>{
    res.send("About us Data...")
})

app.use(authenticate)
app.use("/notes",notesRouter)

app.listen(8083,async ()=>{
    try{
        await connection
        console.log("connected to the db")
    }catch(err){
        console.log(err)
    }
    console.log("Nikita Chavan Port Is On")
})